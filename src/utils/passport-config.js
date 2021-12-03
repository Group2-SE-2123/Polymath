import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "~/prisma/db";

export default function passportConfig(passport) {
	passport.use(
		new LocalStrategy((username, password, done) => {
			prisma.user
				.findFirst({
					where: {
						username,
					},
				})
				.then((user) => {
					if (!user) {
						done(null, false, { message: "Incorrect username." });
					}
					bcrypt.compare(password, user.password, (err, res) => {
						if (res) {
							done(null, user);
						}
						done(null, false, { message: "Incorrect password." });
					});
				})
				.catch((err) => done(err));
		})
	);

	passport.serializeUser((user, cb) => {
		cb(null, user.id);
	});

	passport.deserializeUser((id, cb) => {
		prisma.user
			.findFirst({
				where: {
					id,
				},
			})
			.then((user) => {
				const userInformation = {
					username: user.username,
				};
				cb(null, userInformation);
			})
			.catch((err) => cb(err));
	});
}

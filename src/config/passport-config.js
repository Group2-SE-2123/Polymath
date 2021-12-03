import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "~/prisma/db";

export default function passportConfig(passport) {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
			},
			(email, password, done) => {
				return prisma.user
					.findFirst({
						where: {
							email,
						},
					})
					.then((user) => {
						if (!user) {
							return done(null, false, { message: "Incorrect email." });
						}
						if (!bcrypt.compareSync(password, user.password)) {
							return done(null, false, { message: "Incorrect password." });
						}
						return done(null, user);
					});
			}
		)
	);

	passport.serializeUser((user, cb) => {
		cb(null, user.id);
	});

	passport.deserializeUser((id, cb) => {
		return prisma.user
			.findFirst({
				where: {
					id,
				},
			})
			.then((user) => {
				const userInformation = {
					name: user.name,
				};
				cb(null, userInformation);
			})
			.catch((err) => cb(err));
	});
}

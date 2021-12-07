import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "~/prisma/db";

export default function passportStrategy(passport) {
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
						const userDetails = {
							id: user.id,
							name: user.name,
							email: user.email,
							isAdmin: user.isAdmin,
						};
						return done(null, userDetails);
					})
					.catch((err) => {
						done(err);
					});
			}
		)
	);

	passport.serializeUser((user, done) => {
		return done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		return prisma.user
			.findFirst({
				where: {
					id,
				},
				select: {
					id: true,
					name: true,
					email: true,
					isAdmin: true,
				},
			})
			.then((user) => {
				done(null, user);
			})
			.catch((err) => done(err));
	});
}

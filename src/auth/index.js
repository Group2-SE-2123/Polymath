import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import prisma from "~/prisma/db";

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
	const { name, email, password } = req.body;
	prisma.user
		.findFirst({
			where: {
				email,
			},
		})
		.then((user) => {
			if (user) {
				res.send("User Already Exists");
			} else {
				const saltRounds = +process.env.SALT_ROUNDS;
				const hashedPassword = bcrypt.hashSync(password, saltRounds);
				prisma.user
					.create({
						data: {
							name,
							email,
							password: hashedPassword,
						},
					})
					.then(() => {
						res.send("User Created");
					});
			}
		});
});

authRouter.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) {
			res.send(info);
		} else {
			req.logIn(user, (error) => {
				if (error) throw error;
				res.send({
					message: "success",
				});
			});
		}
	})(req, res, next);
});

export default authRouter;

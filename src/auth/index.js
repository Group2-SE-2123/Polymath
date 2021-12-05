import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import prisma from "~/prisma/db";

import { getToken, getRefreshToken } from "./authenticate";

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400).json({
			message: "Please provide all the required fields",
		});
	}
	prisma.user
		.findFirst({
			where: {
				email,
			},
		})
		.then((user) => {
			if (user) {
				res.status(409).send("User Already Exists");
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
					.then((newUser) => {
						const token = getToken({ id: newUser.id });
						const refreshToken = getRefreshToken({ id: newUser.id });
						res.cookie("refreshToken", refreshToken);
						res.send({ success: true, token });
					})
					.catch((err) => {
						res.status(500).json(err);
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

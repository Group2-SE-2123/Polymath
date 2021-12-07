import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import prisma from "~/prisma/db";

import { getToken, COOKIE_OPTIONS, getRefreshToken, loginUser } from "./authenticate";
import { createSession } from "../controller/session";
import userRouter from "./userRoute";

const router = express.Router();

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400).json({
			message: "Please provide all the required fields",
		});
	}
	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	});
	if (user) {
		res.status(409).send("User Already Exists");
	}
	const saltRounds = +process.env.SALT_ROUNDS;
	const hashedPassword = bcrypt.hashSync(password, saltRounds);
	const newUser = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});
	const token = getToken({ id: newUser.id });
	const refreshToken = getRefreshToken({ id: newUser.id });
	await prisma.session.create({
		data: {
			user: {
				connect: {
					id: newUser.id,
				},
			},
			refreshToken,
		},
	});

	res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
	res.send({ success: true, token });
});

router.post("/login", loginUser, (req, res) => {
	const { user } = req;
	if (!user) {
		res.status(401).send("User does not exist");
	} else {
		req.logIn(user, async (error) => {
			if (error) throw error;
			const token = getToken({ id: user.id });
			const refreshToken = getRefreshToken({ id: user.id });
			await createSession(user.id, refreshToken);

			res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
			res.send({ success: true, token });
		});
	}
});

router.use("/", userRouter);

router.get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
	res.send(req.user);
});

export default router;

import jwt from "jsonwebtoken";
import express from "express";
import prisma from "~/prisma/db";

import { getToken, getRefreshToken, verifyUser, COOKIE_OPTIONS } from "./authenticate";
import { getSameToken, updateSession, deleteSession } from "~/src/controller/user";

const router = express.Router();

router.post("/refreshToken", (req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;

	if (refreshToken) {
		try {
			const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			const userId = payload.id;
			prisma.user
				.findFirst({
					where: {
						id: userId,
					},
				})
				.then(
					async (user) => {
						if (user) {
							const tokenIndex = await getSameToken(refreshToken);

							if (!tokenIndex) {
								res.status(404).send("Unauthorized");
							} else {
								const token = getToken({ id: userId });
								const newRefreshToken = getRefreshToken({ id: userId });
								await updateSession(userId, newRefreshToken);
								res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
								res.send({ success: true, token });
							}
						} else {
							res.statusCode = 401;
							res.send("Unauthorized");
						}
					},
					(err) => next(err)
				);
		} catch (err) {
			res.statusCode = 401;
			res.send("Unauthorized");
		}
	} else {
		res.statusCode = 401;
		res.send("Unauthorized");
	}
});

router.get("/logout", verifyUser, async (req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;
	await prisma.user
		.findFirst({
			where: {
				id: req.user.id,
			},
		})
		.then(
			async (user) => {
				const tokenIndex = await getSameToken(refreshToken);

				if (tokenIndex) {
					await deleteSession(tokenIndex, user.id);
					res.clearCookie("refreshToken", COOKIE_OPTIONS);
					res.send({ success: true });
				}
			},
			(err) => next(err)
		);
});

export default router;

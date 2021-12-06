import jwt from "jsonwebtoken";
import express from "express";
import prisma from "~/prisma/db";

import { getToken, getRefreshToken } from "./authenticate";
import { getSameToken, updateSession } from "~/src/controller/user";

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
								res.cookie("refreshToken", newRefreshToken);
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

export default router;

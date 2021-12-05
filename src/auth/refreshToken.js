// import jwt from "jsonwebtoken";
// import express from "express";
// import prisma from "~/prisma/db";

// import { getToken, getRefreshToken } from "./authenticate";

// const router = express.Router();

// router.post("/refreshToken", (req, res, next) => {
// 	const { signedCookies = {} } = req;
// 	const { refreshToken } = signedCookies;

// 	if (refreshToken) {
// 		try {
// 			const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
// 			const userId = payload.id;
// 			prisma.user
// 				.findFirst({
// 					where: {
// 						id: userId,
// 					},
// 				})
// 				.then(
// 					(user) => {
// 						if (user) {
// 							const tokenIndex = user.refreshToken.findIndex(
// 								(item) => item.refreshToken === refreshToken
// 							);

// 							if (tokenIndex === -1) {
// 								res.statusCode = 401;
// 								res.send("Unauthorized");
// 							} else {
// 								const token = getToken({ _id: userId });
// 								// If the refresh token exists, then create new one and replace it.
// 								const newRefreshToken = getRefreshToken({ _id: userId });
// 								user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
// 								user.save((err, user) => {
// 									if (err) {
// 										res.statusCode = 500;
// 										res.send(err);
// 									} else {
// 										res.cookie("refreshToken", newRefreshToken);
// 										res.send({ success: true, token });
// 									}
// 								});
// 							}
// 						} else {
// 							res.statusCode = 401;
// 							res.send("Unauthorized");
// 						}
// 					},
// 					(err) => next(err)
// 				);
// 		} catch (err) {
// 			res.statusCode = 401;
// 			res.send("Unauthorized");
// 		}
// 	} else {
// 		res.statusCode = 401;
// 		res.send("Unauthorized");
// 	}
// });

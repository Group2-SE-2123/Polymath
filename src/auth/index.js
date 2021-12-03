import express from "express";
import prisma from "~/prisma/db";

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
	const { name } = req.body;
	prisma.user
		.findFirst({
			where: {
				name,
			},
		})
		.then((user) => {
			if (user) {
				res.send("User Already Exists");
			} else {
				prisma.user
					.create({
						data: {
							name: req.body.name,
						},
					})
					.then(() => {
						res.send("User Created");
					});
			}
		});
});

export default authRouter;

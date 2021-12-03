import express from "express";
import prisma from "~/prisma/db";

const userRouter = express.Router();

userRouter.post("/createUser", async (req, res) => {
	const { name } = req.body;
	prisma.user
		.create({
			data: {
				name,
			},
		})
		.then((user) => res.send(user))
		.catch((err) => res.send(err));
});

userRouter.get("/getUsers", async (req, res) => {
	prisma.user
		.findMany()
		.then((user) => res.send(user))
		.catch((err) => res.send(err));
});

export default userRouter;

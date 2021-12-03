import express from "express";
import prisma from "~/prisma/db";

const userRouter = express.Router();

userRouter.post("/createUser", async (req, res) => {
	const { name } = req.body;
	const user = await prisma.user.create({
		data: {
			name
		},
	});
	res.json(user);
});

userRouter.get("/getUsers", async (req, res) => {
	Promise.resolve()
		.then(() => prisma.user.findMany())
		.then((users) => res.send(users))
		.catch((err) => res.send(err));
});

export default userRouter;

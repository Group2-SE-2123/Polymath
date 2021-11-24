import express from "express";
import prisma from "../../prisma/db";

const questionRouter = express.Router();

questionRouter.post("/createQuestion", async (req, res) => {
	await prisma.question.create({
		data: {
			text: "1 + 1 = ?",
			Choice: {
				create: [
					{
						text: "2",
						isCorrect: true,
					},
					{
						text: "3",
					},
					{
						text: "4",
					},
				],
			},
		},
	});
	res.json({ success: "True" });
});

questionRouter.get("/getQuestions", async (req, res) => {
	Promise.resolve()
		.then(() => prisma.question.findMany())
		.then((questions) => res.send(questions))
		.catch((err) => res.send(err));
});

export default questionRouter;

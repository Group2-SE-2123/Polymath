import express from "express";
import prisma from "~/prisma/db";

const router = express.Router();

router.post("/createQuestion", async (req, res) => {
	await prisma.question.create({
		data: {
			text: "1 + 1 = ?",
			category: "Arithmetic",
			difficulty: "Easy",
			choice: {
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

router.post("/sample", async (req, res) => {
	const json = req.body;
	res.send(json);
});

router.get("/getQuestions", async (req, res) => {
	Promise.resolve()
		.then(() => prisma.question.findMany())
		.then((questions) => res.send(questions))
		.catch((err) => res.send(err));
});

export default router;

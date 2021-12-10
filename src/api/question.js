import express from "express";
import prisma from "~/prisma/db";

import { getAllQuestions } from "../controller/question";

const router = express.Router();

router.post("/createQuestion", (req, res) => {
	prisma.question.create({
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

router.get("/getQuestions", (req, res) => {
	getAllQuestions()
		.then((questions) => res.send(questions))
		.catch((err) => res.status(400).send(err));
});

export default router;

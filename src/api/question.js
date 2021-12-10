import express from "express";
import prisma from "~/prisma/db";

import { getAllQuestions } from "../controller/question";
import { createQuiz } from "../controller/quiz";

const router = express.Router();

router.post("/createQuiz",  async (req, res) => {
	const quiz = req.body;

	new Promise((resolve, reject) => {
		if(quiz != null){
			resolve(quiz);
		}else{
			reject(res.status(400));	
		}
	})
	.then(createQuiz(quiz))
	.then(()=> res.status(201).json(quiz))
	.catch((err) => res.send(err));
})

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

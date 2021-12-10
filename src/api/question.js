import express from "express";
import { validationResult } from "express-validator";

import {
	getAllQuestions,
	getQuestionById,
	createQuestion,
	getRandomQuestions,
} from "../controller/question";
import { createQuiz } from "../controller/quiz";
import { validateQuestion } from "../validator/questionValidators";

const router = express.Router();

router.post("/createQuestion", validateQuestion, (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

	const question = req.body;
	return createQuestion(question)
		.then(res.send({ success: true }))
		.catch((err) => res.status(400).send(err));
});

router.get("/getQuestions", (req, res) => {
	getAllQuestions()
		.then((questions) => res.send(questions))
		.catch((err) => res.status(400).send(err));
});

router.get("/getQuestion", (req, res) => {
	const { id } = req;
	getQuestionById(id)
		.then((question) => res.send(question))
		.catch((err) => res.status(400).send(err));
});

router.get("/randomQuestions", (req, res) => {
	const { count } = req.body;
	getRandomQuestions(count)
		.then((questions) => res.send(questions))
		.catch((err) => res.status(400).send(err));
});

router.post("/createQuiz", async (req, res) => {
	const quiz = req.body;

	new Promise((resolve, reject) => {
		if (quiz != null) {
			resolve(quiz);
		} else {
			reject(res.status(400));
		}
	})
		.then(createQuiz(quiz))
		.then(() => res.status(201).json(quiz))
		.catch((err) => res.send(err));
});

export default router;

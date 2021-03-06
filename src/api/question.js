import express from "express";
import { validationResult } from "express-validator";

import {
	getAllQuestions,
	getQuestionById,
	createQuestion,
	getRandomQuestions,
	getOfflineQuestions,
	connectQuestionToQuiz,
	deleteQuestion,
} from "../controller/question";
import { validateQuestion, validationQuizQuestions } from "../validator/questionValidators";

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

router.post("/randomQuestions", (req, res) => {
	const { count } = req.body;
	getRandomQuestions(count)
		.then((questions) => res.send(questions))
		.catch((err) => res.status(400).send(err));
});

router.post("/getQuizQuestions", validationQuizQuestions, (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

	const { count, topics, difficulty } = req.body;
	return getOfflineQuestions(count, topics, difficulty)
		.then((questions) => res.send(questions))
		.catch((err) => res.status(400).send(err));
});

router.put("/connectQuestion", (req, res) => {
	const { questionId, quizId } = req.body;
	return connectQuestionToQuiz(questionId, quizId)
		.then(res.send({ success: true }))
		.catch((err) => res.status(400).send(err));
});

// delete question
router.delete("/deleteQuestion", (req, res) => {
	const { id } = req.body;
	return deleteQuestion(id)
		.then(res.send({ success: true }))
		.catch((err) => res.status(400).send(err));
});

export default router;

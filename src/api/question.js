import express from "express";

import { getAllQuestions, getQuestionById, createQuestion } from "../controller/question";

const router = express.Router();

router.post("/createQuestion", (req, res) => {
	const question = req.body;
	createQuestion(question)
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

export default router;

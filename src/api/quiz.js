import express from "express";
import { validationResult } from "express-validator";
import { uploadMiddleware } from "../middleware";

import { createQuiz, getAllQuiz, checkAnswers } from "../controller/quiz";
import { validateQuiz, quizSubmissionValidation } from "../validator/quizValidator";

const router = express.Router();

router.post("/createQuiz", uploadMiddleware.single("image"), validateQuiz, async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

	const quiz = req.body;
	quiz.imageUrl = `${process.env.DO_CDN_ENDPOINT}/${req.file.key}`;
	return createQuiz(quiz)
		.then(res.send({ success: true }))
		.catch((err) => res.status(400).send(err));
});

// get request to get all quizzes
router.get("/getAll", (req, res) => {
	getAllQuiz()
		.then((quizzes) => res.send(quizzes))
		.catch((err) => res.status(400).send(err));
});

router.post("/submitQuiz", quizSubmissionValidation, async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

	const { selectedChoices } = req.body;
	return checkAnswers(selectedChoices)
		.then((answers) => res.send(answers))
		.catch((err) => res.status(400).send(err));
});

export default router;

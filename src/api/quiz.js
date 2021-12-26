import express from "express";
import { validationResult } from "express-validator";
import { uploadMiddleware } from "../middleware";

import { createQuiz } from "../controller/quiz";
import { validateQuiz } from "../validator/quizValidator";

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

export default router;

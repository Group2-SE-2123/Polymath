import express from "express";

import {
	createRecord,
	getUserQuizzes,
	updateRecordScore,
	getQuizResults,
} from "../controller/record";
import { getQuestionsFromQuiz } from "../controller/question";
import { verifyUser } from "../auth/authenticate";

const router = express.Router();

router.post("/new", verifyUser, (req, res) => {
	const { quizId } = req.body;
	const userId = req.user.id;

	getQuestionsFromQuiz(quizId)
		.then((questions) => {
			const time = questions.reduce((acc, curr) => {
				if (curr.difficulty === "Easy") {
					return acc + 30;
				}
				if (curr.difficulty === "Medium") {
					return acc + 45;
				}
				if (curr.difficulty === "Hard") {
					return acc + 60;
				}
				return acc;
			}, 0);
			const createdAt = new Date();
			return createRecord(userId, quizId, time, createdAt);
		})
		.then((record) => {
			return res.send(record);
		})
		.catch((err) => {
			return res.status(400).send(err);
		});
});

router.get("/user-quizzes", verifyUser, (req, res) => {
	const userId = req.user.id;
	getUserQuizzes(userId)
		.then((quizzes) => res.send(quizzes))
		.catch((err) => res.status(400).send(err));
});

router.put("/submit", verifyUser, (req, res) => {
	const { recordId, score } = req.body;
	return updateRecordScore(recordId, score)
		.then(() => res.sendStatus(200))
		.catch((err) => res.status(400).send(err));
});

router.get("/quiz-results/:userId/:quizId", verifyUser, (req, res) => {
	const { userId, quizId } = req.params;
	return getQuizResults(+userId, +quizId)
		.then((quizResults) => res.send(quizResults))
		.catch((err) => res.status(400).send(err));
});

export default router;

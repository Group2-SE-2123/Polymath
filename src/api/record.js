import express from "express";

import { createRecord } from "../controller/record";
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

router.get("/sample", (req, res) => {
	res.send("sample");
});

export default router;

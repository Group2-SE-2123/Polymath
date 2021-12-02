import express from "express";
import prisma from "~/prisma/db";

const quizRouter = express.Router();

// GETS a list of  quizzes in the database//
quizRouter.get("/getQuiz", async (req, res) => {
	Promise.resolve()
		.then(() => prisma.quiz.findMany())
		.then((quiz) => res.json(quiz))
		.catch((err) => res.send(err));
});

// GETS the questions of a specific quizz//
quizRouter.get("/getQuizQuestions", async (req, res) => {
	Promise.resolve()
		.then(() =>
			prisma.quiz.findUnique({
				where: {
					id: 1,
				},
				select: {
					question: true,
				},
			})
		)
		.then((quiz) => res.json(quiz))
		.catch((err) => res.send(err));
});

export default quizRouter;

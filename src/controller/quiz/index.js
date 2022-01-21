import prisma from "~/prisma/db";

const createQuiz = (quiz) => {
	const { name, details, length, timeLimit, imageUrl } = quiz;
	return prisma.quiz.create({
		data: {
			name,
			details,
			length,
			timeLimit,
			imageUrl,
		},
	});
};

const getAllQuiz = () => {
	return prisma.quiz.findMany();
};

const checkAnswer = async (questionId, choiceId) => {
	const choice = await prisma.choice.findFirst({
		where: {
			questionId,
			id: choiceId,
		},
	});
	return choice.isCorrect;
};

const checkAnswers = async (answers) => {
	return prisma.choice
		.findMany({
			where: {
				id: {
					in: answers.map((answer) => answer.choiceId),
				},
			},
		})
		.then((choices) => {
			return choices.map((choice) => {
				return {
					questionId: choice.questionId,
					isCorrect: choice.isCorrect,
				};
			});
		});
};

const getQuestionsFromQuiz = async (id) => {
	return prisma.record
		.findFirst({
			where: {
				id,
			},
			select: {
				quiz: {
					select: {
						question: {
							select: {
								id: true,
								text: true,
								category: true,
								difficulty: true,
								choice: {
									select: {
										id: true,
										text: true,
									},
								},
							},
						},
					},
				},
			},
		})
		.then((record) => record.quiz.question);
};

export { createQuiz, getAllQuiz, checkAnswer, checkAnswers, getQuestionsFromQuiz };

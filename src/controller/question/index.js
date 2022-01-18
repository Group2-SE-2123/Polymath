import prisma from "~/prisma/db";

const getAllQuestions = () => {
	return prisma.question.findMany();
};

const getQuestionById = (id) => {
	return prisma.question.findFirst({
		where: {
			id,
		},
	});
};

const createQuestion = (question) => {
	const { text, categoryId, difficulty, choices } = question;
	return prisma.question.create({
		data: {
			text,
			category: {
				connect: {
					id: categoryId,
				},
			},
			difficulty,
			choice: {
				create: choices,
			},
		},
	});
};

const deleteQuestion = (id) => {
	prisma.choices.deleteMany({
		where: {
			questionId: id,
		},
	});

	return prisma.question.delete({
		where: {
			id,
		},
	});
};

const getRandomQuestions = async (count) => {
	const questions = await prisma.question.findMany({
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
	});
	const randomQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, count);
	return randomQuestions;
};

const getOfflineQuestions = async (count, topics, difficulty) => {
	const questions = await prisma.question.findMany({
		where: {
			AND: [
				{
					category: {
						name: {
							in: topics,
						},
					},
				},
				{
					difficulty: {
						equals: difficulty,
					},
				},
			],
		},
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
	});
	const randomizedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, count);
	return randomizedQuestions;
};

const connectQuestionToQuiz = async (questionId, quizId) => {
	return prisma.question.update({
		where: {
			id: questionId,
		},
		data: {
			quiz: {
				connect: {
					id: quizId,
				},
			},
		},
	});
};

const getQuestionsFromQuiz = async (quizId) => {
	return prisma.question.findMany({
		where: {
			quiz: {
				id: quizId,
			},
		},
	});
};

export {
	getAllQuestions,
	getQuestionById,
	createQuestion,
	deleteQuestion,
	getRandomQuestions,
	getOfflineQuestions,
	connectQuestionToQuiz,
	getQuestionsFromQuiz,
};

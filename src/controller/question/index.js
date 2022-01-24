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
	const { text, categoryId, quizId, difficulty, choices } = question;
	return prisma.question.create({
		data: {
			text,
			category: {
				connect: {
					id: categoryId,
				},
			},
			quiz: {
				connect: {
					id: quizId,
				},
			},
			difficulty,
			choice: {
				create: choices,
			},
		},
	});
};

const deleteQuestion = async (id) => {
	return prisma.choice
		.deleteMany({
			where: {
				questionId: id,
			},
		})
		.then(() =>
			prisma.question.delete({
				where: {
					id,
				},
			})
		);
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
	const topicsList =
		topics.length === 0
			? await prisma.category.findMany().then((res) => res.map((topic) => topic.name))
			: topics;

	const questions = await prisma.question.findMany({
		where: {
			AND: [
				{
					category: {
						name: {
							in: topicsList,
						},
					},
				},
				{
					difficulty: {
						in: difficulty,
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

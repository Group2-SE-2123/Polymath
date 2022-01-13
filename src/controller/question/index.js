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
	const questionsCount = await prisma.question.count();
	const skip = Math.floor(Math.random() * questionsCount);
	return prisma.question.findMany({
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
		take: count,
		skip,
		orderBy: {
			id: "asc",
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
};

export {
	getAllQuestions,
	getQuestionById,
	createQuestion,
	deleteQuestion,
	getRandomQuestions,
	getOfflineQuestions,
};

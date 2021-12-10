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
	const { text, category, difficulty, choices } = question;
	return prisma.question.create({
		data: {
			text,
			category,
			difficulty,
			choice: {
				create: choices,
			},
		},
	});
};

export { getAllQuestions, getQuestionById, createQuestion };

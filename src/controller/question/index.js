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
	const totalCount = await prisma.question.count();
	const skip = Math.floor(Math.random() * totalCount);

	return prisma.question.findMany({
		take: count,
		skip,
		orderBy: {
			id: "desc",
		},
	});
};

export { getAllQuestions, getQuestionById, createQuestion, deleteQuestion, getRandomQuestions };

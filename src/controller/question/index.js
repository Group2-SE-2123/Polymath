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
	const randomQuestions = questions.sort(() => 0.5 - Math.random()).slice(count);
	return randomQuestions;
};

export { getAllQuestions, getQuestionById, createQuestion, deleteQuestion, getRandomQuestions };

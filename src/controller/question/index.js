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

export { getAllQuestions, getQuestionById };

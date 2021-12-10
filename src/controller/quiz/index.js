import prisma from "~/prisma/db";

const createQuiz = async (json) => {
	return prisma.quiz.create({
		data: {
			userId: json.userId,
			name: json.name,
			length: json.length,
			question: json.question,
		},
	});
};

const getAllQuiz = () => {
	return prisma.question.findMany();
};

export { createQuiz, getAllQuiz };

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

export { createQuiz, getAllQuiz };

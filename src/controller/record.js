import prisma from "~/prisma/db";

const createRecord = (userId, quizId, time, createdAt) => {
	return prisma.record.create({
		data: {
			user: {
				connect: {
					id: userId,
				},
			},
			quiz: {
				connect: {
					id: quizId,
				},
			},
			score: 0,
			time,
			createdAt,
		},
	});
};

const updateRecord = (quizRecordId, data) => {
	return prisma.record.update({
		where: {
			id: quizRecordId,
		},
		data,
	});
};

const getUserQuizzes = (userId) => {
	return prisma.record
		.findMany({
			where: {
				user: {
					id: userId,
				},
			},
			select: {
				id: true,
				score: true,
				time: true,
				createdAt: true,
				deletedAt: true,
				quiz: {
					select: {
						id: true,
						name: true,
						details: true,
						imageUrl: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		})
		.then((quizzes) => {
			const now = new Date();
			const filteredQuizzes = quizzes.filter((quiz) => {
				if (quiz.deletedAt) {
					return false;
				}
				const quizTime = new Date(quiz.createdAt);
				quizTime.setSeconds(quizTime.getSeconds() + quiz.time);
				return quizTime > now;
			});
			return filteredQuizzes;
		});
};

const updateRecordScore = (recordId, score) => {
	return prisma.record.update({
		where: {
			id: recordId,
		},
		data: {
			score,
			deletedAt: new Date(),
		},
	});
};

const getQuizResults = (quizId) => {
	return prisma.record.findMany({
		where: {
			quizId,
			NOT: {
				deletedAt: null,
			},
		},
		select: {
			id: true,
			score: true,
			time: true,
			createdAt: true,
			deletedAt: true,
			quiz: {
				select: {
					name: true,
					length: true,
				},
			},
		},
	});
};

export { createRecord, updateRecord, getUserQuizzes, updateRecordScore, getQuizResults };

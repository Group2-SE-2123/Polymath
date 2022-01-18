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

export { createRecord, updateRecord };

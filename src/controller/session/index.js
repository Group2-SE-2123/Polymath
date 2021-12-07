import prisma from "~/prisma/db";

const createSession = async (id, refreshToken) => {
	prisma.session.create({
		data: {
			user: {
				connect: {
					id,
				},
			},
			refreshToken,
		},
	});
};

const sampleSession = () => {
	return "Sample Session";
};

export { createSession, sampleSession };

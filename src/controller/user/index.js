import prisma from "~/prisma/db";

const createUser = (userDetails) => {
	return prisma.user.create({
		data: {
			...userDetails,
		},
	});
};

const addRefreshToken = (id, token) => {
	return prisma.user.update({
		where: { id },
		data: {
			refreshToken: {
				push: token,
			},
		},
	});
};

const getLatestSession = async (id) => {
	return prisma.user.findFirst({
		where: {
			id,
		},
		select: {
			session: {
				orderBy: {
					createdAt: "desc",
				},
				take: 1,
			},
		},
	});
};

const getSameToken = async (token) => {
	return prisma.session
		.findFirst({
			where: {
				refreshToken: token,
			},
		})
		.then((session) => {
			return session.id;
		});
};

const updateSession = async (id, token) => {
	const latestSession = await getLatestSession(id);
	return prisma.session.update({
		where: {
			id: latestSession.session[0].id,
		},
		data: {
			refreshToken: token,
			createdAt: new Date(),
		},
	});
};

const deleteSession = async (id) => {
	return prisma.session.delete({
		where: {
			id,
		},
	});
};

export {
	addRefreshToken,
	createUser,
	getLatestSession,
	getSameToken,
	updateSession,
	deleteSession,
};

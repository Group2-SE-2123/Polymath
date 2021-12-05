import prisma from "~/prisma/db";

const createUser = (userDetails) => {
	prisma.user.create({
		data: {
			...userDetails,
		},
	});
};

const addRefreshToken = (id, token) => {
	prisma.user.update({
		where: { id },
		data: {
			refreshToken: {
				push: token,
			},
		},
	});
};

export { addRefreshToken, createUser };

import prisma from "~/prisma/db";

const createCategory = (category) => {
	const { name } = category;
	return prisma.category.create({
		data: {
			name,
		},
	});
};

const editCategory = (categoryId, newName) => {
	return prisma.category.update({
		where: {
			id: categoryId,
		},
		data: {
			name: newName,
		},
	});
};

const getAllCategories = () => {
	return prisma.category.findMany();
};

export { createCategory, editCategory, getAllCategories };

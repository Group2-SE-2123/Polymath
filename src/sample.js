const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
	await prisma.user.create({
		data: {
			name: "Alice",
			email: "alice@prisma.io",
			posts: {
				create: { title: "Hello World" },
			},
			profile: {
				create: { bio: "I like turtles" },
			},
		},
	});
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

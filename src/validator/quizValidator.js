import { checkSchema } from "express-validator";

const validateQuiz = checkSchema({
	name: {
		in: ["body"],
		isString: true,
		trim: true,
		isLength: {
			options: { min: 3, max: 30 },
			errorMessage: "Quiz name must be between 3 and 30 characters",
		},
	},
	details: {
		in: ["body"],
		isString: true,
		trim: true,
		isLength: {
			options: { min: 3, max: 100 },
			errorMessage: "Quiz details must be between 3 and 100 characters",
		},
	},
	length: {
		in: ["body"],
		isInt: true,
		errorMessage: "Quiz length must be an integer",
	},
	timeLimit: {
		in: ["body"],
		isInt: true,
		errorMessage: "Quiz timeLimit must be an integer",
	},
	imageUrl: {
		in: ["body"],
		isString: true,
		trim: true,
		isLength: {
			options: { min: 3, max: 100 },
			errorMessage: "Quiz imageUrl must be between 3 and 100 characters",
		},
	},
});

const sampleValidation = checkSchema({
	name: {
		in: ["body"],
		isString: true,
		trim: true,
		isLength: {
			options: { min: 3, max: 30 },
			errorMessage: "Quiz name must be between 3 and 30 characters",
		},
	},
});

export { validateQuiz, sampleValidation };

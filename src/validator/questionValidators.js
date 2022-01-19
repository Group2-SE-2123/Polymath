import { checkSchema } from "express-validator";

const validateQuestion = checkSchema({
	text: {
		in: ["body"],
		isString: true,
		trim: true,
		isLength: {
			options: { min: 5, max: 100 },
			errorMessage: "Question text must be between 5 and 100 characters",
		},
	},
	categoryId: {
		in: ["body"],
		isInt: true,
		toInt: true,
		errorMessage: "CategoryId must be an integer",
	},
	difficulty: {
		in: ["body"],
		isString: true,
		trim: true,
		isLength: {
			options: { min: 3, max: 30 },
			errorMessage: "Difficulty must be between 3 and 30 characters",
		},
	},
	choices: {
		in: ["body"],
		isArray: true,
		custom: {
			options: (value) => {
				return value.length >= 2 && value.length <= 4;
			},
		},
	},
	"choices.*": {
		in: ["body"],
		isObject: true,
	},
	"choices.*.text": {
		in: ["body"],
		isString: true,
		trim: true,
		isLength: {
			options: { min: 1, max: 100 },
			errorMessage: "Choice text must be between 1 and 100 characters",
		},
	},
	"choices.*.isCorrect": {
		in: ["body"],
		isBoolean: true,
		errorMessage: "Choice isCorrect must be a boolean",
	},
});

const validateQuestionResult = checkSchema({
	questionId: {
		in: ["params"],
		isInt: true,
		errorMessage: "Question id must be an integer",
	},
});

const validateSampleQuestion = checkSchema({
	text: {
		in: ["body"],
		isString: true,
		trim: true,
		isLength: {
			options: { min: 5, max: 100 },
			errorMessage: "Question text must be between 5 and 100 characters",
		},
	},
});

const validationQuizQuestions = checkSchema({
	count: {
		in: ["body"],
		isInt: true,
		toInt: true,
		errorMessage: "Count must be an integer",
		custom: {
			options: (value) => {
				return value % 5 === 0 && value >= 5 && value <= 50;
			},
		},
	},
	topics: {
		in: ["body"],
		isArray: true,
		custom: {
			options: (value) => {
				return value.length >= 0 && value.every((topic) => typeof topic === "string");
			},
		},
	},
	difficulty: {
		in: ["body"],
		isString: true,
		trim: true,
		custom: {
			options: (value) => {
				return ["Easy", "Medium", "Hard", ""].includes(value) || value === null;
			},
		},
		customSanitizer: {
			options: (value) => {
				return value === null || value === "" ? ["Easy", "Medium", "Hard", ""] : [value];
			},
		},
	},
});

export {
	validateQuestion,
	validateQuestionResult,
	validateSampleQuestion,
	validationQuizQuestions,
};

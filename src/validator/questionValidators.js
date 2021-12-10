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
	category: {
		in: ["body"],
		isString: true,
		trim: true,
		isLength: {
			options: { min: 3, max: 30 },
			errorMessage: "Category must be between 3 and 30 characters",
		},
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

// check if question is valid and must be required
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

export { validateQuestion, validateQuestionResult, validateSampleQuestion };

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
		toInt: true,
		isLength: {
			options: { min: 1, max: 100 },
			errorMessage: "Quiz length must be between 1 and 100",
		},
		errorMessage: "Quiz timeLimit must be an integer",
	},
	timeLimit: {
		in: ["body"],
		isInt: true,
		toInt: true,
		isLength: {
			options: { min: 1, max: 100 },
			errorMessage: "Quiz time limit must be between 1 and 100",
		},
		errorMessage: "Quiz timeLimit must be an integer",
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

const quizSubmissionValidation = checkSchema({
	selectedChoices: {
		in: ["body"],
		isArray: true,
		custom: {
			options: (value) => {
				if (value.length > 0) {
					const questionIds = value.map(({ questionId }) => questionId);
					const choiceIds = value.map(({ choiceId }) => choiceId);
					const questionIdsAreInt = questionIds.every(Number.isInteger);
					const choiceIdsAreValid = choiceIds.every(
						(choiceId) => choiceId === "" || Number.isInteger(choiceId) || choiceId === null
					);
					const questionIdsAreValid = questionIdsAreInt;
					const questionIdsAreUnique = [...new Set(questionIds)];
					const questionIdsAreUniqueLength = questionIdsAreUnique.length;
					const questionIdsAreUniqueLengthIsValid =
						questionIdsAreUniqueLength === questionIds.length;
					return questionIdsAreValid && choiceIdsAreValid && questionIdsAreUniqueLengthIsValid;
				}
				return false;
			},
		},
		customSanitizer: {
			options: (value) => {
				return value.map(({ questionId, choiceId }) => {
					if (choiceId === null || !Number.isInteger(choiceId)) {
						return { questionId, choiceId: -1 };
					}
					return { questionId, choiceId };
				});
			},
		},
	},
});

export { validateQuiz, sampleValidation, quizSubmissionValidation };

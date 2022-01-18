import axios from "axios";

const newQuizRecord = async (token, quizId) => {
	return axios({
		method: "POST",
		withCredentials: true,
		url: `/api/record/new`,
		data: {
			quizId,
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const updateQuizRecord = async (token, quizRecordId, data) => {
	return axios({
		method: "put",
		url: `/api/record/update/${quizRecordId}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
	});
};

export { newQuizRecord, updateQuizRecord };

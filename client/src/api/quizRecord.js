import axios from "axios";
import queryClient from "../config/queryClient";

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
	}).then((res) => res.data);
};

const updateQuizRecord = async (token, quizRecordId, data) => {
	return axios({
		method: "put",
		url: `/api/record/update/${quizRecordId}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
	}).then((res) => res.data);
};

const getUserQuizzes = async () => {
	const { token } = queryClient.getQueryData("session");
	return axios({
		method: "get",
		url: `/api/record/user-quizzes`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => res.data);
};

const submitQuizRecord = async (token, recordId, score) => {
	return axios({
		method: "put",
		url: `/api/record/submit`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			recordId,
			score,
		},
	}).then((res) => res.data);
};

export { newQuizRecord, updateQuizRecord, getUserQuizzes, submitQuizRecord };

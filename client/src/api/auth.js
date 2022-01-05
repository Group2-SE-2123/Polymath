import axios from "axios";

const getUserData = async (token) => {
	return axios({
		method: "GET",
		withCredentials: true,
		url: "/auth/me",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((response) => {
		return response.data;
	});
};

const fetchUserData = (token) => {
	return getUserData(token);
};

export { fetchUserData, getUserData };

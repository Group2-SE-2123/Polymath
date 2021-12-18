import React from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import queryClient from "../../config/queryClient";

const Welcome = () => {
	// Hooks
	const navigate = useNavigate();
	const sessionQuery = useQuery("session");
	const logoutMutation = useMutation(
		async () => {
			return axios({
				method: "GET",
				withCredentials: true,
				url: "/auth/logout",
				headers: {
					Authorization: `Bearer ${sessionQuery.data.token}`,
				},
			});
		},
		{
			onSuccess: () => {
				queryClient.removeQueries("session");
				queryClient.removeQueries("user_details");
				navigate("/", { replace: true });
			},
		}
	);

	const logoutHandler = () => {
		logoutMutation.mutate();
	};
	return (
		<div>
			Welcome!
			<button onClick={logoutHandler}>Logout</button>
		</div>
	);
};

export default Welcome;

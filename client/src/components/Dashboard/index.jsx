import React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import queryClient from "../../config/queryClient";

const Welcome = () => {
	// Hooks
	const navigate = useNavigate();
	const logoutMutation = useMutation(
		async () => {
			const sessionQuery = queryClient.getQueryData("session");
			return axios({
				method: "GET",
				withCredentials: true,
				url: "/auth/logout",
				headers: {
					Authorization: `Bearer ${sessionQuery.token}`,
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
		<>
			<Navbar />
			<div>
				Welcome!
				<button onClick={logoutHandler}>Logout</button>
			</div>
		</>
	);
};

export default Welcome;

import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

const Welcome = () => {
	const [userContext, setUserContext] = useContext(UserContext);
	const navigate = useNavigate();
	const logoutHandler = () => {
		axios({
			method: "GET",
			withCredentials: true,
			url: "/auth/logout",
			headers: {
				Authorization: `Bearer ${userContext}`,
			},
		}).then(async () => {
			setUserContext(() => null);
			navigate("/", { replace: true });
		});
	};
	return (
		<div>
			Welcome!
			<button onClick={logoutHandler}>Logout</button>
		</div>
	);
};

export default Welcome;

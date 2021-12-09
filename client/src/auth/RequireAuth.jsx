import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { UserContext } from "../context/UserContext";

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const [userContext] = useContext(UserContext);

	if (!userContext) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return children;
};

RequireAuth.propTypes = {
	children: PropTypes.node.isRequired,
};

export default RequireAuth;

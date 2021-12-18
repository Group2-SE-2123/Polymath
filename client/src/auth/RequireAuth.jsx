import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const sessionQuery = useQuery("session");

	if (sessionQuery.isLoading) {
		return "Is Loading";
	}
	if (sessionQuery.isError) {
		return "Error";
	}
	if (!sessionQuery.data) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return children;
};

RequireAuth.propTypes = {
	children: PropTypes.node.isRequired,
};

export default RequireAuth;

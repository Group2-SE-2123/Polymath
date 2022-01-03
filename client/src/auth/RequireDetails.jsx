import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const RequireDetails = ({ children }) => {
	const location = useLocation();

	if (location.state === null || location.state.sliderState === 0) {
		return <Navigate to="/" state={{ from: location }} />;
	}

	return children;
};

RequireDetails.propTypes = {
	children: PropTypes.node.isRequired,
};

export default RequireDetails;

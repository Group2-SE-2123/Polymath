import React, { useState } from "react";
import PropTypes from "prop-types";

const GlobalContext = React.createContext([{}, () => {}]);

const initialState = {};

const GlobalProvider = ({ children }) => {
	const [state, setState] = useState(initialState);

	return <GlobalContext.Provider value={[state, setState]}>{children}</GlobalContext.Provider>;
};

GlobalProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { GlobalContext, GlobalProvider };

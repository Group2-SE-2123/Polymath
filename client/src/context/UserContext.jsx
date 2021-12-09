import React from "react";
import PropTypes from "prop-types";

import useLocalStorage from "../hook/useLocalStorage";

const UserContext = React.createContext([{}, () => {}]);

const UserProvider = ({ children }) => {
	const [state, setState] = useLocalStorage("token", null);

	return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };

import React, { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext([{}, () => {}]);

const initialState = {
	topicsState: [],
	sliderState: 0,
	difficultyState: "",
};

const ModalProvider = ({ children }) => {
	const [state, setState] = useState(initialState);
	const value = useMemo(() => [state, setState], [state]);

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

ModalProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { ModalContext, ModalProvider };

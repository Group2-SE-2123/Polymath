import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import produce from "immer";

import { ModalContext } from "../../context/ModalContext";

const DifficultySelect = () => {
	const [modalState, setModalState] = useContext(ModalContext);
	const [, setDifficulty] = useState("");

	const handleChange = (event) => {
		setDifficulty(event.target.value);
		setModalState(
			produce(modalState, (draft) => {
				draft.difficultyState = event.target.value;
			})
		);
	};

	return (
		<Box sx={{ minWidth: 120, mx: "auto" }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={modalState.difficultyState}
					label="Difficulty"
					onChange={handleChange}
				>
					<MenuItem value={"Easy"}>Easy</MenuItem>
					<MenuItem value={"Medium"}>Medium</MenuItem>
					<MenuItem value={"Hard"}>Hard</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default DifficultySelect;

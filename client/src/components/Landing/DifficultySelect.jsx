import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DifficultySelect = () => {
	const [difficulty, setDifficulty] = React.useState("");

	const handleChange = (event) => {
		setDifficulty(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120, mx: "auto" }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={difficulty}
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

import React, { useState } from "react";
import { Box, Slider, ThemeProvider, createTheme } from "@mui/material";

const valuetext = (value) => {
	return value;
};

const theme = createTheme({
	palette: {
		main: {
			background: "#fcc822",
		},
	},
});

const NumberSlider = () => {
	const [value, setValue] = useState(5);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ width: 300, my: 5, ml: "auto" }}>
				<Slider
					value={value}
					onChange={handleChange}
					sx={{ color: "main.background" }}
					aria-label="Temperature"
					defaultValue={5}
					getAriaValueText={valuetext}
					valueLabelDisplay="on"
					step={5}
					marks
					min={5}
					max={50}
				/>
			</Box>
		</ThemeProvider>
	);
};

export default NumberSlider;

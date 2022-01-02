import React, { useState, useImperativeHandle } from "react";
import { Box, Slider, ThemeProvider, createTheme } from "@mui/material";
import PropTypes from "prop-types";

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

const NumberSlider = ({ refProps }) => {
	const [value, setValue] = useState(refProps.current);

	useImperativeHandle(
		refProps,
		() => ({
			value,
		}),
		[value]
	);

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

NumberSlider.propTypes = {
	refProps: PropTypes.object,
};

export default NumberSlider;

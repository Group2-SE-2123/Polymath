import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const ValidationTextField = styled(TextField)({
	"& label.Mui-focused": {
		color: "gray",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "#fcc822",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "red",
		},
		"&:hover fieldset": {
			borderColor: "#fcc822",
		},
		"&.Mui-focused fieldset": {
			borderColor: "#fcc822",
		},
	},

	"& input:valid + fieldset": {
		borderColor: "#fcc822",
		borderWidth: 2,
	},
	"& input:invalid + fieldset": {
		borderColor: "#fcc822",
		borderWidth: 2,
	},
	"& input:valid:focus + fieldset": {
		borderLeftWidth: 6,
		padding: "4px !important", // override inline-style
	},
});

export default ValidationTextField;

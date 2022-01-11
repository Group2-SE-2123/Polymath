import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { yellow } from "@mui/material/colors";

const LogButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(yellow[500]),
	padding: "1rem 2rem",
	borderRadius: "0rem",
	"&:hover": {
		transform: "scale(1.1)",
		transition: "transform 0.5s ease",
	},
	"&.MuiButton-text": {
		color: "white",
	},
	"&.MuiButton-contained": {
		color: "white",
		backgroundColor: "#fcc822",
	},
	"&.MuiButton-outlined": {
		color: "#fcc822",
		borderColor: "#fcc822",
		borderWidth: 2,
		shadowColor: "#fcc822",
		boxShadow: "3px 3px 44px -10px #fcc822",
	},
}));

const LoadingLogButton = styled(LoadingButton)(({ theme }) => ({
	color: theme.palette.getContrastText(yellow[500]),
	padding: "1rem 2rem",
	borderRadius: "0rem",
	backgroundColor: "#fcc822",
	"&:hover": {
		backgroundColor: "#fcc822",
	},
	"&.MuiButton-text": {
		color: "white",
	},
	"&.MuiButton-contained": {
		color: "white",
	},
	"&.MuiButton-outlined": {
		color: "#fcc822",
	},
}));

export { LogButton, LoadingLogButton };

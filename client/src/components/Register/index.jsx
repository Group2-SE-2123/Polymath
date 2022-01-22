import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { yellow } from "@mui/material/colors";
import {
	Grid,
	FormControlLabel,
	Checkbox,
	Avatar,
	CssBaseline,
	Typography,
	Box,
	Paper,
} from "@mui/material";
import axios from "axios";

import queryClient from "../../config/queryClient";
import Hero from "../../images/Hero.svg";
import Navbar from "../Navbar";
import InputField from "./InputField";
import { getUserData } from "../../api/auth";
import { LogButton, LoadingLogButton } from "./Buttons";

function Register() {
	// Hooks
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const registerMutation = useMutation(
		async (data) => {
			return axios({
				method: "POST",
				url: "/auth/register",
				withCredentials: true,
				data,
			}).then((res) => {
				if (res.status !== 200) {
					return null;
				}
				return res.data;
			});
		},
		{
			onSuccess: async (data) => {
				setIsSubmitting(false);
				queryClient.setQueryData("session", data);
				const userData = await getUserData(data.token);
				queryClient.setQueryData("user_details", userData);
				navigate("/dashboard", { replace: true });
			},
			onError: () => {
				setIsSubmitting(false);
			},
		}
	);

	//  handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		const name = `${firstName} ${lastName}`;
		const user = {
			name,
			email,
			password,
			confirmPassword,
		};
		registerMutation.mutate(user);
	};

	return (
		<>
			<Navbar />
			<Grid container component="main" sx={{ height: "100vh" }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: `url(${Hero})`,
						backgroundRepeat: "no-repeat",
						backgroundColor: (t) =>
							t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "#fcc822" }}></Avatar>
						<Typography component="h1" variant="h5">
							Register
						</Typography>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
							<div className="flex flex-row mt-5">
								<InputField
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									label="First Name"
									required
									name="firstName"
									variant="outlined"
									id="validation-outlined-first-name"
								/>
								<div className="ml-auto">
									<InputField
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										label="Last Name"
										required
										name="lastName"
										variant="outlined"
										id="validation-outlined-last-name"
									/>
								</div>
							</div>

							<InputField
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								label="Email Address"
								fullWidth
								required
								name="email"
								variant="outlined"
								id="validation-outlined-email"
								sx={{ mt: 3 }}
							/>

							<InputField
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								label="Password"
								fullWidth
								required
								name="password"
								type="password"
								variant="outlined"
								id="validation-outlined-password"
								sx={{ mt: 3 }}
							/>

							<InputField
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								label="Confirm Password"
								fullWidth
								required
								name="confirmPassword"
								type="password"
								variant="outlined"
								id="validation-outlined-confirm-password"
								sx={{ mt: 3 }}
							/>
							<Grid container sx={{ mt: 3 }}>
								<Grid item xs>
									<FormControlLabel
										control={
											<Checkbox
												value="promotions"
												sx={{
													"&.Mui-checked": {
														color: yellow[600],
													},
												}}
											/>
										}
										label="I want to receive inspiration, marketing promotions and updates via email."
									/>
								</Grid>
							</Grid>
							<div className="flex flex-row mt-5">
								<SignUpButton submitFunc={handleSubmit} isSubmitting={isSubmitting} />
							</div>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}

const SignUpButton = (props) => {
	const { isSubmitting, submitFunc } = props;
	if (isSubmitting) {
		return (
			<LoadingLogButton onClick={submitFunc} loading variant="contained">
				Register
			</LoadingLogButton>
		);
	}
	return (
		<LogButton onClick={submitFunc} variant="contained">
			Register
		</LogButton>
	);
};

SignUpButton.propTypes = {
	isSubmitting: PropTypes.bool.isRequired,
	submitFunc: PropTypes.func.isRequired,
};

export default Register;

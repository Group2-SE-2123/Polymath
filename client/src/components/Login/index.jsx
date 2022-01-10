import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { yellow } from "@mui/material/colors";
import { Grid, FormControlLabel, Checkbox } from "@mui/material";

import Logo from "../../images/Logo.svg";
import Icon from "../../images/Icon.svg";
import Navbar from "../Navbar";
import queryClient from "../../config/queryClient";
import { getUserData } from "../../api/auth";
import InputField from "./InputField";
import { LogButton, LoadingLogButton } from "./Buttons";
import "./style.scss";

function Login() {
	// Hooks
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	// React Queries
	const loginMutation = useMutation(
		async (data) => {
			return axios({
				method: "POST",
				data,
				withCredentials: true,
				url: "/auth/login",
			}).then((res) => {
				if (res.status !== 200) {
					if (res.status === 400) {
						setError("Please fill all the fields correctly!");
					} else if (res.status === 401) {
						setError("Invalid email and password combination.");
					} else {
						setError("Something went wrong");
					}
					return null;
				}
				return res.data;
			});
		},
		{
			onSuccess: async (data) => {
				queryClient.setQueryData("session", data);
				const userData = await getUserData(data.token);
				queryClient.setQueryData("user_details", userData);
				navigate("/dashboard", { replace: true });
				setIsSubmitting(false);
			},
			onError: () => {
				setError("Something went wrong");
				setIsSubmitting(false);
			},
		}
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setEmail("");
		setPassword("");
		const data = {
			email,
			password,
		};

		loginMutation.mutate(data);
	};

	return (
		<>
			<Navbar />
			{error && <div intent="danger">{error}</div>}
			<div className="bg-white font-family-karla h-screen">
				<div className="w-full h-full flex flex-wrap">
					<div className="w-full md:w-2/3 lg:w-1/2 flex flex-col">
						<div className="flex flex-col justify-center md:justify-start pt-0 md:pt-8 px-8 sm:px-40 md:px-10 lg:px-20">
							<div className="max-w-md w-full space-y-8">
								<div>
									<img className="mx-auto h-20 w-auto" src={Logo} alt="Workflow" />
									<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
										Sign in to your account
									</h2>
									<p className="mt-2 text-center text-sm text-gray-600">
										Please login with your email and password
									</p>
								</div>
								<div className="mt-8 space-y-6">
									<InputField
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										label="Email Address"
										fullWidth
										required
										name="email"
										variant="outlined"
										id="validation-outlined-email"
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
									/>
									<Grid container>
										<Grid item xs>
											<FormControlLabel
												control={
													<Checkbox
														value="remember"
														sx={{
															"&.Mui-checked": {
																color: yellow[600],
															},
														}}
													/>
												}
												label="Remember me"
											/>
										</Grid>
										<Grid my="auto" item>
											<h3 className="select-none cursor-pointer text-slate-100 font-semibold">
												Forgot Password?
											</h3>
										</Grid>
									</Grid>
									<div className="flex flex-row">
										<LoginButton submitFunc={handleSubmit} isSubmitting={isSubmitting} />
										<div className="md:ml-10 ml-auto">
											<LogButton variant="outlined">Sign Up</LogButton>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="md:w-1/3 lg:w-1/2 flex">
						<img className="hidden md:flex m-auto h-60 lg:h-96" src={Icon} />
					</div>
				</div>
			</div>
		</>
	);
}

const LoginButton = (props) => {
	const { isSubmitting, submitFunc } = props;
	if (isSubmitting) {
		return (
			<LoadingLogButton onClick={submitFunc} loading variant="contained">
				Log In
			</LoadingLogButton>
		);
	}
	return (
		<LogButton onClick={submitFunc} variant="contained">
			Log In
		</LogButton>
	);
};

LoginButton.propTypes = {
	isSubmitting: PropTypes.bool.isRequired,
	submitFunc: PropTypes.func.isRequired,
};

export default Login;

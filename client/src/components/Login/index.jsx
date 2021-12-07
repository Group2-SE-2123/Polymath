import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Logo from "../../images/Logo.svg";
import Icon from "../../images/Icon.svg";
import "./style.scss";

function Login() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setEmail("");
		setPassword("");
		const data = {
			email,
			password,
		};

		axios({
			method: "POST",
			data,
			withCredentials: true,
			url: "/auth/login",
		})
			.then((res) => {
				setIsSubmitting(false);
				console.log(res);
			})
			.catch((err) => {
				setIsSubmitting(false);
				console.log(err);
			});
	};

	return (
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
							<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
								<div className="rounded-md shadow-sm -space-y-px">
									<div>
										<label htmlFor="email-address" className="sr-only">
											Email address
										</label>
										<input
											id="email-address"
											name="email"
											type="email"
											autoComplete="email"
											required
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
											placeholder="Email address"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div>
										<label htmlFor="password" className="sr-only">
											Password
										</label>
										<input
											id="password"
											name="password"
											type="password"
											autoComplete="current-password"
											required
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
											placeholder="Password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<input
											id="remember-me"
											name="remember-me"
											type="checkbox"
											className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
										/>
										<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
											Remember me
										</label>
									</div>

									<div className="text-sm">
										<a href="#" className="font-medium text-black-600 hover:text-black-500">
											Forgot your password?
										</a>
									</div>
								</div>

								<div>
									<LoginButton isSubmitting={isSubmitting} />
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className="md:w-1/3 lg:w-1/2 flex">
					<img className="hidden md:flex m-auto h-60 lg:h-96" src={Icon} />
				</div>
			</div>
		</div>
	);
}

const LoginButton = (props) => {
	const { isSubmitting } = props;
	const ChosenIcon = isSubmitting ? <SpinnerIcon /> : <LockIcon />;
	return (
		<button
			disabled={isSubmitting}
			type="submit"
			className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<span className="absolute left-0 inset-y-0 flex items-center pl-3">{ChosenIcon}</span>
			Sign in
		</button>
	);
};

const SpinnerIcon = () => {
	return (
		<svg
			className="animate-spin w-5 h-5 mx-1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fillRule="evenodd"
				d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

const LockIcon = () => {
	return (
		<svg
			className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fillRule="evenodd"
				d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

LoginButton.propTypes = {
	isSubmitting: PropTypes.bool.isRequired,
};

export default Login;

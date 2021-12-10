import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import PropTypes from "prop-types";

import Logo from "../../images/Logo.svg";
import { UserContext } from "../../context/UserContext";
import { GlobalContext } from "../../context/GlobalContext";
import WhiteDropdown from "../Dropdowns/WhiteDropdown";
import "./style.scss";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [userContext] = useContext(UserContext);
	const [globalContext, setGlobalContext] = useContext(GlobalContext);
	const openMenu = () => setIsOpen(true);
	const closeMenu = () => setIsOpen(false);

	const getUser = () => {
		axios({
			method: "GET",
			withCredentials: true,
			url: "/auth/me",
			headers: {
				Authorization: `Bearer ${userContext}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				setGlobalContext((prevState) => {
					return { ...prevState, user: res.data };
				});
			} else {
				setGlobalContext((prevState) => {
					return { ...prevState, user: null };
				});
			}
		});
	};

	useEffect(() => {
		if (!globalContext.user) {
			getUser();
		}
	}, []);

	return (
		<div className="relative bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div
					className="
				flex
				justify-between
				items-center
				border-b-2 border-gray-100
				py-6
				md:justify-start md:space-x-10
			"
				>
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<a href="#">
							<span className="sr-only">Workflow</span>
							<img className="h-8 w-auto sm:h-10" src={Logo} alt="" />
						</a>
					</div>
					<div className="-mr-2 -my-2 md:hidden">
						<button
							type="button"
							className="
						bg-white
						rounded-md
						p-2
						inline-flex
						items-center
						justify-center
						text-gray-400
						hover:text-gray-500 hover:bg-gray-100
						focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500
					"
							aria-expanded="false"
							onClick={openMenu}
						>
							<span className="sr-only">Open menu</span>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
					<nav className="hidden md:flex space-x-10">
						<a
							href="#"
							className="
						text-base
						font-poppins
						font-weight:
						500
						text-gray-500
						hover:text-gray-900
					"
						>
							How it works?
						</a>
						<a
							href="#"
							className="
						text-base
						font-poppins
						font-weight:
						500
						text-gray-500
						hover:text-gray-900
					"
						>
							Docs
						</a>

						<a
							href="#"
							className="
						text-base
						font-poppins
						font-weight:
						500
						text-gray-500
						hover:text-gray-900
					"
						>
							About Us
						</a>
					</nav>
					<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
						{!globalContext.user ? <NoAuth /> : <Auth user={globalContext.user} />}
					</div>
				</div>
			</div>

			<div
				className={`absolute z-20 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden ${
					isOpen ? "visible" : "invisible"
				}`}
			>
				<div
					className="
				rounded-lg
				shadow-lg
				ring-1 ring-black ring-opacity-5
				bg-white
				divide-y-2 divide-gray-50
			"
				>
					<div className="pt-5 pb-6 px-5">
						<div className="flex items-center justify-between">
							<div>
								<img
									className="h-8 w-auto"
									src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
									alt="Workflow"
								/>
							</div>
							<div className="-mr-2">
								<button
									type="button"
									className="
								bg-white
								rounded-md
								p-2
								inline-flex
								items-center
								justify-center
								text-gray-400
								hover:text-gray-500 hover:bg-gray-100
								focus:outline-none
								focus:ring-2
								focus:ring-inset
								focus:ring-indigo-500
							"
									onClick={closeMenu}
								>
									<span className="sr-only">Close menu</span>
									<svg
										className="h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div className="mt-6">
							<nav className="grid gap-y-8">
								<a href="#" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
									<svg
										className="flex-shrink-0 h-6 w-6 text-indigo-600"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
										/>
									</svg>
									<span className="ml-3 text-base font-medium text-gray-900">Analytics</span>
								</a>

								<a href="#" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
									<svg
										className="flex-shrink-0 h-6 w-6 text-indigo-600"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
										/>
									</svg>
									<span className="ml-3 text-base font-medium text-gray-900">Engagement</span>
								</a>

								<a href="#" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
									<svg
										className="flex-shrink-0 h-6 w-6 text-indigo-600"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
										/>
									</svg>
									<span className="ml-3 text-base font-medium text-gray-900"> Security </span>
								</a>

								<a href="#" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
									<svg
										className="flex-shrink-0 h-6 w-6 text-indigo-600"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
										/>
									</svg>
									<span className="ml-3 text-base font-medium text-gray-900">Integrations</span>
								</a>

								<a href="#" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
									<svg
										className="flex-shrink-0 h-6 w-6 text-indigo-600"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									<span className="ml-3 text-base font-medium text-gray-900">Automations</span>
								</a>
							</nav>
						</div>
					</div>
					<div className="py-6 px-5 space-y-6">
						<div className="grid grid-cols-2 gap-y-4 gap-x-8">
							<a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
								Pricing
							</a>

							<a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
								Docs
							</a>

							<a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
								Help Center
							</a>

							<a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
								Guides
							</a>

							<a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
								Events
							</a>

							<a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
								Security
							</a>
						</div>
						<div>
							<a
								href="#"
								className="
							w-full
							flex
							items-center
							justify-center
							px-4
							py-2
							border border-transparent
							rounded-md
							shadow-sm
							text-base
							font-medium
							text-white
							bg-indigo-600
							hover:bg-indigo-700
						"
							>
								Sign up
							</a>
							<p className="mt-6 text-center text-base font-medium text-gray-500">
								Existing customer?
								<a href="#" className="text-indigo-600 hover:text-indigo-500">
									{" "}
									Sign in{" "}
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const NoAuth = () => {
	return (
		<>
			<Link to="/login">
				<button
					className="
    whitespace-nowrap
    text-base
    font-medium
    text-gray-500
    hover:text-gray-900
  "
				>
					Sign in
				</button>
			</Link>
			<Link to="/register">
				<button
					className="
    ml-8
    whitespace-nowrap
    inline-flex
    items-center
    justify-center
    px-4
    py-2
    border border-transparent
    rounded-md
    shadow-sm
    text-base
    font-medium
    text-color-linear
    border-color-linear
    button-color-linear
  "
				>
					Sign up
				</button>
			</Link>
		</>
	);
};

const Auth = ({ user }) => {
	const { name } = user;
	return (
		<>
			<FaUserAlt color="#FCC822" />
			<h1 className="name-text ml-3">{name}</h1>
			<WhiteDropdown />
		</>
	);
};

Auth.propTypes = {
	user: PropTypes.object,
	name: PropTypes.string,
};

export default Navbar;
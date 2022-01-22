import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { MdHelp } from "react-icons/md";
import { SiReadthedocs } from "react-icons/si";
import { FcAbout } from "react-icons/fc";
import PropTypes from "prop-types";

import Logo from "../../images/Logo.svg";
import "./style.scss";

import queryClient from "../../config/queryClient";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const openMenu = () => setIsOpen(true);
	const closeMenu = () => setIsOpen(false);

	const userQuery = useQuery("user_details", async () => {
		const sessionQuery = queryClient.getQueryData("session");
		if (!sessionQuery) return null;
		return axios({
			method: "GET",
			withCredentials: true,
			url: "/auth/me",
			headers: {
				Authorization: `Bearer ${sessionQuery.token}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					return res.data;
				}
				return null;
			})
			.catch(() => {
				return null;
			});
	});

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
						<Link to="/">
							<span className="sr-only">Workflow</span>
							<img className="h-8 w-auto sm:h-10" src={Logo} alt="" />
						</Link>
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
						{!userQuery.data ? <NoAuth /> : <Auth user={userQuery.data} />}
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
								<img src={Logo} alt="Logo" />
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
									<MdHelp size={30} style={{ color: "#2196F3" }} />
									<span className="ml-3 text-base font-medium text-gray-900">How it works?</span>
								</a>
								<a href="#" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
									<SiReadthedocs size={30} style={{ color: "#2196F3" }} />
									<span className="ml-3 text-base font-medium text-gray-900">Docs</span>
								</a>
								<a href="#" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
									<FcAbout size={30} />
									<span className="ml-3 text-base font-medium text-gray-900">About Us</span>
								</a>
							</nav>
						</div>
					</div>
					<div className="py-6 px-5 space-y-6">
						<div>
							<Link to="/register">
								<span
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
							bg-custom-yellow
							hover:bg-yellow-400
						"
								>
									Register
								</span>
							</Link>
							<p className="mt-6 text-center text-base font-medium text-gray-500">
								Existing customer?
								<Link to="/login">
									<span
										href="#"
										className="select-none cursor-pointer text-custom-yellow hover:text-yellow-400"
									>
										{" "}
										Log In{" "}
									</span>
								</Link>
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
					Log In
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
					Register
				</button>
			</Link>
		</>
	);
};

const Auth = ({ user }) => {
	const { name } = user;
	return (
		<>
			<Link to="/dashboard">
				<div className="flex flex-row mr-3">
					<FaUserAlt color="#FCC822" />
					<h1 className="name-text ml-3 select-none">{name}</h1>
				</div>
			</Link>
		</>
	);
};

Auth.propTypes = {
	user: PropTypes.object,
	name: PropTypes.string,
};

export default Navbar;

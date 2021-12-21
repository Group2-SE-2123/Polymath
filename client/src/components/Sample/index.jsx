import React from "react";

// Icons
import { AiFillFlag, AiFillClockCircle, AiFillCheckCircle } from "react-icons/ai";

import Navbar from "../Navbar";
import ProfileImg from "../../images/img/profile.png";

import "./style.scss";

function index() {
	return (
		<div>
			<Navbar />

			<main className="dashboard-font flex w-full h-screen dashboard-background">
				<aside className="w-80 h-screen bg-gray w-fulll hidden sm:block">
					<div className="flex flex-col justify-between h-screen p-4 dashboard-background">
						<div className="text-sm">
							<div className="bg-gray-900 text-white p-5 rounded cursor-pointer">
								Teams in space
							</div>
						</div>

						<div className="flex p-3 text-white bg-red-500 rounded cursor-pointer text-center text-sm">
							<button className="rounded inline-flex items-center">
								<svg
									className="w-4 h-4 mr-2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
										clipRule="evenodd"
									/>
								</svg>
								<span className="font-semibold">Logout</span>
							</button>
						</div>
					</div>
				</aside>

				<section className="w-full p-4 bg-white shadow-2xl rounded-2xl m-5">
					<div className="flex w-full flex-col md:flex-row justify-center p-4">
						<div className="md:w-96 w-40 p-0">
							<img src={ProfileImg} alt="profile-img" />
						</div>
						<div className="w-full flex flex-col md:pt-5">
							<div className="dashboard-text text-3xl font-bold">Hans Daduya</div>
							<div className="dashboard-text font-light">2nd Year Student</div>
							<div className="w-full bg-gray-200 h-2 rounded-lg my-3">
								<div className="bg-gray-400 h-2 rounded-lg w-1/2" style={{ width: "25%" }}></div>
							</div>
							<div className="grid grid-cols-3 gap-3 my-5">
								<div className="flex flex-row">
									<div className="flex w-12 h-12 rounded-xl shadow-lg">
										<AiFillFlag className="m-auto" size={30} style={{ color: "#696F79" }} />
									</div>
									<div className="flex flex-col mx-2">
										<div className="dashboard-text font-bold">27</div>
										<div className="dashboard-text font-light">Quiz Passed</div>
									</div>
								</div>
								<div className="flex flex-row">
									<div className="flex w-12 h-12 rounded-xl shadow-lg">
										<AiFillClockCircle className="m-auto" size={30} style={{ color: "#696F79" }} />
									</div>
									<div className="flex flex-col mx-2">
										<div className="dashboard-text font-bold">27min</div>
										<div className="dashboard-text font-light">Fastest Time</div>
									</div>
								</div>
								<div className="flex flex-row">
									<div className="flex w-12 h-12 rounded-xl shadow-lg">
										<AiFillCheckCircle className="m-auto" size={30} style={{ color: "#696F79" }} />
									</div>
									<div className="flex flex-col mx-2">
										<div className="dashboard-text font-bold">200</div>
										<div className="dashboard-text font-light">Correct Answers</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default index;

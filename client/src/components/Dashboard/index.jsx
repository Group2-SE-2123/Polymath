import React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

// Icons
import { AiFillFlag, AiFillClockCircle, AiFillCheckCircle } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import queryClient from "../../config/queryClient";
import Navbar from "../Navbar";

// Images
import Badge1 from "../../images/svg/Badge1.svg";
import Badge2 from "../../images/svg/Badge2.svg";
import Badge3 from "../../images/svg/Badge3.svg";
import ArithmeticImg from "../../images/img/arithmetic.jpg";
import AlgebraImg from "../../images/img/algebra.jpg";
import GeometryImg from "../../images/img/geometry.jpg";
import CalculusImg from "../../images/img/calculus.jpg";
import ProfileImg from "../../images/img/profile.png";

// Internal Imports
import { NumberAnimation } from "../../animations";
import "./style.scss";

const Welcome = () => {
	// Hooks
	const navigate = useNavigate();
	const logoutMutation = useMutation(
		async () => {
			const sessionQuery = queryClient.getQueryData("session");
			return axios({
				method: "GET",
				withCredentials: true,
				url: "/auth/logout",
				headers: {
					Authorization: `Bearer ${sessionQuery.token}`,
				},
			});
		},
		{
			onSuccess: () => {
				queryClient.removeQueries("session");
				queryClient.removeQueries("user_details");
				navigate("/", { replace: true });
			},
		}
	);

	const logoutHandler = () => {
		logoutMutation.mutate();
	};
	return (
		<>
			<div>
				<Navbar />

				<main className="dashboard-font flex w-full h-full dashboard-background">
					<aside className="w-80 bg-gray hidden sm:flex sm:flex-col my-5 ml-5">
						<div className="text-sm flex w-full pl-7 lg:pl-10 rounded-full mx-auto selected-nav">
							<MdSpaceDashboard size={30} className="mr-7 my-5" style={{ color: "#fff" }} />
							<h3 className="my-auto text-white font-medium">Dashboard</h3>
						</div>
						<div className="text-sm flex w-full pl-7 lg:pl-10 rounded-full mx-auto">
							<BiSupport size={30} className="mr-7 my-5" style={{ color: "#696F79" }} />
							<h3 className="my-auto dashboard-text font-medium">Support</h3>
						</div>
						<div className="text-sm flex w-full pl-7 lg:pl-10 rounded-full mx-auto">
							<IoMdNotifications size={30} className="mr-7 my-5" style={{ color: "#696F79" }} />
							<h3 className="my-auto dashboard-text font-medium">Notifications</h3>
						</div>

						<div
							onClick={logoutHandler}
							className="mt-auto text-sm flex w-full pl-7 lg:pl-10 rounded-full mx-auto"
						>
							<RiLogoutBoxFill size={30} className="mr-7 my-5" style={{ color: "#696F79" }} />
							<h3 className="my-auto dashboard-text font-semibold">Log Out</h3>
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
											<div className="dashboard-text font-bold">
												<NumberAnimation value={27} delay={1000} fixed={0} />
											</div>
											<div className="dashboard-text font-light">Quiz Passed</div>
										</div>
									</div>
									<div className="flex flex-row">
										<div className="flex w-12 h-12 rounded-xl shadow-lg">
											<AiFillClockCircle
												className="m-auto"
												size={30}
												style={{ color: "#696F79" }}
											/>
										</div>
										<div className="flex flex-col mx-2">
											<div className="inline-flex dashboard-text font-bold">
												<NumberAnimation value={27} delay={200} fixed={0} />
												<span className="mx-2">min</span>
											</div>
											<div className="dashboard-text font-light">Fastest Time</div>
										</div>
									</div>
									<div className="flex flex-row">
										<div className="flex w-12 h-12 rounded-xl shadow-lg">
											<AiFillCheckCircle
												className="m-auto"
												size={30}
												style={{ color: "#696F79" }}
											/>
										</div>
										<div className="flex flex-col mx-2">
											<div className="dashboard-text font-bold">
												<NumberAnimation value={200} delay={1000} fixed={0} />
											</div>
											<div className="dashboard-text font-light">Correct Answers</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col lg:flex-row">
							<div className="flex flex-col w-full py-3 lg:w-1/2 lg:mx-5 my-5 lg:my-0">
								<div className="flex flex-row mx-5">
									<h3 className="w-1/2 dashboard-text font-bold">Achievements</h3>
									<div className="w-1/2 bg-gray-200 h-2 rounded-lg my-3">
										<div
											className="bg-gray-400 h-2 rounded-lg w-1/2"
											style={{ width: "50%" }}
										></div>
									</div>
								</div>
								<div className="grid grid-cols-1 divide-y w-full p-4 bg-white shadow-2xl rounded-2xl">
									<div className="grid grid-cols-3 gap-3 pt-5 mb-8">
										<div className="flex flex-col items-center">
											<img className="w-20" src={Badge1} alt="badge1" />
											<h3>Comeback</h3>
										</div>
										<div className="flex flex-col items-center"></div>
										<div className="flex flex-col items-center">
											<img className="w-20" src={Badge2} alt="badge2" />
											<h3>Lucky</h3>
										</div>
										<div className="flex flex-col items-center"></div>
										<div className="flex flex-col items-center">
											<img className="w-20" src={Badge3} alt="badge3" />
											<h3>Winner</h3>
										</div>
										<div className="flex flex-col items-center"></div>
									</div>
									<div className="flex">
										<h3 className="mx-auto mt-7 mb-4 dashboard-text font-normal cursor-pointer">
											View All
										</h3>
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full py-3 lg:w-1/2 lg:mx-5 my-5 lg:my-0">
								<div className="flex flex-row mx-5">
									<h3 className="w-1/2 dashboard-text font-bold">Categories</h3>
									<div className="ml-auto cursor-pointer">
										<h3 className="dashboard-text font-normal">View All</h3>
									</div>
								</div>
								<div className="w-full p-4 bg-white shadow-2xl rounded-2xl">
									<div className="grid grid-cols-2 gap-2 justify-center pt-5">
										<div className="relative mx-auto">
											<img className="h-40 w-40 mx-none rounded-3xl" src={ArithmeticImg} alt="" />
											<h3 className="absolute text-white bottom-2 left-2 font-bold">Arithmetic</h3>
										</div>
										<div className="relative mx-auto">
											<img className="h-40 w-40 mx-none rounded-3xl" src={AlgebraImg} alt="" />
											<h3 className="absolute text-white bottom-2 left-2 font-bold">Algebra</h3>
										</div>
										<div className="relative mx-auto">
											<img className="h-40 w-40 mx-none rounded-3xl" src={GeometryImg} alt="" />
											<h3 className="absolute text-white bottom-2 left-2 font-bold">Geometry</h3>
										</div>
										<div className="relative mx-auto">
											<img className="h-40 w-40 mx-none rounded-3xl" src={CalculusImg} alt="" />
											<h3 className="absolute text-white bottom-2 left-2 font-bold">Calculus</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default Welcome;

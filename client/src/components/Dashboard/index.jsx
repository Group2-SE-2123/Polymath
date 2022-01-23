import React from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import produce from "immer";
import PropTypes from "prop-types";

// Icons
import { MdSpaceDashboard, MdQuiz } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import queryClient from "../../config/queryClient";
import Navbar from "../Navbar";

// Internal Imports
import DashboardView from "./DashboardView";
import QuizzesList from "./QuizzesList";
import QuizDetails from "./QuizDetails";
import ActiveQuizzes from "./ActiveQuizzes";
import QuizResults from "./QuizResults";
import { getComponent } from "../../helper";
import "./style.scss";

const Welcome = () => {
	// Hooks
	const navigate = useNavigate();
	const [sidebarState, setSidebarState] = React.useState({
		dashboardState: false,
		supportState: false,
		notificationsState: false,
		quizzesListState: false,
		quizDetailsState: false,
		activeQuizzes: false,
		quizResultsState: false,
	});

	// Functions
	const toggleSidebar = (section) => {
		setSidebarState(
			produce(sidebarState, (draft) => {
				Object.keys(draft).forEach((key) => {
					draft[key] = false;
				});
				draft[section] = true;
			})
		);
	};

	// React Queries
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
				queryClient.clear();
				navigate("/", { replace: true });
			},
		}
	);

	const quizzesQuery = useQuery("quiz_list", async () => {
		return axios({
			method: "GET",
			url: "/api/quiz/getAll",
		})
			.then((res) => res.data)
			.catch(() => null);
	});

	const logoutHandler = () => {
		logoutMutation.mutate();
	};

	return (
		<>
			<div>
				<Navbar />

				<main className="dashboard-font flex w-full h-full dashboard-background">
					<aside className="w-80 bg-gray hidden sm:flex sm:flex-col my-5 ml-5">
						<SidebarButton
							text={"Dashboard"}
							Icon={MdSpaceDashboard}
							isSelected={sidebarState.dashboardState}
							toggleFunc={() => toggleSidebar("dashboardState")}
						/>
						<SidebarButton
							text={"Support"}
							Icon={BiSupport}
							isSelected={sidebarState.supportState}
							toggleFunc={() => toggleSidebar("supportState")}
						/>
						<SidebarButton
							text={"Notifications"}
							Icon={IoMdNotifications}
							isSelected={sidebarState.notificationsState}
							toggleFunc={() => toggleSidebar("notificationsState")}
						/>
						<SidebarButton
							text={"Quizzes"}
							Icon={MdQuiz}
							isSelected={sidebarState.activeQuizzes}
							toggleFunc={() => toggleSidebar("activeQuizzes")}
						/>

						<div
							onClick={logoutHandler}
							className="mt-auto text-sm flex w-full pl-7 lg:pl-10 rounded-full mx-auto"
						>
							<RiLogoutBoxFill size={30} className="mr-7 my-5" style={{ color: "#696f79" }} />
							<h3 className="cursor-pointer select-none my-auto dashboard-text font-semibold">
								Log Out
							</h3>
						</div>
					</aside>

					<section className="w-full p-4 bg-white shadow-2xl rounded-2xl m-5">
						{getComponent([
							{
								state: sidebarState.dashboardState,
								component: <DashboardView dataQuery={quizzesQuery} toggleFunc={toggleSidebar} />,
							},
							{ state: sidebarState.supportState, component: <div>Support</div> },
							{ state: sidebarState.notificationsState, component: <div>Notifications</div> },
							{
								state: sidebarState.quizzesListState,
								component: <QuizzesList toggleFunc={toggleSidebar} />,
							},
							{
								state: sidebarState.quizDetailsState,
								component: <QuizDetails toggleFunc={toggleSidebar} />,
							},
							{ state: sidebarState.activeQuizzes, component: <ActiveQuizzes /> },
							{
								state: sidebarState.quizResultsState,
								component: <QuizResults />,
							},
							{
								state: true,
								component: <DashboardView dataQuery={quizzesQuery} toggleFunc={toggleSidebar} />,
							},
						])}
					</section>
				</main>
			</div>
		</>
	);
};

const SidebarButton = (props) => {
	const { text, Icon, isSelected, toggleFunc } = props;
	if (isSelected) {
		return (
			<div
				onClick={toggleFunc}
				className="cursor-pointer select-none text-sm flex w-full pl-7 lg:pl-10 rounded-full mx-auto selected-nav"
			>
				<Icon size={30} className="mr-7 my-5" style={{ color: "#fff" }} />
				<h3 className="my-auto text-white font-medium">{text}</h3>
			</div>
		);
	}
	return (
		<div
			onClick={toggleFunc}
			className="cursor-pointer select-none text-sm flex w-full pl-7 lg:pl-10 rounded-full mx-auto"
		>
			<Icon size={30} className="mr-7 my-5" style={{ color: "#696f79" }} />
			<h3 className="my-auto dashboard-text font-medium">{text}</h3>
		</div>
	);
};

SidebarButton.propTypes = {
	text: PropTypes.string.isRequired,
	Icon: PropTypes.elementType.isRequired,
	isSelected: PropTypes.bool,
	toggleFunc: PropTypes.func.isRequired,
};

export default Welcome;

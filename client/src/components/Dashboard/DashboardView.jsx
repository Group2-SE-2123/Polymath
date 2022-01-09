import React from "react";
import PropTypes from "prop-types";

// Icons
import { AiFillFlag, AiFillClockCircle, AiFillCheckCircle } from "react-icons/ai";

// Images
import Badge1 from "../../images/svg/Badge1.svg";
import Badge2 from "../../images/svg/Badge2.svg";
import Badge3 from "../../images/svg/Badge3.svg";
import ProfileImg from "../../images/img/profile.png";

// Internal Imports
import { NumberAnimation } from "../../animations";

function DashboardView(props) {
	const { dataQuery, toggleFunc } = props;
	return (
		<>
			<div className="flex w-full flex-col md:flex-row justify-center p-4">
				<div className="md:w-96 w-40 p-0">
					<img src={ProfileImg} alt="profile-img" />
				</div>
				<div className="w-full flex flex-col md:pt-5">
					<div className="dashboard-text text-3xl font-bold">Hans Daduya</div>
					<div className="dashboard-text font-light">2nd Year Student</div>
					<div className="w-full bg-gray-200 h-2 rounded-lg my-3">
						<div className="bg-yellow-300 h-2 rounded-lg w-1/2" style={{ width: "25%" }}></div>
					</div>
					<div className="grid grid-cols-3 gap-3 my-5">
						<div className="flex flex-row">
							<div className="flex w-12 h-12 rounded-xl shadow-lg">
								<AiFillFlag className="m-auto" size={30} style={{ color: "#696f79" }} />
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
								<AiFillClockCircle className="m-auto" size={30} style={{ color: "#696f79" }} />
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
								<AiFillCheckCircle className="m-auto" size={30} style={{ color: "#696f79" }} />
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
							<div className="bg-yellow-300 h-2 rounded-lg w-1/2" style={{ width: "50%" }}></div>
						</div>
					</div>
					<div className="grid grid-cols-1 divide-y w-full p-4 bg-white shadow-2xl rounded-2xl">
						<div className="grid grid-cols-3 gap-3 pt-5 mb-8">
							<div className="flex flex-col items-center transform transition duration-500 hover:scale-110">
								<img className="w-20" src={Badge1} alt="badge1" />
								<h3>Comeback</h3>
							</div>
							<div className="flex flex-col items-center transform transition duration-500 hover:scale-110"></div>
							<div className="flex flex-col items-center transform transition duration-500 hover:scale-110">
								<img className="w-20" src={Badge2} alt="badge2" />
								<h3>Lucky</h3>
							</div>
							<div className="flex flex-col items-center transform transition duration-500 hover:scale-110"></div>
							<div className="flex flex-col items-center transform transition duration-500 hover:scale-110">
								<img className="w-20" src={Badge3} alt="badge3" />
								<h3>Winner</h3>
							</div>
							<div className="flex flex-col items-center transform transition duration-500 hover:scale-110"></div>
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
						<h3 className="w-1/2 dashboard-text font-bold">Quizzes</h3>
						<div
							onClick={() => toggleFunc("quizzesListState")}
							className="ml-auto select-none cursor-pointer"
						>
							<h3 className="dashboard-text font-normal">View All</h3>
						</div>
					</div>
					<div className="w-full p-4 bg-white shadow-2xl rounded-2xl">
						<div className="grid grid-cols-2 gap-2 justify-center pt-5">
							{!dataQuery.isLoading &&
								dataQuery.data.map((quiz) => {
									return (
										<div
											onClick={() => toggleFunc("quizDetailsState")}
											className="relative mx-auto transform transition duration-500 hover:scale-110"
											key={quiz.id}
										>
											<img className="h-40 w-40 mx-none rounded-3xl" src={quiz.imageUrl} alt="" />
											<h3 className="select-none absolute text-white bottom-2 left-2 font-bold">
												{quiz.name}
											</h3>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

DashboardView.propTypes = {
	toggleFunc: PropTypes.func.isRequired,
	dataQuery: PropTypes.object.isRequired,
};

export default DashboardView;

import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

import queryClient from "../../config/queryClient";
import "./style.scss";

function QuizzesList(props) {
	const { toggleFunc } = props;
	const toggleQuizDetails = (quiz) => () => {
		queryClient.setQueryData("quiz_details_info", quiz);
		toggleFunc("quizDetailsState");
	};
	const quizzesQuery = useQuery("quiz_list", async () => {
		return axios({
			method: "GET",
			url: "/api/quiz/getAll",
		})
			.then((res) => res.data)
			.catch(() => null);
	});
	return (
		<>
			<div className="mx-7 mt-4">
				<h3 className="dashboard-text font-semibold text-2xl mb-3">Select Quiz</h3>
				<div className="dashboard-text font-normal text-base">Quizzes</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-7">
				{!quizzesQuery.isLoading ? (
					quizzesQuery.data.map((quiz) => {
						const quizName = quiz.name.length > 10 ? `${quiz.name.substring(0, 10)}...` : quiz.name;
						return (
							<div
								onClick={toggleQuizDetails(quiz)}
								className="relative mx-auto transform transition duration-500 hover:scale-110"
								key={quiz.id}
							>
								<img className="h-40 w-40 mx-none rounded-3xl" src={quiz.imageUrl} alt="" />
								<h3 className="select-none absolute text-white bottom-2 left-2 font-bold">
									{quizName}
								</h3>
							</div>
						);
					})
				) : (
					<div className="text-center">Loading...</div>
				)}
			</div>
		</>
	);
}

QuizzesList.propTypes = {
	toggleFunc: PropTypes.func.isRequired,
};

export default QuizzesList;

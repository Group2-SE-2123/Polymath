import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import PropTypes from "prop-types";
import { newQuizRecord, getUserQuizzes, getQuizResults } from "../../api/quizRecord";
import queryClient from "../../config/queryClient";

function QuizDetails({ toggleFunc }) {
	const navigate = useNavigate();
	const { token } = queryClient.getQueryData("session") ?? "";
	const quizDetails = queryClient.getQueryData("quiz_details_info");
	const dateNow = new Date().toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const mutation = useMutation(getUserQuizzes, {
		onSuccess: (data) => {
			queryClient.setQueryData("user_quizzes", data);
		},
	});

	const resultsQuery = useQuery("quiz_results", getQuizResults(token, quizDetails.id), {
		enabled: false,
	});

	const clickResults = async () => {
		await resultsQuery.refetch();
		toggleFunc("quizResultsState");
	};

	const startQuiz = async () => {
		const sessionQuery = queryClient.getQueryData("session");
		if (!sessionQuery) return;
		const newQuiz = await newQuizRecord(sessionQuery.token, quizDetails.id);
		const newQuizId = newQuiz.id;
		mutation.mutate();
		navigate(`/active-quiz/${newQuizId}`);
	};

	return (
		<>
			<div className="mx-7 my-4">
				<h3 className="dashboard-text font-semibold text-2xl mb-3">{quizDetails.name}</h3>
				<div className="dashboard-text font-normal text-base">Read the following instructions</div>

				<div className="flex flex-col lg:flex-row my-5">
					<div className="w-full lg:w-1/2">
						<img
							className="h-40 w-80 lg:w-60 mx-auto lg:mx-0 lg:mr-auto rounded-3xl"
							src={quizDetails.imageUrl}
							alt=""
						/>
					</div>
					<div className="w-full my-6 lg:my-0 lg:w-1/2">
						<div className="grid grid-cols-2 gap-2">
							<div className="dashboard-text mx-auto lg:mx-0 lg:mr-auto font-semibold">Date:</div>
							<div className="dashboard-text mx-auto lg:mx-0 lg:mr-auto">{dateNow}</div>
							<div className="dashboard-text mx-auto lg:mx-0 lg:mr-auto font-semibold">
								Time Limit:
							</div>
							<div className="dashboard-text mx-auto lg:mx-0 lg:mr-auto">30 minutes</div>
							<div className="dashboard-text mx-auto lg:mx-0 lg:mr-auto font-semibold">
								Attempts:{" "}
							</div>
							<div className="dashboard-text mx-auto lg:mx-0 lg:mr-auto">Once</div>
							<div className="dashboard-text mx-auto lg:mx-0 lg:mr-auto font-semibold">
								Points:{" "}
							</div>
							<div className="dashboard-text mx-auto lg:mx-0 lg:mr-auto">50 points</div>
						</div>
					</div>
				</div>
				<div>
					<div className="dashboard-text font-bold">Instructions</div>
					<div className="dashboard-text my-5">
						<p className="my-4">
							This quiz consists of {quizDetails.length} multiple-choice questions. To be successful
							with the quizzes, it&apos;s important to conversant with the topics. Keep the
							following in mind:
						</p>
						<p className="my-4">
							Timing - You need to complete each of your attempts in one sitting, as you are
							allotted 30 minutes to each attempt. Answers - You may review your answer-choices and
							compare them to the correct answers after your final attempt.
						</p>
						<p className="my-4">
							To start, click the &quot;Start&quot; button. When finished, click the &quot;Submit
							&quot; button.
						</p>
					</div>
				</div>
				<div className="flex mt-10">
					<button
						onClick={clickResults}
						className="transform transition duration-500 hover:scale-110 mr-auto w-44 h-14 button-color text-white rounded-full"
					>
						Results
					</button>
					<button
						onClick={startQuiz}
						className="transform transition duration-500 hover:scale-110 ml-auto w-44 h-14 button-color text-white rounded-full"
					>
						Start
					</button>
				</div>
			</div>
		</>
	);
}

QuizDetails.propTypes = {
	toggleFunc: PropTypes.func.isRequired,
};

export default QuizDetails;

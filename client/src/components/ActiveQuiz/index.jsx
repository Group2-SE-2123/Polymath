/* eslint-disable no-nested-ternary */
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Icons
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

// Styles
import Navbar from "../Navbar";
import "./style.scss";

// Internal Imports
import Timer from "./Timer";
import CardChoice from "./CardChoice";
import ScoreModal from "./ScoreModal";
import queryClient from "../../config/queryClient";
import { submitQuizRecord } from "../../api/quizRecord";
import { getUpdatedCounter, transformQueryObject } from "../../helper";

const getTime = (quiz) => {
	return quiz.reduce((acc, curr) => {
		switch (curr.difficulty) {
			case "Easy":
				return acc + 30;
			case "Medium":
				return acc + 45;
			case "Hard":
				return acc + 60;
			default:
				return acc;
		}
	}, 0);
};

function Quiz() {
	// Hooks
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);
	const [isOpenScore, setIsOpenScore] = useState(false);
	const [score, setScore] = useState(0);
	const { quizId } = useParams();

	// Fetch Fns
	const fetchQuestions = (id) => async () => {
		return axios({
			method: "GET",
			url: `/api/quiz/get-questions/${id}`,
		}).then((questions) => {
			return questions.data;
		});
	};

	// React Queries
	const quizQuery = useQuery(["quiz", quizId], fetchQuestions(quizId));
	const selectionQuery = useQuery(
		["selection", quizId],
		() => {
			return new Array(quizQuery.data.length).fill(null);
		},
		{
			enabled: !!quizQuery.data,
		}
	);

	const timerQuery = useQuery(
		["timer", quizId],
		() => {
			return {
				counter: getTime(quizQuery.data),
				initialTime: new Date(),
			};
		},
		{
			enabled: !!quizQuery.data,
		}
	);

	const submitQuizMutation = useMutation(
		async (selectedChoices) => {
			return axios({
				method: "POST",
				data: {
					selectedChoices,
				},
				withCredentials: true,
				url: "/api/quiz/submitQuiz",
			}).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: async (data) => {
				const totalScore = data.reduce((acc, curr) => {
					return acc + curr.isCorrect;
				}, 0);
				const { token } = queryClient.getQueryData("session");
				await submitQuizRecord(token, +quizId, totalScore);
				await queryClient.setQueryData("user_quizzes", (oldData) => {
					return oldData.filter((obj) => obj.id !== +quizId);
				});
				setScore(totalScore);
			},
		}
	);

	const [hasLoaded, hasError, hasData] = transformQueryObject([
		timerQuery,
		quizQuery,
		selectionQuery,
	]);

	// Normal Fns
	const nextQuestion = () => {
		if (index === quizQuery.data.length - 1) return;
		setIndex(index + 1);
	};

	const previousQuestion = () => {
		if (index === 0) return;
		setIndex(index - 1);
	};

	const getCounterTime = () => {
		const counterTime = getUpdatedCounter(timerQuery.data.counter, timerQuery.data.initialTime);
		return counterTime > 0 ? counterTime : 0;
	};

	const isSelected = (pageIndex, orderIndex) => {
		return selectionQuery.data[pageIndex] === orderIndex;
	};

	const submitQuiz = async () => {
		const selectedChoices = quizQuery.data.map((question, questionIndex) => {
			const selectedChoiceOrder = selectionQuery.data[questionIndex];
			if (selectedChoiceOrder === null) {
				return {
					questionId: question.id,
					choiceId: -1,
				};
			}
			const selectedChoice = question.choice[selectedChoiceOrder];
			return {
				questionId: question.id,
				choiceId: selectedChoice.id,
			};
		});
		submitQuizMutation.mutateAsync(selectedChoices).then(() => {
			setIsOpenScore(true);
		});

		setTimeout(() => {
			queryClient.removeQueries(["quiz", quizId]);
			queryClient.removeQueries(["selection", quizId]);
			queryClient.removeQueries(["timer", quizId]);
			navigate("/dashboard");
		}, 5000);
	};

	return (
		<div>
			<Navbar />
			{hasLoaded ? (
				<span>Loading...</span>
			) : hasError ? (
				<span>Error: {quizQuery.error.message}</span>
			) : (
				<>
					{hasData && (
						<>
							<div className="flex question-section container mx-auto h-60 my-10 select-none">
								<h1 className="m-auto text-4xl question-text">{quizQuery.data[index].text}</h1>
							</div>
							<section className="container mx-auto flex flex-wrap">
								{quizQuery.data[index].choice.map((question, order) => (
									<CardChoice
										props={question}
										length={quizQuery.data[index].choice.length}
										key={question.id}
										order={order}
										pageIndex={index}
										isSelected={isSelected(index, order)}
										quizId={quizId}
									/>
								))}
								<div>{quizQuery.isFetching ? "Fetching..." : null}</div>
							</section>
							<section className="container mx-auto flex flex-wrap my-10 md:px-48 px-10">
								<button
									onClick={previousQuestion}
									className="flex previous-button mr-auto px-9 py-2 font-medium tracking-wide text-black transition-colors duration-200 transform bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80"
								>
									<GoTriangleLeft className="my-auto" />
									Previous
								</button>
								<Timer initialTime={getCounterTime()} submitFunc={submitQuiz} />
								{index === quizQuery.data.length - 1 ? (
									<button
										onClick={submitQuiz}
										className="flex next-button ml-auto px-10 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-80"
									>
										Submit
										<GoTriangleRight className="my-auto" />
									</button>
								) : (
									<button
										onClick={nextQuestion}
										className="flex next-button ml-auto px-10 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-80"
									>
										Next
										<GoTriangleRight className="my-auto" />
									</button>
								)}
							</section>
							<ScoreModal
								totalScore={score}
								totalQuestions={quizQuery.data.length}
								isOpenScore={isOpenScore}
								setIsOpenScore={setIsOpenScore}
							/>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default Quiz;

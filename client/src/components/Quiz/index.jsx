/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Icons
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

// Styles
import Navbar from "../Navbar";
import "./style.scss";

// Internal Imports
import Timer from "./Timer";
import CardChoice from "./CardChoice";
import { getUpdatedCounter, transformQueryObject } from "../../helper";

function Quiz() {
	// Fetch Fns
	const fetchQuestions = async (count) => {
		return axios({
			method: "POST",
			data: count,
			url: "/api/question/randomQuestions",
		}).then((questions) => {
			return questions.data;
		});
	};

	// React Queries
	const timerQuery = useQuery("timer", () => {
		return {
			counter: 10000,
			initialTime: new Date(),
		};
	});
	const quizQuery = useQuery("quiz", () =>
		fetchQuestions({
			count: 5,
		})
	);
	const selectionQuery = useQuery(
		"selection",
		() => {
			return new Array(quizQuery.data.length).fill(null);
		},
		{
			enabled: !!quizQuery.data,
		}
	);

	const [hasLoaded, hasError, hasData] = transformQueryObject([
		timerQuery,
		quizQuery,
		selectionQuery,
	]);

	// Hooks
	const [index, setIndex] = useState(0);
	const location = useLocation();

	useEffect(() => {
		console.log(location.state);
	}, []);

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
							<div className="flex question-section container mx-auto h-60 my-10">
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
								<Timer initialTime={getCounterTime()} />
								<button
									onClick={nextQuestion}
									className="flex next-button ml-auto px-10 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-80"
								>
									Next
									<GoTriangleRight className="my-auto" />
								</button>
							</section>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default Quiz;

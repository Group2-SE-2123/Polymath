/* eslint-disable no-nested-ternary */
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTimeoutFn } from "react-use";
import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

// Icons
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

// Styles
import Navbar from "../Navbar";
import "./style.scss";

// Internal Imports
import Timer from "./Timer";
import { getUpdatedCounter } from "../../helper";

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
	const quizQuery = useQuery("quiz", () =>
		fetchQuestions({
			count: 5,
		})
	);
	const timerQuery = useQuery("timer", () => {
		return {
			counter: 1000,
			initialTime: new Date(),
		};
	});

	// Hooks
	const [index, setIndex] = useState(0);

	// Normal Fns
	const nextQuestion = () => {
		if (index === quizQuery.data.length - 1) return;
		setIndex(index + 1);
	};

	const previousQuestion = () => {
		if (index === 0) return;
		setIndex(index - 1);
	};

	return (
		<div>
			<Navbar />
			{quizQuery.isLoading || timerQuery.isLoading ? (
				<span>Loading...</span>
			) : quizQuery.isError || timerQuery.isLoading ? (
				<span>Error: {quizQuery.error.message}</span>
			) : (
				<>
					{quizQuery.data && timerQuery.data && (
						<>
							<div className="flex question-section container mx-auto h-60 my-10">
								<h1 className="m-auto text-4xl question-text">{quizQuery.data[index].text}</h1>
							</div>
							<section className="container mx-auto flex flex-wrap">
								{quizQuery.data[index].choice.map((question) => (
									<CardChoice
										props={question}
										length={quizQuery.data[index].choice.length}
										key={question.id}
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
								<Timer
									initialTime={getUpdatedCounter(
										timerQuery.data.counter,
										timerQuery.data.initialTime
									)}
								/>
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

const CardChoice = ({ props, length }) => {
	const [isShowing, setIsShowing] = useState(true);
	const [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 100);

	const cardDimensions = `lg:w-1/${length} md:w-1/2 w-full p-4`;

	return (
		<div className={cardDimensions}>
			<div className="flex flex-col items-center">
				<div className="md:w-64 w-full h-40">
					<Transition
						as={Fragment}
						show={isShowing}
						enter="transform transition duration-[400ms]"
						enterFrom="opacity-0 rotate-[-120deg] scale-50"
						enterTo="opacity-100 rotate-0 scale-100"
						leave="transform duration-200 transition ease-in-out"
						leaveFrom="opacity-100 rotate-0 scale-100 "
						leaveTo="opacity-0 scale-95 "
					>
						<div
							onClick={() => {
								setIsShowing(false);
								resetIsShowing();
							}}
							className="flex w-full h-full card-color shadow-lg px-4 py-auto"
						>
							<h2 className="m-auto choice-text text-2xl font-extrabold">{props.text}</h2>
						</div>
					</Transition>
				</div>
			</div>
		</div>
	);
};

CardChoice.propTypes = {
	props: PropTypes.object.isRequired,
	text: PropTypes.string,
	length: PropTypes.number.isRequired,
};

export default Quiz;

/* eslint-disable no-nested-ternary */
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTimeoutFn } from "react-use";
import { useQuery } from "react-query";
import axios from "axios";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";

// Icons
import { GoTriangleRight } from "react-icons/go";
import Clock from "../../images/Clock.svg";

import Navbar from "../Navbar";
import "./style.scss";

function Quiz() {
	const fetchQuestions = async (count) => {
		return axios({
			method: "POST",
			data: count,
			url: "/api/question/randomQuestions",
		}).then((questions) => {
			console.log(questions.data);
			return questions.data;
		});
	};

	const { isLoading, isError, data, error, isFetching } = useQuery("todos", () =>
		fetchQuestions({
			count: 5,
		})
	);

	const index = 4;

	return (
		<div>
			<Navbar />
			{isLoading ? (
				<span>Loading...</span>
			) : isError ? (
				<span>Error: {error.message}</span>
			) : (
				<>
					{data && (
						<>
							<div className="flex question-section container mx-auto h-60 my-10">
								<h1 className="m-auto text-4xl question-text">{data[index].text}</h1>
							</div>
							<section className="container mx-auto flex flex-wrap">
								{data[index].choice.map((question) => (
									<CardChoice props={question} length={data[2].choice.length} key={question.id} />
								))}
								<div>{isFetching ? "Fetching..." : null}</div>
							</section>
							<section className="container mx-auto flex flex-wrap my-10 px-48">
								<button className="mr-auto px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-80">
									Previous
								</button>
								<div className="mx-auto relative">
									<ReactSVG className="wrapper-class-name" src={Clock} />
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
										1
									</div>
								</div>
								<button className="flex next-button ml-auto px-10 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-80">
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
	const [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);

	const cardDimensions = `lg:w-1/${length} md:w-1/2 w-full p-4`;

	return (
		<div className={cardDimensions}>
			<div className="flex flex-col items-center">
				<div className="w-64 h-40">
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
	text: PropTypes.string.isRequired,
	length: PropTypes.number.isRequired,
};

export default Quiz;

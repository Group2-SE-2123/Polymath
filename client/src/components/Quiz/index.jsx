/* eslint-disable no-nested-ternary */
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTimeoutFn } from "react-use";
import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

import Navbar from "../Navbar";
import "./style.scss";

function Quiz() {
	const fetchQuestions = async (count) => {
		return axios({
			method: "POST",
			data: count,
			url: "/api/question/randomQuestions",
		}).then((questions) => {
			return questions;
		});
	};

	const { isLoading, isError, data, error, isFetching } = useQuery("todos", () =>
		fetchQuestions({
			count: 5,
		})
	);

	return (
		<div>
			<Navbar />

			<div className="question-section container mx-auto h-80 my-20"></div>
			<section className="container mx-auto flex flex-wrap">
				{isLoading ? (
					<span>Loading...</span>
				) : isError ? (
					<span>Error: {error.message}</span>
				) : (
					<>
						{data && console.log(data)}
						<div>{isFetching ? "Fetching..." : null}</div>
					</>
				)}
			</section>
		</div>
	);
}

const CardChoice = ({ props }) => {
	const [isShowing, setIsShowing] = useState(true);
	const [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);

	const cardDimensions = `lg:w-1/${props} md:w-1/2 w-full p-4`;

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
							className="w-full h-full card-color rounded-md shadow-lg"
						>
							{props.text}
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
};

export default Quiz;

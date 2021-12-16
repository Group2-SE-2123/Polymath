import React from "react";
import { useMutation } from "react-query";
import axios from "axios";

import queryClient from "../../config/queryClient";

function RefetchButton() {
	const fetchQuestions = async (count) => {
		return axios({
			method: "POST",
			data: count,
			url: "/api/question/randomQuestions",
		}).then((questions) => {
			return questions.data;
		});
	};
	const mutation = useMutation(
		() =>
			fetchQuestions({
				count: 5,
			}),
		{
			onSuccess: (res) => {
				queryClient.setQueryData("quiz", res);
			},
		}
	);
	const refetch = async () => {
		mutation
			.mutate()
			.then(() => console.log("Success"))
			.catch((err) => console.log(err));
	};

	return (
		<button
			onClick={refetch}
			className="flex next-button ml-auto px-10 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-80"
		>
			Refetch
		</button>
	);
}

export default RefetchButton;

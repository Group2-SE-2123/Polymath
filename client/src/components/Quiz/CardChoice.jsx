/* eslint-disable no-param-reassign */
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTimeoutFn } from "react-use";
import { useMutation } from "react-query";
import produce from "immer";
import PropTypes from "prop-types";

import { numberToLetter } from "../../helper";
import queryClient from "../../config/queryClient";

const CardChoice = ({ props, length, order, pageIndex }) => {
	// Hooks
	const [isShowing, setIsShowing] = useState(true);
	const [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 100);

	const cardDimensions = `lg:w-1/${length} md:w-1/2 w-full p-4`;

	const addLetter = (number) => {
		const letter = numberToLetter(number);
		return `${letter}.`;
	};

	const updateSelection = useMutation((details) => details, {
		onSuccess: (data) => {
			queryClient.setQueriesData("selection", (oldData) => {
				const updatedSelection = produce(oldData, (draft) => {
					draft[data.pageIndex] = data.order;
				});
				return updatedSelection;
			});
		},
	});

	const chooseCard = (details) => {
		updateSelection.mutate(details);
	};

	return (
		<div onClick={() => chooseCard({ order, pageIndex })} className={cardDimensions}>
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
							className="flex w-full h-full card-color shadow-lg px-4 py-2 py-auto"
						>
							<h2 className="m-auto choice-text text-2xl font-extrabold">{props.text}</h2>
							<h3 className="absolute l-0 t-5 text-xl font-bold">{addLetter(order)}</h3>
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
	order: PropTypes.number.isRequired,
	pageIndex: PropTypes.number.isRequired,
};

export default CardChoice;

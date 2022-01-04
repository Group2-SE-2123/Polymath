/* eslint-disable no-param-reassign */
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTimeoutFn } from "react-use";
import { useMutation } from "react-query";
import produce from "immer";
import PropTypes from "prop-types";

import { numberToLetter } from "../../helper";
import queryClient from "../../config/queryClient";

const CardChoice = ({ props, length, order, pageIndex, isSelected }) => {
	// Hooks
	const [isShowing, setIsShowing] = useState(true);
	const [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 0);

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

	const getCardClass = (hasSelected) => {
		const cardColor = hasSelected ? "card-color-selected" : "card-color-unselected";
		return `flex w-full h-full ${cardColor} shadow-lg px-4 py-2 py-auto`;
	};

	return (
		<div onClick={() => chooseCard({ order, pageIndex })} className={cardDimensions}>
			<div className="flex flex-col items-center select-none cursor-pointer">
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
							className={getCardClass(isSelected)}
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
	isSelected: PropTypes.bool.isRequired,
};

export default CardChoice;

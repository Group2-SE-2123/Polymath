import React from "react";
import immer from "immer";
import PropTypes from "prop-types";
import { CenterModal, ModalCloseTarget } from "react-spring-modal";
import { CgClose } from "react-icons/cg";

// Internal Imports
import { PullRelease } from "../../animations";
import "./style.scss";

const style = {
	width: "100%",
	height: "100%",
	overflow: "auto",
};

function Modal(props) {
	const { isOpen, setOpen } = props;

	// mathTopics array with objects containing key 'name'
	const mathTopics = [
		{ id: 1, name: "Algebra" },
		{ id: 2, name: "Geometry" },
		{ id: 3, name: "Trigonometry" },
		{ id: 4, name: "Calculus" },
		{ id: 5, name: "Statistics" },
		{ id: 6, name: "Probability" },
		{ id: 7, name: "Differential Equations" },
		{ id: 8, name: "Linear Algebra" },
		{ id: 9, name: "Differential Calculus" },
	];

	const initialState = mathTopics.map((topic) => {
		return { ...topic, selected: false };
	});

	// Hooks
	const [topicsState, setTopicsState] = React.useState(initialState);

	// Functions
	const clickTag = (id) => {
		const newState = immer(topicsState, (draft) => {
			draft.forEach((topic) => {
				if (topic.id === id) {
					topic.selected = !topic.selected;
				}
			});
		});
		setTopicsState(newState);
	};

	return (
		<CenterModal isOpen={isOpen} onDismiss={() => setOpen(false)} contentProps={{ style }}>
			<div className="flex flex-col w-full items-center">
				<ModalCloseTarget>
					<CgClose style={{ fontSize: "25px", marginLeft: "auto", color: "#D1D1D1" }} />
				</ModalCloseTarget>
				<h1 className="font-normal mt-4 text-4xl font-roboto">Choose your favorite topics</h1>
				<h3>Select at least 3 topics to start the quiz</h3>
				<div className="flex flex-wrap justify-center my-10 select-none">
					{topicsState.map((topic) => {
						if (topic.selected) {
							return (
								<PullRelease key={topic.id}>
									<div className={`flex flex-row text-center text-gray-800 font-bold mx-5 my-2`}>
										<h3 className="bg-yellow-300 py-1 px-2">{topic.name}</h3>
										<div className="bg-black py-1 px-1" onClickCapture={() => clickTag(topic.id)}>
											<CgClose style={{ fontSize: "25px", marginLeft: "auto", color: "#D1D1D1" }} />
										</div>
									</div>
								</PullRelease>
							);
						}
						return (
							<PullRelease key={topic.id}>
								<div
									onClickCapture={() => clickTag(topic.id)}
									className={`text-center text-gray-800 font-bold theme-color hover:bg-gray-300 mx-5 my-2 py-1 px-2`}
								>
									<h3>{topic.name}</h3>
								</div>
							</PullRelease>
						);
					})}
				</div>
				<div className="sm:flex sm:justify-center lg:justify-start ml-auto">
					<div className="select-none shadow-2xl">
						<div className="w-full flex items-center justify-center px-10 py-2 border border-transparent text-base font-medium text-white color-linear filled-button-linear md:text-lg">
							Next
						</div>
					</div>
				</div>
			</div>
		</CenterModal>
	);
}

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default Modal;

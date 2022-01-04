import React, { useState, useEffect, useContext, useRef } from "react";
import produce from "immer";
import PropTypes from "prop-types";
import { CenterModal, ModalCloseTarget } from "react-spring-modal";
import { CgClose } from "react-icons/cg";
import { useQuery } from "react-query";
import axios from "axios";
import { useTransition, useSpringRef } from "react-spring";
import { useNavigate } from "react-router-dom";

// Internal Imports
import { PullRelease } from "../../animations";
import NumberSlider from "./NumberSlider";
import DifficultySelect from "./DifficultySelect";
import { ModalContext } from "../../context/ModalContext";
import queryClient from "../../config/queryClient";
import "./style.scss";

const style = {
	width: "100%",
	height: "100%",
	overflow: "auto",
};

function Modal(props) {
	const { isOpen, setOpen } = props;

	const fetchCategories = async () => {
		return axios({
			method: "GET",
			url: "/api/category/getAll",
		}).then((categories) => {
			return categories.data;
		});
	};

	const categoryQuery = useQuery("category", fetchCategories);
	const topicsState = categoryQuery.data != null ? categoryQuery.data : [];

	const [modalState, setModalState] = useContext(ModalContext);
	const [index, set] = useState(0);
	const transRef = useSpringRef();
	const transitions = useTransition(index, {
		ref: transRef,
		keys: null,
	});
	useEffect(() => {
		transRef.start();
	}, [index]);
	useEffect(() => {
		setModalState(
			produce(modalState, (draft) => {
				draft.topicsState = topicsState;
			})
		);
	}, [topicsState]);

	// Functions
	const clickTag = (id) => {
		const newState = produce(topicsState, (draft) => {
			draft.forEach((topic) => {
				if (topic.id === id) {
					topic.selected = !topic.selected;
				}
			});
		});
		queryClient.setQueryData("category", newState);
	};

	const modals = [
		() => (
			<TopicModal
				isOpen={isOpen}
				setOpen={setOpen}
				topicsState={topicsState}
				clickTag={clickTag}
				setState={set}
			/>
		),
		() => <NumberModal isOpen={isOpen} setOpen={setOpen} />,
	];

	return (
		<>
			{transitions((_, i) => {
				const ModalGroup = modals[i];
				return <ModalGroup />;
			})}
		</>
	);
}

const TopicModal = ({ isOpen, setOpen, topicsState, clickTag, setState }) => {
	const onClick = () => {
		setState(1);
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
				<div onClick={onClick} className="sm:flex sm:justify-center lg:justify-start ml-auto">
					<div className="select-none shadow-2xl">
						<div className="w-full flex items-center justify-center px-10 py-2 border border-transparent text-base font-medium text-white color-linear filled-button-linear md:text-lg">
							Next
						</div>
					</div>
				</div>
			</div>
		</CenterModal>
	);
};

const NumberModal = ({ isOpen, setOpen }) => {
	const navigate = useNavigate();
	const sliderRef = useRef(5);
	const [modalState] = useContext(ModalContext);

	const onClick = async () => {
		const newState = produce(modalState, (draft) => {
			draft.sliderState = sliderRef.current.value;
		});
		navigate("/quiz", { state: newState });
	};
	return (
		<CenterModal isOpen={isOpen} onDismiss={() => setOpen(false)} contentProps={{ style }}>
			<div className="flex flex-col w-full items-center">
				<ModalCloseTarget>
					<CgClose style={{ fontSize: "25px", marginLeft: "auto", color: "#D1D1D1" }} />
				</ModalCloseTarget>
				<h1 className="font-normal mt-4 text-4xl font-roboto">More Quiz Details</h1>
				<h3>Pick the number of questions and difficulty</h3>
				<div className="flex flex-row w-full mt-2">
					<h3 className="my-auto font-semibold mx-auto md:mx-0">Number of questions:</h3>
					<NumberSlider refProps={sliderRef} />
				</div>
				<div className="flex flex-row w-full mt-2 mb-10">
					<h3 className="my-auto font-semibold mx-auto md:mx-0">Choose Difficulty:</h3>
					<DifficultySelect />
				</div>
				<div onClick={onClick} className="sm:flex sm:justify-center lg:justify-start ml-auto">
					<div className="select-none shadow-2xl">
						<div className="w-full flex items-center justify-center px-10 py-2 border border-transparent text-base font-medium text-white color-linear filled-button-linear md:text-lg">
							Next
						</div>
					</div>
				</div>
			</div>
		</CenterModal>
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

TopicModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	topicsState: PropTypes.array.isRequired,
	clickTag: PropTypes.func.isRequired,
	setState: PropTypes.func.isRequired,
};

NumberModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default Modal;

import React from "react";
import { CenterModal } from "react-spring-modal";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import ScoreDesign from "../../images/svg/ScoreDesign.svg";

//  no rounded corners
const style = {
	width: "100%",
	height: "100%",
	overflow: "hidden",
	borderRadius: "0px",
};

function ScoreModal({ isOpenScore, setIsOpenScore, totalScore, totalQuestions }) {
	const closeModal = () => {
		setIsOpenScore(false);
	};

	return (
		<CenterModal isOpen={isOpenScore} onDismiss={closeModal} contentProps={{ style }}>
			<div className="absolute sm:top-1/2 sm:left-1/2 transform sm:-translate-x-1/2 sm:-translate-y-1/2">
				<ReactSVG
					beforeInjection={(svg) => {
						svg.setAttribute("style", "width: 100%");
					}}
					src={ScoreDesign}
				/>
			</div>
			<div className="relative font-roboto text-white text-4xl text-center mt-24">Your Score</div>
			<Fraction numerator={totalScore} denominator={totalQuestions} />
		</CenterModal>
	);
}

const Fraction = ({ numerator, denominator }) => {
	return (
		<div className="select-none relative font-roboto text-white text-center mt-5">
			<div className="flex flex-row mx-auto w-full">
				<div className="text-7xl ml-auto">{numerator}</div>
				<div className="text-9xl mt-2">/</div>
				<div className="text-7xl mt-auto mr-auto">{denominator}</div>
			</div>
		</div>
	);
};

ScoreModal.propTypes = {
	isOpenScore: PropTypes.bool.isRequired,
	setIsOpenScore: PropTypes.func.isRequired,
	totalScore: PropTypes.number.isRequired,
	totalQuestions: PropTypes.number.isRequired,
};

Fraction.propTypes = {
	numerator: PropTypes.number.isRequired,
	denominator: PropTypes.number.isRequired,
};

export default ScoreModal;

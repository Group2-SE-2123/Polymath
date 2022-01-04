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

function ScoreModal({ isOpenScore, setIsOpenScore }) {
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
			<div className="relative font-roboto text-white text-9xl text-center mt-5">4</div>
		</CenterModal>
	);
}

ScoreModal.propTypes = {
	isOpenScore: PropTypes.bool.isRequired,
	setIsOpenScore: PropTypes.func.isRequired,
};

export default ScoreModal;

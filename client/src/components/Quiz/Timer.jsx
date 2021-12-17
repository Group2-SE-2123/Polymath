import React, { useEffect } from "react";
import { ReactSVG } from "react-svg";
import { useTimer } from "use-timer";
import PropType from "prop-types";

import Clock from "../../images/Clock.svg";
import queryClient from "../../config/queryClient";

const Timer = ({ initialTime }) => {
	const { time, start } = useTimer({
		initialTime,
		timerType: "DECREMENTAL",
		endTime: 0,
	});

	useEffect(() => {
		if (time === 0) {
			queryClient.invalidateQueries("quiz");
			queryClient.removeQueries("quiz");
			queryClient.invalidateQueries("timer");
			queryClient.removeQueries("timer");
		}
	}, [time]);

	useEffect(() => {
		start();
	}, []);

	return (
		<>
			<div className="flex mx-auto relative">
				<ReactSVG className="mx-auto" src={Clock} />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					{time}
				</div>
			</div>
		</>
	);
};

Timer.propTypes = {
	initialTime: PropType.number.isRequired,
};

export default Timer;

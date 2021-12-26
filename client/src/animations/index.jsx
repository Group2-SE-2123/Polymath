import { useState } from "react";
import { useSpring, animated } from "react-spring";

import PropTypes from "prop-types";

function NumberAnimation({ value, delay, fixed }) {
	const { number } = useSpring({
		from: { number: 0 },
		number: value,
		delay,
	});

	return <animated.div>{number.to((n) => n.toFixed(fixed))}</animated.div>;
}

function Scrolling() {
	const [flip, set] = useState(false);

	const words = ["We", "came.", "We", "saw.", "We", "kicked", "its", "ass."];

	const { scroll } = useSpring({
		scroll: (words.length - 1) * 50,
		from: { scroll: 0 },
		reset: true,
		reverse: flip,
		delay: 200,
		onRest: () => set(!flip),
	});

	return (
		<animated.div
			style={{
				position: "relative",
				width: "100%",
				height: 60,
				overflow: "auto",
				fontSize: "0.5em",
			}}
			scrollTop={scroll}
		>
			{words.map((word, i) => (
				<div key={`${word}_${i}`} style={{ width: "100%", height: 50, textAlign: "center" }}>
					{word}
				</div>
			))}
		</animated.div>
	);
}

NumberAnimation.propTypes = {
	value: PropTypes.number.isRequired,
	delay: PropTypes.number,
	fixed: PropTypes.number,
};

export { NumberAnimation, Scrolling };

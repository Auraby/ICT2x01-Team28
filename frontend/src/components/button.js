import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

export function AnimatedButton() {
	const [pressed, setPressed] = useState(false);
	const [hover, setHover] = useState(false);

	const props = useSpring({
		from: { border: "0px solid transparent", width: 50 },
		to: { border: hover ? "1px solid #15c8b1" : "0px solid transparent" },
		config: { duration: 10 },
	});

	const mouseLeave = () => {
		setPressed(false);
		setHover(false);
	};

	return (
		<>
			<label>Username</label>
			<animated.input className="form-control" style={props} onMouseEnter={() => setHover(true)} onMouseLeave={mouseLeave} onClick={() => setPressed(true)} />
		</>
	);
}

import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

export function AnimatedButton() {
	const [pressed, setPressed] = useState(false);
	const [hover, setHover] = useState(false);

	const props = useSpring({
		from: { border: "0px solid transparent", width: 50 },
		to: { border: hover ? "1px solid #15c8b1" : "0px solid transparent" },
		config: { duration: 10 },
	});

	const mouseLeave = () => {
		setHover(false);
	};

	return (
		<>
			<label>Username</label>
			<animated.input className="form-control" style={props} onMouseEnter={() => setHover(true)} onMouseLeave={mouseLeave} onClick={() => setPressed(!pressed)} />
		</>
	);
}

export function ProfileImage(p) {
	const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
	const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
	const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 500, friction: 5 } }));

	return (
		<div style={p.style}>
			<animated.img
				alt=""
				className="rounded-circle profile-img"
				src={`${process.env.PUBLIC_URL}${p.src}`}
				onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
				onMouseLeave={() => set({ xys: [0, 0, 1] })}
				style={{ transform: props.xys.interpolate(trans) }}
			/>
		</div>
	);
}

export function Achievement(props) {
	const [hover, setHover] = useState(false);
	const [flipped, flip] = useState(false);
	const { transform, opacity } = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
		config: { mass: 5, tension: 500, friction: 80 },
	});
	const hoverScale = useSpring({
		transform: hover ? "translate3d(0px,0,0) scale(1.1) rotateX(0deg)" : "translate3d(0px,0,0) scale(0.90) rotateX(0deg)",
	});

	const item = props.item;

	return (
		<div style={props.style}>
			<animated.div className="px-1 fb fb-col fb-center" onClick={() => flip(!flipped)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={hoverScale}>
				<animated.img alt="" style={{ opacity: opacity.interpolate((o) => 1 - o), transform }} className="rounded-circle achievement-img" src={`${process.env.PUBLIC_URL}${props.src}`} />
				<animated.div style={{ opacity, transform: transform.interpolate((t) => `${t} rotateX(180deg)`) }} className="fb fb-center rounded-circle achievement-img achievement-img-back">
					<label className="text-center">{item.description}</label>
				</animated.div>
				<label>{item.name}</label>
			</animated.div>
		</div>
	);
}

export function Module(props) {
	const [hover, setHover] = useState(false);

	const style = useSpring({
		from: { opacity: 0.8, padding: 0, transform: "translate3d(0px,0,0) scale(0.8) rotateX(0deg)" },
		to: {
			opacity: hover ? 1 : 0.8,
			padding: hover ? 50 : 0,
			transform: hover ? "translate3d(0px,0,0) scale(0.95) rotateX(0deg)" : "translate3d(0px,0,0) scale(0.8) rotateX(0deg)",
		},
	});

	return (
		<animated.div className="cards fb fb-col fb-se fb-center" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={style} onClick={props.onClick}>
			<Link to={props.href}>
				<img alt="" className="module-img" src={`${process.env.PUBLIC_URL}/img/${props.label}.png`} />
			</Link>
			<h4>{props.label}</h4>
		</animated.div>
	);
}

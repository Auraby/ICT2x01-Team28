import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";
import PropTypes from "prop-types";

export class Panel extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
	};

	static defaultProps = {
		className: "panel bg-secondary",
	};

	render() {
		return (
			<Spring from={{ opacity: 0, marginLeft: 10000 }} to={{ opacity: 1, marginLeft: 0 }}>
				{(props) => (
					<div style={props} className={this.props.className}>
						{this.props.children}
					</div>
				)}
			</Spring>
		);
	}
}

export class PanelFill extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
	};

	static defaultProps = {
		className: "fb fb-col",
	};

	render() {
		return (
			<Spring
				config={{ duration: 1000 }}
				from={{ backgroundColor: "white", height: `0vh`, width: `0vw`, borderRadius: `50%` }}
				to={{ backgroundColor: "#273142", height: `100vh`, width: `100vw`, borderRadius: `0%` }}
			>
				{(props) => (
					<div style={props} className={this.props.className}>
						{this.props.children}
					</div>
				)}
			</Spring>
		);
	}
}

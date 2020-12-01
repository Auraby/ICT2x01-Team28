import React, { Component } from "react";
import Select from "react-select";
import { DropdownWithObject } from "../components/dropdown";
import { Input } from "../components/input";
import { Panel } from "../components/panel";

export default class J extends Component {
	constructor(props) {
		super(props);

		this.state = {
			students: [],
			selectedStudents: [],
			componentId: "",
			commentType: "",
			comment: "",
		};
	}

	componentDidMount() {}

	render() {
		return (
			<>
				<Panel></Panel>
				<Panel></Panel>
			</>
		);
	}
}

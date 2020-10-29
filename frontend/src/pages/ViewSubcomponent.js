import React, { Component } from "react";
import { Dropdown } from "../components/dropdown";
import { Panel } from "../components/panel";
import { Table } from "../components/table";

export default class ViewSubcomponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modules: [],
			assessments: [],
			subcomponents: [],
			selectedModule: "",
			selectedAssessment: "",
		};
	}

	componentDidMount() {
		/* Use axios to update module list */
		const modules = ["ICT2101", "ICT2102", "ICT2103"];

		this.setState({
			modules: modules,
		});
	}

	moduleChange = (event) => {
		/* TODO: Use axios to update assessment dropdown */
		const assessments = ["Quiz 1", "Quiz 2", "Quiz 3"];

		this.setState({
			selectedModule: event.target.value,
			assessments: assessments,
		});
	};

	assessmentChange = (event) => {
		/* Dummy data for now */
		const subcomponents = [
			{
				name: "Subcomponent 1",
				weightage: "10%",
				maxMarks: 100,
				id: 1,
			},
			{
				name: "Subcomponent 2",
				weightage: "20%",
				maxMarks: 50,
				id: 2,
			},
			{
				name: "Subcomponent 3",
				weightage: "30%",
				maxMarks: 75,
				id: 3,
			},
		];

		this.setState({
			selectedAssessment: event.target.value,
			subcomponents: subcomponents,
		});
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	render() {
		return (
			<Panel>
				<div className="flexbox column">
					<label className="display-1 text-white mb-4">View Subcomponents</label>
					<Dropdown value={this.state.selectedModule} name="selectedModule" label="Select Module" options={this.state.modules} onChange={this.moduleChange} />
					<Dropdown value={this.state.selectedAssessment} name="selectedAssessment" label="Select Assessment" options={this.state.assessments} onChange={this.assessmentChange} />
					<Table type="subcomponent" data={this.state.subcomponents} />
				</div>
			</Panel>
		);
	}
}

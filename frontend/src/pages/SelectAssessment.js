import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Dropdown } from "../components/dropdown";
import { Panel } from "../components/panel";

export default class SelectAssessment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modules: [],
			assessments: [],
			selectedModule: "",
			selectedAssessment: "",
			redirect: false,
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
		this.setState({
			redirect: true,
		});
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={"/edit/assessment/1"} />;
		}

		return (
			<Panel>
				<div className="flexbox column">
					<label className="display-1 text-white mb-4">Select Assessment</label>
					<Dropdown
						value={this.state.selectedModule}
						name="selectedModule"
						label="Select Module"
						options={this.state.modules}
						onChange={this.moduleChange}
					/>
					<Dropdown
						value={this.state.selectedAssessment}
						name="selectedAssessment"
						label="Select Assessment"
						options={this.state.assessments}
						onChange={this.assessmentChange}
					/>
				</div>
			</Panel>
		);
	}
}

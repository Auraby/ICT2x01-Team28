import React, { Component } from "react";
import { Input } from "../components/input";
import { Dropdown } from "../components/dropdown";
import { Panel } from "../components/panel";

export default class AddAssessment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			data: "",
			maxMarks: -1,
			weightage: -1.0,
			modules: [],
			selectedModule: "",
			disableInputs: true,
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
		this.setState({
			selectedModule: event.target.value,
			disableInputs: false,
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
				<form onSubmit={this.handleSubmit} className="flexbox column">
					<label className="display-1 text-white mb-4">Add Assessment</label>
					<Dropdown value={this.state.selectedModule} name="selectedModule" label="Select Module" options={this.state.modules} onChange={this.moduleChange} />
					<Input disabled={this.state.disableInputs} name="name" type="text" label="Assessment Name" onChange={this.handleChange} />
					<Input disabled={this.state.disableInputs} name="date" type="text" label="Assessment Date" onChange={this.handleChange} />
					<Input disabled={this.state.disableInputs} name="maxMarks" type="text" label="Max Marks" onChange={this.handleChange} />
					<Input disabled={this.state.disableInputs} name="weightage" type="text" label="Weightage" onChange={this.handleChange} />
					<div className="flexbox">
						<button type="submit" className="btn btn-danger">
							Cancel
						</button>
						<button type="submit" className="btn btn-primary">
							Save
						</button>
					</div>
				</form>
			</Panel>
		);
	}
}

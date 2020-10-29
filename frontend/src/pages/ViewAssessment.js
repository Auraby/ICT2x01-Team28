import React, { Component } from "react";
import { Dropdown } from "../components/dropdown";
import { Panel } from "../components/panel";
import { Table } from "../components/table";

export default class ViewAssessment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modules: [],
			assessments: [],
			selectedModule: "",
		};
	}

	componentDidMount() {
		/*
         * Make an API call to update the module dropdown
         
         axios.get(`url_to_rest_api`)
            .then(res => {
             const modules = res.data;
             this.setState({ modules: modules });
        })
        */
		const modules = ["ICT2101", "ICT2102", "ICT2103"];

		this.setState({
			modules: modules,
		});
	}

	moduleChange = (event) => {
		/* Dummy data for now */
		const assessments = [
			{
				name: "Quiz 1",
				weightage: "10%",
				date: "02/02/2020",
				maxMarks: 100,
				id: 1,
			},
			{
				name: "Quiz 1",
				weightage: "20%",
				date: "02/02/2020",
				maxMarks: 50,
				id: 2,
			},
			{
				name: "Quiz 1",
				weightage: "30%",
				date: "02/02/2020",
				maxMarks: 75,
				id: 3,
			},
		];

		this.setState({
			assessments: assessments,
			selectedModule: event.target.value,
		});
	};

	render() {
		return (
			<Panel>
				<label className="display-1 text-white mb-4">View Assessments</label>
				<Dropdown value={this.state.selectedModule} name="selectedModule" label="Select Module" options={this.state.modules} onChange={this.moduleChange} />
				<Table data={this.state.assessments} type="assessment" />
			</Panel>
		);
	}
}

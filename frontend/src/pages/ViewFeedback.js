import React, { Component } from "react";
import { InputReadOnly } from "../components/input";
import { DropdownWithObject } from "../components/dropdown";
import { Panel } from "../components/panel";
import { Table } from "../components/table";

export default class ViewAssessment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			commentType: "",
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
	}

	commentChange = (event) => {
		var comments;

		if (event.target.value === "sum") {
			comments = [
				{
					id: "1902619",
					name: "Max",
					marks: "21/100",
					comments: "what the fuck have you been doing",
				},
				{
					id: "1902620",
					name: "Alwin",
					marks: "89/100",
					comments: "Good job",
				},
				{
					id: "1902621",
					name: "Eugene",
					marks: "99/100",
					comments: "Good job",
				},
			];
		} else {
			comments = [
				{
					id: "1902233",
					name: "Linus",
					marks: "80/100",
					comments: "nice job on the quiz",
				},
				{
					id: "1902625",
					name: "Dylan",
					marks: "12/100",
					comments: "try harder",
				},
				{
					id: "1902698",
					name: "Ian",
					marks: "100/100",
					comments: "Wow!",
				},
			];
		}

		this.setState({
			commentType: event.target.value,
			comments: comments,
		});
	};

	render() {
		const commentTypes = [
			{
				name: "Summative Comment",
				value: "sum",
			},
			{
				name: "Formative Comment",
				value: "form",
			},
		];

		return (
			<Panel>
				<label className="display-1 text-white mb-4">View Feedback</label>
				<InputReadOnly label="Viewing feedback for" value="ICT2101 -- Quiz 1" />
				<DropdownWithObject value={this.state.commentType} name="commentType" label="Filter comment type" options={commentTypes} onChange={this.commentChange} />
				<Table data={this.state.comments} type="feedback" />
			</Panel>
		);
	}
}

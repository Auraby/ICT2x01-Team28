import React, { Component } from "react";
import Select from "react-select";
import { DropdownWithObject } from "../components/dropdown";
import { Input } from "../components/input";
import { Panel } from "../components/panel";

export default class AddFeedback extends Component {
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

	componentDidMount() {
		/* Retrieve component ID from URL */
		this.setState({
			componentId: this.props.match.params.id,
		});

		/* Use axios to update student list */
		/* Using dummy data for now */
		const students = [
			{
				value: "1902619",
				label: "1902619 --- Max",
			},
			{
				value: "1902621",
				label: "1902620 --- Alwin",
			},
			{
				value: "1902622",
				label: "1902621 --- Eugene",
			},
			{
				value: "1902623",
				label: "1902622 --- Linus",
			},
			{
				value: "1902623",
				label: "1902623 --- Dylan",
			},
		];

		this.setState({
			students: students,
		});
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	selectChange = (option) => {
		console.log(option);
	};

	handleSubmit = (event) => {
		event.preventDefault();

		console.log(this.state.selectedStudents);
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
				<form onSubmit={this.handleSubmit} className="flexbox column">
					<label className="display-1 text-white mb-4">Add Feedback</label>
					<Input
						disabled={true}
						value="ICT2101 - Quiz 1"
						label="Adding feedback for"
						name=""
						onChange={function () {}}
					/>
					<div className="form-group">
						<label>Select Students</label>
						<div className="mb-3">
							<Select
								id="SelectStudents"
								isMulti
								options={this.state.students}
								placeholder="Select student(s)"
								className=""
								onChange={this.selectChange}
							/>
						</div>
						<DropdownWithObject
							value={this.state.commentType}
							name="commentType"
							label="Select Comment Type"
							options={commentTypes}
							onChange={this.handleChange}
						/>
						<Input
							textarea={true}
							value={this.state.comment}
							name="comment"
							type="text"
							label="Comments"
							onChange={this.handleChange}
						/>
					</div>
					<div className="flexbox">
						<button type="reset" className="btn btn-danger">
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

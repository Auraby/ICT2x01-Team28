import React, { Component } from "react";
import { MyContext } from "../context/myContext";
import axios from "axios";

export default class ProfessorAssessment extends Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);

		this.state = {
			page: "View",
		};
	}

	changePage = (event) => {
		this.setState({
			page: event.currentTarget.getAttribute("data-value"),
		});
	};

	render() {
		const item = this.props.item;

		return (
			<div className="fb fb-col" style={{ height: "100%" }}>
				<div className="fb fb-row">
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a href="#" data-value="View" onClick={this.changePage} className={"tab-item nav-link px-4 " + (this.state.page === "View" ? "active" : "")}>
								View
							</a>
						</li>
						<li className="nav-item">
							<a href="#" data-value="Edit" onClick={this.changePage} className={"tab-item nav-link px-4 " + (this.state.page === "Edit" ? "active" : "")}>
								Edit
							</a>
						</li>
						<li className="nav-item">
							<a href="#" data-value="Marks" onClick={this.changePage} className={"tab-item nav-link px-4 " + (this.state.page === "Marks" ? "active" : "")}>
								Enter marks
							</a>
						</li>
						<li className="nav-item">
							<a href="#" data-value="Add" onClick={this.changePage} className={"tab-item nav-link px-4 " + (this.state.page === "Add" ? "active" : "")}>
								Add subcomponents
							</a>
						</li>
					</ul>
				</div>

				{this.state.page === "View" ? (
					<AssessmentForm item={item} disabled={true} />
				) : this.state.page === "Edit" ? (
					<AssessmentForm item={item} disabled={false} />
				) : this.state.page === "Marks" ? (
					<AssessmentEnterMarks item={item} />
				) : (
					<AssessmentAddSubcomponent item={item} />
				)}
			</div>
		);
	}
}

class AssessmentForm extends React.Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);
	}

	render() {
		const item = this.props.item;

		return (
			<>
				<div className="form-group">
					<label className="">Assessment Name:</label>
					<input disabled={this.props.disabled} value={item.name} className="form-control"></input>
				</div>
				<div className="form-group">
					<label className="">Max Marks:</label>
					<input disabled={this.props.disabled} value={item.max_marks} className="form-control"></input>
				</div>
				<div className="form-group">
					<label className="">Weightage:</label>
					<input disabled={this.props.disabled} value={item.weightage} className="form-control"></input>
				</div>
				<div className="form-group">
					<label className="">End Date:</label>
					<input disabled={this.props.disabled} value={item.end_date} className="form-control"></input>
				</div>

				{!this.props.disabled ? (
					<div className="fb fb-row fb-sb" style={{}}>
						<button className="btn btn-danger">Delete</button>
						<button className="btn btn-primary">Save</button>
					</div>
				) : (
					<></>
				)}
			</>
		);
	}
}

class AssessmentEnterMarks extends React.Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);

		this.state = {
			students: [],
		};
	}

	componentDidMount() {
		const apiUrl = `${this.context.apiUrl}/module/users/get?module_code=${this.props.item.module_code}&role=student`;
		axios.get(apiUrl).then((res) => {
			this.setState({
				students: res.data,
			});
		});
	}

	render() {
		const item = this.props.item;

		if (this.state.students.length === 0) {
			return (
				<div className="fb fb-col fcc" style={{ height: "100%" }}>
					<label>
						<h3>No students enrolled into this module</h3>
					</label>
				</div>
			);
		} else {
			return (
				<div style={{ overflowY: "auto" }}>
					<table className="table table-hover">
						<thead>
							<tr>
								<th>Student ID</th>
								<th>Name</th>
								<th>Marks</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1902619</td>
								<td>Max Lee</td>
								<td>
									<input className="form-control" type="number" min="0" max={item.max_marks} />
								</td>
							</tr>
						</tbody>
					</table>
					<div className="fb fb-row fb-sb" style={{ flexDirection: "row-reverse" }}>
						<button className="btn btn-primary">Save</button>
					</div>
				</div>
			);
		}
	}
}

class AssessmentAddSubcomponent extends React.Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const item = this.props.item;

		return (
			<div className="fb fb-col fcc" style={{ height: "100%" }}>
				<label>
					<h3>No subcomponents for this assessment</h3>
				</label>
				<button className="btn btn-primary">Create subcomponents</button>
			</div>
		);
	}
}

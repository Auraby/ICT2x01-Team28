import React, { Component } from "react";
import { MyContext } from "../context/myContext";
import axios from "axios";

export default class ProfessorSubcomponent extends Component {
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
							<a href="#" data-value="Feedback" onClick={this.changePage} className={"tab-item nav-link px-4 " + (this.state.page === "Feedback" ? "active" : "")}>
								Enter feedback
							</a>
						</li>
					</ul>
				</div>

				{this.state.page === "View" ? (
					<SubcomponentForm item={item} disabled={true} refresh={this.props.refresh} />
				) : this.state.page === "Edit" ? (
					<SubcomponentForm item={item} disabled={false} refresh={this.props.refresh} />
				) : this.state.page === "Marks" ? (
					<SubcomponentEnterMarks item={item} />
				) : this.state.page === "Feedback" ? (
					<SubcomponentEnterFeedback item={item} />
				) : (
					<></>
				)}
			</div>
		);
	}
}

class SubcomponentForm extends React.Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);

		const item = this.props.item;

		this.state = {
			assessment_id: item.assessment_id,
			name: item.name,
			max_marks: item.max_marks,
			weightage: item.weightage,
			end_date: item.end_date,
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value,
		});
	};

	deleteAssessment = () => {
		const moduleCode = this.props.item.module_code;
		const assessmentId = this.props.item.component_id;
		const apiUrl = `${this.context.apiUrl}/component/delete?component_id=${assessmentId}`;

		axios.delete(apiUrl).then((res) => {


			if (res.data.msg === "OK") {
                this.context.successToast("Assessment updated");
                this.props.refresh();
            }
		});
	};

	saveAssessment = () => {
		const apiUrl = `${this.context.apiUrl}/component/update`;

		axios
			.patch(apiUrl, { component_id: this.props.item.component_id, name: this.state.name, max_marks: this.state.max_marks, weightage: this.state.weightage, end_date: 0, create_date: 0 })
			.then((res) => {
				if (res.data.msg === "OK") {
					this.context.successToast("Assessment updated");
					this.props.refresh();
				}
			});
	};

	render() {
        const item = this.props.item;
        console.log(item);

		const disableWeightage = "children" in item ? true : this.props.disabled;

		return (
			<>
				<div className="form-group">
					<label className="">Subcomponent Name:</label>
					<input onChange={this.handleChange} name="name" value={this.state.name} disabled={this.props.disabled} className="form-control"></input>
				</div>
				<div className="form-group">
					<label className="">Max Marks:</label>
					<input onChange={this.handleChange} name="max_marks" value={this.state.max_marks} disabled={disableWeightage} className="form-control" type="number" min="0"></input>
				</div>
				<div className="form-group">
					<label className="">Weightage:</label>
					<input onChange={this.handleChange} name="weightage" value={this.state.weightage} disabled={disableWeightage} className="form-control" type="number" min="0"></input>
				</div>

				{!this.props.disabled ? (
					<div className="fb fb-row fb-sb" style={{}}>
						<button className="btn btn-danger" onClick={this.deleteAssessment}>
							Delete
						</button>
						<button className="btn btn-primary" onClick={this.saveAssessment}>
							Save
						</button>
					</div>
				) : (
					<></>
				)}
			</>
		);
	}
}

class SubcomponentEnterMarks extends React.Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);

		this.state = {
			students: [],
			item: null,
		};
	}

	componentDidMount() {
		const apiUrl = `${this.context.apiUrl}/module/students/get?module_code=${this.props.item.module_code}`;

		axios.get(apiUrl).then((res) => {
			this.setState({
				students: res.data,
				item: this.props.item,
			});
		});
	}

	enterMarks = (event) => {
		const apiUrl = `${this.context.apiUrl}/marks/set`;
		const user_id = this.state.students[event.currentTarget.id].user_id;
		const marks = event.currentTarget.value;

		console.log(this.props.item);

		if (marks <= this.state.item.max_marks) {
			axios.post(apiUrl, { component_id: this.state.item.component_id, user_id: user_id, marks: marks });
		} else {
			this.context.errorToast(`Marks cannot be more than ${this.state.item.max_marks}`);
			event.currentTarget.value = this.state.item.max_marks;
		}
	};

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
								<th>Max marks</th>
							</tr>
						</thead>
						<tbody>
							{this.state.students.map((student, index) => {
								return (
									<tr key={index}>
										<td>{student.user_id}</td>
										<td>{student.name}</td>
										<td>
											<input id={index} className="form-control" type="number" min="0" max={item.max_marks} onChange={this.enterMarks} />
										</td>
										<td>/ {item.max_marks}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			);
		}
	}
}

class SubcomponentEnterFeedback extends React.Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);

		this.state = {
			feedbackType: "Summative",
		};
	}

	componentDidMount() {
		const item = this.props.item;
		const apiUrl = `${this.context.apiUrl}/feedback/get`;
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	updateSummativeComment = (event) => {
		this.setState({
			summativeComment: event.currentTarget.value,
		});
	};

	render() {
		const item = this.props.item;

		return (
			<div className="fb fb-col" style={{ height: "100%" }}>
				<div>
					<select className="form-control" onChange={this.handleChange} name="feedbackType">
						<option value="Summative">Summative</option>
						<option value="Formative">Formative</option>
					</select>
				</div>
				<br></br>
				<div>{this.state.feedbackType === "Summative" ? <textarea value={this.state.summativeComment} onChange={this.updateSummativeComment} style={{ width: "100%" }} /> : <></>}</div>
			</div>
		);
	}
}

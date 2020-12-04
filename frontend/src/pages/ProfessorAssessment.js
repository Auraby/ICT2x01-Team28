import React, { Component } from "react";
import { MyContext } from "../context/myContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default class ProfessorAssessment extends Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);

		this.state = {
			page: "edit",
		};
	}

	setPage = (event) => {
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
							<a href="#" data-value="edit" onClick={this.setPage} className={"tab-item nav-link px-4 " + (this.state.page === "edit" ? "active" : "")}>
								Edit
							</a>
						</li>
						<li className="nav-item">
							<a href="#" data-value="marks" onClick={this.setPage} className={"tab-item nav-link px-4 " + (this.state.page === "marks" ? "active" : "")}>
								Enter marks
							</a>
						</li>
						<li className="nav-item">
							<a href="#" data-value="feedback" onClick={this.setPage} className={"tab-item nav-link px-4 " + (this.state.page === "feedback" ? "active" : "")}>
								Enter feedback
							</a>
						</li>
						<li className="nav-item">
							<a href="#" data-value="add" onClick={this.setPage} className={"tab-item nav-link px-4 " + (this.state.page === "add" ? "active" : "")}>
								Add subcomponents
							</a>
						</li>
					</ul>
				</div>
				<div style={{ position: "relative", width: "100%", height: "100%" }} className="fb fb-col fcc">
					<AnimatePresence>
						{this.state.page === "edit" && (
							<motion.div
								style={{ height: "100%", width: "100%", position: "absolute" }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
							>
								<AssessmentForm item={item} disabled={false} refresh={this.props.refresh} state={this.state} setPage={this.setPage} />
							</motion.div>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{this.state.page === "marks" && (
							<motion.div
								style={{ height: "100%", width: "100%", position: "absolute" }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
							>
								<AssessmentEnterMarks item={item} disabled={false} refresh={this.props.refresh} state={this.state} setPage={this.setPage} />
							</motion.div>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{this.state.page === "feedback" && (
							<motion.div
								style={{ height: "100%", width: "100%", position: "absolute" }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
							>
								<AssessmentEnterFeedback item={item} disabled={false} refresh={this.props.refresh} state={this.state} setPage={this.setPage} />
							</motion.div>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{this.state.page === "add" && (
							<motion.div
								style={{ height: "100%", width: "100%", position: "absolute" }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
							>
								<AssessmentAddSubcomponent item={item} disabled={false} refresh={this.props.refresh} state={this.state} setPage={this.setPage} />
							</motion.div>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{this.state.page === "create" && (
							<motion.div
								style={{ height: "100%", width: "100%", position: "absolute" }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
							>
								<CreateSubcomponentForm item={item} disabled={false} refresh={this.props.refresh} state={this.state} setPage={this.setPage} />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		);
	}
}

class AssessmentForm extends React.Component {
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
		const assessmentId = this.props.item.assessment_id;
		const apiUrl = `${this.context.apiUrl}/module/assessment/delete?module_code=${moduleCode}&assessment_id=${assessmentId}`;

		axios.delete(apiUrl).then((res) => {
			if (res.data.msg !== "OK") {
				this.context.errorToast(res.data.msg);
			} else {
				this.context.successToast("Assessment deleted");
				this.props.refresh();
			}
		});
	};

	saveAssessment = () => {
		const apiUrl = `${this.context.apiUrl}/component/update`;

		axios
			.patch(apiUrl, { component_id: this.state.assessment_id, name: this.state.name, max_marks: this.state.max_marks, weightage: this.state.weightage, end_date: 0, create_date: 0 })
			.then((res) => {
				if (res.data.msg === "OK") {
					this.context.successToast("Assessment updated");
					this.props.refresh();
				} else {
					this.context.errorToast(res.data.msg);
				}
			});
	};

	render() {
		const item = this.props.item;

		const disableWeightage = "children" in item ? true : this.props.disabled;

		return (
			<>
				<div className="form-group">
					<label className="">Assessment Name:</label>
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

class AssessmentEnterMarks extends React.Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);

		this.state = {
			students: [],
			item: null,
			hasSubcomponents: false,
		};
	}

	componentDidMount() {
		const apiUrl = `${this.context.apiUrl}/module/students/get?module_code=${this.props.item.module_code}`;

		axios.get(apiUrl).then((res) => {
			this.setState({
				students: res.data,
			});
		});

		axios.get(`${this.context.apiUrl}/component/get?component_id=${this.props.item.assessment_id}`).then((res) => {
			this.setState({
				item: res.data.msg,
				hasSubcomponents: "cildren" in res.data.msg,
			});
		});
	}

	enterMarks = (event) => {
		const apiUrl = `${this.context.apiUrl}/marks/set`;
		const user_id = this.state.students[event.currentTarget.id].user_id;
		const marks = event.currentTarget.value;

		if (marks <= this.state.item.max_marks) {
			axios.post(apiUrl, { component_id: this.state.item.assessment_id, user_id: user_id, marks: marks }).then((res) => {
				console.log(res.data);

				if (res.data.msg !== "OK") {
					this.context.errorToast(res.data.msg);
				}
			});
		} else {
			this.context.errorToast(`Marks cannot be more than ${this.state.item.max_marks}`);
			event.currentTarget.value = this.state.item.max_marks;
		}
	};

	render() {
		const item = this.state.item;
		const hasSubcomponents = this.state.hasSubcomponents;

		if (hasSubcomponents || !item) {
			return (
				<div className="fb fb-col fcc" style={{ height: "100%", textAlign: "center" }}>
					<label>
						<h3>Cannot set marks here because this assessment has subcomponents</h3>
					</label>
				</div>
			);
		} else if (this.state.students.length === 0) {
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
				<label className="text-center">
					<h3>If you create subcomponents, you can no longer set max marks and weightage by assessment</h3>
				</label>
				<button className="btn btn-primary" onClick={this.props.setPage} data-value="create">
					Create subcomponents
				</button>
			</div>
		);
	}
}

class CreateSubcomponentForm extends React.Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);

		this.state = {
			name: "",
			weightage: 0,
			max_marks: 0,
		};
	}

	submitForm = () => {
		const apiUrl = `${this.context.apiUrl}/component/subcomponent/add?assessment_id=${this.props.item.assessment_id}`;

		axios.post(apiUrl, { name: this.state.name, max_marks: this.state.max_marks, weightage: this.state.weightage, end_date: 0 }).then((res) => {
			console.log(res.data);

			if (res.data.msg !== "OK") {
				this.context.errorToast(res.data.msg);
			} else {
				this.context.successToast("Subcomponent succeessfully created");
				this.props.refresh();
			}
		});
	};

	updateForm = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	render() {
		const item = this.props.item;

		return (
			<div className="fb fb-col fcc" style={{ height: "100%" }}>
				<div className="mb-3">
					<h3>
						<label>{`Creating Subcomponent for: ${item.module_code} - ${item.name}`}</label>
					</h3>
				</div>
				<div className="p-5" style={{ width: "100%" }}>
					<div className="form-group" style={{ width: "100%" }}>
						<label htmlFor="assesssmentName">Subcomponent Name:</label>
						<input value={this.state.name} id="name" name="name" type="text" className="form-control" onChange={this.updateForm} />
					</div>
					<div className="form-group" style={{ width: "100%" }}>
						<label htmlFor="marks">Maximum marks:</label>
						<input value={this.state.max_marks} id="max_marks" name="max_marks" className="form-control" onChange={this.updateForm} type="number" />
					</div>
					<div className="form-group" style={{ width: "100%" }}>
						<label htmlFor="weightage">Weightage:</label>
						<input value={this.state.weightage} id="weightage" name="weightage" className="form-control" onChange={this.updateForm} type="number" />
					</div>
					<div className="fb fb-row fb-sb" style={{ width: "100%" }}>
						<button className="btn btn-danger" onClick={this.props.setPage} data-value="overview">
							Back
						</button>
						<button className="btn btn-primary" onClick={this.submitForm}>
							Save
						</button>
					</div>
				</div>
			</div>
		);
	}
}

class AssessmentEnterFeedback extends React.Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);

		this.state = {
			feedbackType: "Summative",
			formative: [],
			summative: null,
			summativeComments: "",
		};
	}

	componentDidMount() {
		this.fetchComments();
	}

	fetchComments = () => {
		const apiUrl = `${this.context.apiUrl}/feedback/get?component_id=${this.props.item.assessment_id}`;

		this.setState({
			formative: [],
			summative: null,
			summativeComments: "",
		});

		axios.get(apiUrl).then((res) => {
			const data = res.data;

			if ("formative" in data) {
				this.setState({
					formative: res.data.formative,
				});
			}

			if ("summative" in data) {
				this.setState({
					summative: res.data.summative,
					summativeComments: res.data.summative.comments,
				});
			}
		});
	};

	handleChange = (event) => {
		this.setState(
			{
				[event.target.name]: event.target.value,
			},
			() => {
				this.fetchComments();
			}
		);
	};

	createFormative = () => {
		const apiUrl = `${this.context.apiUrl}/feedback/add?component_id=${this.props.item.component_id}&comments=${""}&isSummative=${false}`;
		var formative = this.state.formative;

		axios.post(apiUrl, {}).then((res) => {
			formative.push({
				component_id: this.props.item.component_id,
				comments: "",
				feedback_id: res.data.msg,
			});

			this.setState({
				formative: formative,
			});

			this.context.successToast("Formative feedback created");
		});
	};

	updateSummativeComment = (event) => {
		if (!this.state.summative) {
			const apiUrl = `${this.context.apiUrl}/feedback/add?component_id=${this.props.item.component_id}&comments=${event.currentTarget.value}&isSummative=${true}`;

			axios.post(apiUrl, {}).then((res) => {
				this.setState({
					summative: {
						feedback_id: res.data.msg,
						comments: event.currentTarget.value,
						component_id: this.props.item.component_id,
					},
				});
			});
		} else {
			this.setState(
				{
					summativeComments: event.currentTarget.value,
				},
				() => {
					const apiUrl = `${this.context.apiUrl}/feedback/update`;
					axios.patch(apiUrl, {
						component_id: this.props.item.component_id,
						feedback_id: this.state.summative.feedback_id,
						comments: this.state.summativeComments,
					});
				}
			);
		}
	};

	deleteFeedback = (event) => {
		const feedback_id = event.currentTarget.getAttribute("data-value");
		const apiUrl = `${this.context.apiUrl}/feedback/delete?feedback_id=${feedback_id}`;

		axios.delete(apiUrl).then((res) => {
			if (res.data.msg !== "OK") {
				this.context.errorToast(res.data.msg);
			} else {
				this.fetchComments();
				this.context.successToast("Feedback deleted");
			}
			console.log(res.data);
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
				{this.state.feedbackType === "Summative" ? (
					<div>
						<textarea className="form-control" value={this.state.summativeComments} onChange={this.updateSummativeComment} style={{ width: "100%", height: "300px" }} />
					</div>
				) : (
					<div className="fb fb-col">
						{this.state.formative.length > 0 ? (
							<div className="">
								<button className="btn btn-primary" onClick={this.createFormative}>
									Create
								</button>
								{this.state.formative.map((item, index) => {
									return <FormativeFeedback item={item} key={index} index={index} component_id={this.props.item.component_id} deleteFeedback={this.deleteFeedback} />;
								})}
							</div>
						) : (
							<div className="fb fb-col fcc" style={{ width: "100%", height: "100%" }}>
								<h3>
									<label>No formative feedback as of now</label>
								</h3>
								<button className="btn btn-primary" onClick={this.createFormative}>
									Create
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

class FormativeFeedback extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);

		this.state = {
			disabled: true,
			new: this.props.new,
			comments: this.props.item.comments,
		};
	}

	toggleDisabled = () => {
		const disabled = this.state.disabled;

		this.setState({
			disabled: !disabled,
		});
	};

	handleChange = (event) => {
		const comments = event.currentTarget.value;
		const apiUrl = `${this.context.apiUrl}/feedback/update`;

		this.setState({
			[event.currentTarget.name]: event.currentTarget.value,
		});

		axios.patch(apiUrl, {
			component_id: this.props.item.component_id,
			feedback_id: this.props.item.feedback_id,
			comments: comments,
		});
	};

	render() {
		const disabled = this.props.new ? false : this.state.disabled;

		return (
			<div className="fb fb-col my-3">
				<label>{`Formative comment ${this.props.index + 1}:`}</label>
				<div className="fb fb-row">
					<textarea name="comments" className="form-control" disabled={false} onChange={this.handleChange} value={this.state.comments} />
					<button className="btn btn-danger" data-value={this.props.item.feedback_id} onClick={this.props.deleteFeedback}>
						<span className="material-icons">delete</span>
					</button>
				</div>
			</div>
		);
	}
}

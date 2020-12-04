import React, { Component } from "react";
import { MyContext } from "../context/myContext";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

export default class ProfessorModule extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);

		this.state = {
			page: "overview",
		};
	}

	setPage = (event) => {
		console.log(event.currentTarget.getAttribute("data-value"));

		this.setState({
			page: event.currentTarget.getAttribute("data-value"),
		});
	};

	render() {
		const item = this.props.item;

		return (
			<>
				<AnimatePresence>
					{this.state.page === "overview" && (
						<motion.div style={{ height: "100%" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
							<ModuleOverview state={this.state} item={item} setPage={this.setPage} refresh={this.props.refresh} />
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{this.state.page === "create" && (
						<motion.div style={{ height: "100%" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
							<CreateAssessment state={this.state} setPage={this.setPage} item={item} refresh={this.props.refresh} />
						</motion.div>
					)}
				</AnimatePresence>
			</>
		);
	}
}

class ModuleOverview extends Component {
	static contextType = MyContext;

	render() {
		const item = this.props.item;

		return (
			<div className="fb fb-col fcc" style={{ height: "100%" }}>
				<label>
					<h3>
						{item.name}: {item.module_name}
					</h3>
				</label>
				<button className="btn btn-primary" onClick={this.props.setPage} data-value="create">
					Create assessment
				</button>
			</div>
		);
	}
}

class CreateAssessment extends Component {
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
		const apiUrl = `${this.context.apiUrl}/module/assessment/add?module_code=${this.props.item.module_code}`;

		axios.post(apiUrl, { name: this.state.name, max_marks: this.state.max_marks, weightage: this.state.weightage, end_date: 0 }).then((res) => {
			if (res.data.msg !== "OK") {
				this.context.errorToast(res.data.msg);
			} else {
				this.context.successToast("Assessment succeessfully added");
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
						<label>{`Creating assessment for: ${item.module_code}`}</label>
					</h3>
				</div>
				<div className="p-5" style={{ width: "100%" }}>
					<div className="form-group" style={{ width: "100%" }}>
						<label htmlFor="assesssmentName">Assessment Name:</label>
						<input value={this.state.name} id="name" name="name" type="text" className="form-control" onChange={this.updateForm} />
					</div>
					<div className="form-group" style={{ width: "100%" }}>
						<label htmlFor="max_marks">Maximum marks:</label>
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

import React, { Component } from "react";
import { MyContext } from "../context/myContext";
import { Treebeard } from "react-treebeard";
import ProfessorAssessment from "./ProfessorAssessment";
import axios from "axios";

export default class ProfessorHome extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			name: null,
			end_date: null,
			max_marks: null,
			weightage: null,
			create_date: null,
		};
		this.onToggle = this.onToggle.bind(this);
	}

	componentDidMount() {
		axios.get(`${this.context.apiUrl}/user/modules/get?email=A88888%40singaporetech.edu.sg`).then((res) => {
			this.setState({
				data: res.data,
			});
		});
	}

	onToggle(node, toggled) {
		const { cursor, data } = this.state;

		if (cursor) {
			cursor.active = false;
			this.setState({
				name: null,
				end_date: null,
				max_marks: null,
				weightage: null,
				create_date: null,
			});
		}

		node.active = !node.active;
		if (node.children) {
			node.toggled = toggled;
		}

		this.setState({
			name: node.name,
			end_date: node.end_date,
			max_marks: node.max_marks,
			weightage: node.weightage,
			create_date: node.create_date,
		});
		this.setState(
			() => ({ cursor: node, data: Object.assign({}, data) }),
			() => {}
		);
	}

	render() {
		const item = this.state.cursor;
		var page;

		if (!item) {
			page = (
				<div className="fb fb-col fcc" style={{ height: "100%" }}>
					<label>
						<h3>Select something</h3>
					</label>
				</div>
			);
		} else if (item.type === "Assessment") {
			page = <ProfessorAssessment item={item} />;
		} else if (item.type === "Module") {
			page = (
				<div className="fb fb-col fcc" style={{ height: "100%" }}>
					<label>
						<h3>
							{item.name}: {item.module_name}
						</h3>
					</label>
					<button className="btn btn-primary">Create assessment</button>
				</div>
			);
		}

		return (
			<div className="fb fb-row fcc" style={{ height: "75vh" }}>
				<div className="bg-secondary fb fb-col" style={{ height: "100%", minWidth: "200px" }}>
					<Treebeard data={this.state.data} onToggle={this.onToggle} />
				</div>
				<div className="ml-4 bg-secondary" style={{ height: "100%", width: "50vw", overflowY: "auto" }}>
					{page}
				</div>
			</div>
		);
	}
}

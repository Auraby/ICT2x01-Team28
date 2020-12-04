import React, { Component } from "react";
import { MyContext } from "../context/myContext";
import { Treebeard } from "react-treebeard";
import axios from "axios";
import ProfessorModule from "./ProfessorModule";
import ProfessorAssessment from "./ProfessorAssessment";
import ProfessorSubcomponent from "./ProfessorSubcomponent";
import { Redirect } from "react-router-dom";

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
		this.refreshData();
	}

	refreshData = () => {
		axios.get(`${this.context.apiUrl}/user/modules/get?email=${this.context.state.email}`).then((res) => {
			this.setState({
				data: res.data,
			});
		});
	};

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

		if (this.context.state.email === "") {
			return <Redirect to="/login" />;
		}

		if (!item) {
			page = (
				<div className="fb fb-col fcc" style={{ height: "100%" }}>
					<label>
						<h3>Select something from the left</h3>
					</label>
				</div>
			);
		} else if (item.type === "Assessment") {
			page = <ProfessorAssessment item={item} refresh={this.refreshData} />;
		} else if (item.type === "Module") {
			page = <ProfessorModule item={item} state={this.state} refresh={this.refreshData} />;
		} else if (item.type === "Subcomponent") {
			page = <ProfessorSubcomponent item={item} refresh={this.refreshData} />;
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

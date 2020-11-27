import React, { Component } from "react";
import { MyContext } from "../context/myContext";
import { Panel } from "../components/panel";
import { Module } from "../components/image";

export default class ProfessorHome extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<>
					<Panel>
					<div className="fb fb-row fb-wrap fb-center fb-se">
						<label className="display-1 text-white text-center fb-fw">My Modules</label>
						<div className="fb fb-row fb-se">
							<Module src="/img/mysql.jpg" label="ICT2101"  onClick={this.props.onModuleSelect} id="1" />
							<Module src="/img/mysql.jpg" label="ICT2102"  onClick={this.props.onModuleSelect} id="1" />
							<Module src="/img/mysql.jpg" label="ICT2103"  onClick={this.props.onModuleSelect} id="1" />
						</div>
					</div>
				</Panel>
			</>
		);
	}
}

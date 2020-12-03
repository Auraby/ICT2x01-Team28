import React, { Component } from "react";
import { MyContext } from "../context/myContext";
import { Panel } from "../components/panel";
import { Module } from "../components/image";
import axios from "axios";

export default class StudentHome extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);

		this.state = {
			modules: [],
			toggle: false,
		};
	}

	componentDidMount() {
		const apiUrl = `${this.context.apiUrl}/user/modules/get?email=${this.context.state.email}`;

		axios.get(apiUrl).then((res) => {
			this.setState({
				modules: res.data.children,
			});
		});
	}

	render() {
		return (
			<Panel>
				<div className="fb fb-col">
					<label className="display-1 text-white text-center fb-fw">My Modules</label>
					<div className="fb fb-row fb-wrap fb-center fb-se">
						<div className="fb fb-row fb-se">
							{this.state.modules.map((item, index) => {
								return <Module key={index} src="/img/mysql.jpg" label={item.name} href={`studentview/module/${item.name}`} id="1" />;
							})}
						</div>
					</div>
				</div>
			</Panel>
		);
	}
}

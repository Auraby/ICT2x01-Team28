import React, { Component } from "react";
import { Input } from "../components/input";
import { Panel } from "../components/panel";
import { MyContext } from "../context/myContext";

export default class Login extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.context.login(this.state.email);
	};

	render() {
		return (
			<Panel>
				<form onSubmit={this.handleSubmit} className="fill-panel">
					<label htmlFor="email" className="display-1 text-white text-center">
						Login
					</label>
					<Input value={this.state.email} name="email" type="text" label="Email" onChange={this.handleChange} />
					<Input value={this.state.password} name="password" type="password" label="Password" onChange={this.handleChange} />

					<button type="submit" className="btn btn-primary">
						Login
					</button>
				</form>
			</Panel>
		);
	}
}

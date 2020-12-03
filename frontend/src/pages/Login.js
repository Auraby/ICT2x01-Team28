import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { MyContext } from "../context/myContext";

export default class Login extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			redirect: false,
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		axios.get(`${this.context.apiUrl}/user/login?email=${this.state.email}&password=${this.state.password}`).then((res) => {
			if (res.data.msg !== "OK") {
				this.context.errorToast(res.data.msg);
			} else {
				console.log(res.data.user);
				this.context.login(res.data.user);
			}
		});
	};

	render() {
		if (this.context.state.role === "student") {
			return <Redirect to="/home" />;
		} else if (this.context.state.role === "professor") {
			return <Redirect to="professorHome" />;
		}

		return (
			<div style={{ backgroundColor: "white", alignItems: "center", height: "100vh", overflowY: "hidden" }} className="fb fb-row">
				<img className="" alt="banner" src={`${process.env.PUBLIC_URL}/img/banner.jpg`} />
				<div className="fb fb-col p-5">
					<div>
						<img className="" alt="sit logo" src={`${process.env.PUBLIC_URL}/img/sitlogo.jpg`} />
					</div>
					<label className="mt-5">Sign in with your organizational account</label>
					<div className="fb fb-col">
						<input
							onChange={this.handleChange}
							value={this.state.email}
							name="email"
							style={{ backgroundColor: "white", color: "gray" }}
							className="form-control my-1"
							placeholder="someone@example.com"
							type="text"
						/>
						<input
							onChange={this.handleChange}
							value={this.state.password}
							name="password"
							style={{ backgroundColor: "white", color: "gray" }}
							className="form-control my-1"
							placeholder="Password"
							type="password"
						/>
						<div class="form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1" />
							<label class="form-check-label" for="exampleCheck1">
								Keep me signed in
							</label>
						</div>
						<button className="btn mt-3" style={{ background: "#2672EC", color: "white" }} onClick={this.handleSubmit}>
							Sign in
						</button>
						<p className="mt-4">
							<strong>Staff</strong> can login using your Staff ID with <strong>@singaporetech.edu.sg</strong> as suffix (i.e A88xxx@singaporetech.edu.sg)
						</p>
						<p className="mt-4">
							<strong>Students</strong> and <strong>Alumni</strong> can login using your Student ID with <strong>@sit.singaporetech.edu.sg</strong> as suffix (i.e.
							12ABC888X@sit.singaporetech.edu.sg)
						</p>
						<p className="mt-3">Reset or change your password at the Self-Service Portal</p>
						<p className="mt-3">For assistance, email us at IT Helpdesk and include the following details:</p>
					</div>
				</div>
			</div>
		);
	}
}

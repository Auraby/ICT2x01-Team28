import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { MyContext } from "../context/myContext";

export default class Logout extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.context.logout();
	}

	render() {
		return <Redirect to={"/login"} />;
	}
}

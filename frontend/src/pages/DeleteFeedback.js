import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class DeleteFeedback extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
	}

	componentDidMount() {
		/* use Axios to send a HTTP DELETE request here */

		const id = this.props.match.params.id;

		console.log(id);

		this.setState({
			redirect: true,
		});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={"/view/feedback/1"} />;
		}

		return <></>;
	}
}

import React, { Component } from "react";
import { MyContext } from "../context/myContext";
import { Panel } from "../components/panel";
import { Achievement, ProfileImage } from "../components/image";
import { Spring, Trail } from "react-spring/renderprops";

/***********************************************************
 * Student Home Page can only view feedback
 ***********************************************************/
export default class ViewModule extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const items = [{ text: "abc" }, { text: "abc" }, { text: "abc" }];

		return (
			<Panel>
				<div className="fb fb-col">
					<div className="fb fb-row fb-sb fb-wrap">
						<div className="fb fb-col fb-center px-5">
							<Spring from={{ marginTop: -20000 }} to={{ marginTop: 0 }}>
								{(props) => <ProfileImage src="/img/1902619.jpg" style={props} />}
							</Spring>
							<div className="fb fb-col fb-center mt-2">
								<label>Welcome back, Max</label>
								<label>What would you like to do today?</label>
							</div>
						</div>
						<div className="fb fb-col fb-se px-5">
							<button className="btn btn-primary">View Feedback</button>
							<button className="btn btn-primary">View Achievements</button>
							<button className="btn btn-primary">View Ladder</button>
						</div>
					</div>
					<div className="fb fb-col pt-5">
						<label>
							<h2 className="text-center fb-fw">Achievement Progress</h2>
						</label>
						<div className="fb fb-row">
							<Trail items={items} keys={(item) => item.key} from={{ marginTop: -20000 }} to={{ marginTop: 0 }} config={{ delay: 500 }}>
								{(item) => (props) => (
									<div>
										<Achievement style={props} src="/img/1902619.jpg" />
									</div>
								)}
							</Trail>
						</div>
					</div>
				</div>
			</Panel>
		);
	}
}

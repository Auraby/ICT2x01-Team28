import React, { Component, Fragment } from "react";
import { MyContext } from "../context/myContext";
import { Panel } from "../components/panel";
import { Achievement, ProfileImage } from "../components/image";
import { Spring, Trail } from "react-spring/renderprops";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

/***********************************************************
 * Student Home Page can only view feedback
 ***********************************************************/
export default class ViewModule extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);

		this.state = {
			moduleCode: this.props.match.params.module_code,
			selectedAssessment: "",
			page: "overview",
		};
	}

	componentDidMount() {
		const urlAchievements = `${this.context.apiUrl}/game/achievements/get`;
		const urlLadder = `${this.context.apiUrl}/game/ladder/get`;
		const urlFeedback = `${this.context.apiUrl}/feedback/get?email=${this.context.state.email}`;

		this.setState({
			achievementsTopThree: [
				{
					name: "Ass(essment) hole",
					description: "Get A for any assessment this trimester",
					src: "/img/achievements/Achievement 1.jpg",
				},
				{
					name: "while (True): learn()",
					description: "B and above streak for more than 2 assessments",
					src: "/img/achievements/Achievement 2.jpg",
				},
				{
					name: "pro-grammer",
					description: "Maintain top 10 position on the ladder",
					src: "/img/achievements/Achievement 3.jpg",
				},
			],

			achievements: [
				{
					name: "Ass(essment) hole",
					description: "Get A for any assessment this trimester",
					src: "/img/achievements/Achievement 1.jpg",
					unlocked: true,
				},
				{
					name: "while (True): learn()",
					description: "B and above streak for more than 2 assessments",
					src: "/img/achievements/Achievement 2.jpg",
					unlocked: true,
				},
				{
					name: "pro-grammer",
					description: "Maintain top 10 position on the ladder",
					src: "/img/achievements/Achievement 3.jpg",
					unlocked: true,
				},
				{
					name: "soft-ware developer",
					description: "Maintain top 20 position on the ladder",
					src: "/img/achievements/Achievement 4.jpg",
					unlocked: false,
				},
				{
					name: "algo-rhythm",
					description: "Maintain top 20 position on the ladder",
					src: "/img/achievements/Achievement 5.jpg",
					unlocked: false,
				},
				{
					name: "semi-colonscopy",
					description: "Maintain top 20 position on the ladder",
					src: "/img/achievements/Achievement 6.jpg",
					unlocked: false,
				},
				{
					name: "back to BASIC",
					description: "Maintain top 20 position on the ladder",
					src: "/img/achievements/Achievement 7.jpg",
					unlocked: false,
				},
				{
					name: "I need glasses to C#",
					description: "Maintain top 20 position on the ladder",
					src: "/img/achievements/Achievement 8.jpg",
					unlocked: false,
				},
				{
					name: "struct by lightning",
					description: "Maintain top 20 position on the ladder",
					src: "/img/achievements/Achievement 9.jpg",
					unlocked: false,
				},
				{
					name: "string me along",
					description: "Maintain top 20 position on the ladder",
					src: "/img/achievements/Achievement 10.jpg",
					unlocked: false,
				},
			],
		});
	}

	setPage = (event) => {
		const page = event.currentTarget.getAttribute("data-value").toLowerCase();
		this.setState({
			page: page,
		});
	};

	selectAssessment = (event) => {
		this.setState({
			selectedAssessment: event.currentTarget.value,
			page: "feedback",
		});
	};

	render() {
		return (
			<AnimatePresence>
				{this.state.page === "overview" && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
						<ModuleOverview state={this.state} setPage={this.setPage} />
					</motion.div>
				)}
				{this.state.page === "selectassessment" && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
						<SelectAssessment state={this.state} setPage={this.setPage} selectAssessment={this.selectAssessment} />
					</motion.div>
				)}
				{this.state.page === "feedback" && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
						<ModuleFeedback state={this.state} setPage={this.setPage} />
					</motion.div>
				)}
				{this.state.page === "achievements" && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
						<AchievementView state={this.state} setPage={this.setPage} />
					</motion.div>
				)}
				{this.state.page === "ladder" && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
						<Ladder state={this.state} setPage={this.setPage} />
					</motion.div>
				)}
			</AnimatePresence>
		);
	}
}

class ModuleOverview extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);
	}

	render() {
		const items = this.props.state.achievementsTopThree;

		return (
			<Panel>
				<div className="fb fb-col">
					<div className="fb fb-row fb-sb fb-wrap">
						<div className="fb fb-col fb-center px-5">
							<Spring from={{ marginTop: -20000 }} to={{ marginTop: 0 }}>
								{(props) => <ProfileImage src="/img/1902619.jpg" style={props} />}
							</Spring>
							<div className="fb fb-col fb-center mt-2">
								<label>
									Welcome back, <strong>Max</strong>
								</label>
								<label>What would you like to do today?</label>
							</div>
						</div>
						<div className="fb fb-col fb-se px-5">
							<button className="btn btn-primary" onClick={this.props.setPage} data-value="selectassessment">
								View Feedback
							</button>
							<button className="btn btn-primary" onClick={this.props.setPage} data-value="achievements">
								View Achievements
							</button>
							<button className="btn btn-primary" onClick={this.props.setPage} data-value="ladder">
								View Ladder
							</button>
						</div>
					</div>
					<div className="fb fb-col pt-5">
						<label>
							<h2 className="text-center fb-fw">Recent Achievements</h2>
						</label>
						<div className="fb fb-row">
							<Trail items={items} keys={(item) => item.key} from={{ marginTop: -20000 }} to={{ marginTop: 0 }} config={{ delay: 500 }}>
								{(item) => (props) => (
									<div>
										<Achievement item={item} style={props} src={item.src} />
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

class SelectAssessment extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);

		this.state = {
			assessments: [],
			selectedAssessment: "",
		};
	}

	componentDidMount() {
		const assessmentUrl = `${this.context.apiUrl}/module/assessments/get?module_code=${this.props.state.moduleCode}`;

		axios.get(assessmentUrl).then((res) => {
			this.setState({
				assessments: res.data.msg,
			});
		});
	}

	render() {
		return (
			<Panel>
				<div className="fb fb-col fcc">
					<div className="form-group" style={{ width: "100%" }}>
						<label htmlFor="assessmentSelect">Select an assessment:</label>
						<select id="assessmentSelect" name="assessment" className="form-control" defaultValue="" onChange={this.props.selectAssessment}>
							<option disabled={true} value="">
								Select an assessment
							</option>
							{this.state.assessments.map((item, index) => {
								return (
									<option key={index} value={item.assessment_id}>
										{item.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className="fb fb-row fb-sb">
					<button className="btn btn-danger" onClick={this.props.setPage} data-value="overview">
						Back
					</button>
				</div>
			</Panel>
		);
	}
}

class ModuleFeedback extends Component {
	static contextType = MyContext;

	constructor(props) {
		super(props);

		this.state = {
			feedback: {},
			marks: {},
		};
	}

	componentDidMount() {
		const feedbackUrl = `${this.context.apiUrl}/feedback/get?component_id=${this.props.state.selectedAssessment}`;
		const marksUrl = `${this.context.apiUrl}/marks/get?component_id=${this.props.state.selectedAssessment}&user_id=${this.context.state.user_id}`;

		axios.get(feedbackUrl).then((res) => {
			this.setState({
				feedback: res.data,
			});
		});

		axios.get(marksUrl).then((res) => {
			this.setState({
				marks: res.data,
			});
		});
	}

	render() {
		return (
			<Panel>
				<div className="fb fb-col p-5" style={{ minWidth: "700px", minHeight: "700px" }}>
					<h3 className="text-center">
						<label>Feedback for ICT2X01 Project</label>
					</h3>
					<div className="fb fb-col fcc">
						<label>
							<strong>Marks attained:</strong> {`${this.state.marks.marks} / ${this.state.marks.max_marks}`}
						</label>
						<label>
							<strong className="mr-2">Overall grade:</strong>
							{this.state.marks.grade ? (
								this.state.marks.grade.charAt(0) === "A" ? (
									<label className="text-success">{this.state.marks.grade}</label>
								) : this.state.marks.grade.charAt(0) === "B" ? (
									<label className="text-warning">{this.state.marks.grade}</label>
								) : (
									<label className="text-danger">{this.state.marks.grade}</label>
								)
							) : (
								<></>
							)}
						</label>
					</div>

					{"summative" in this.state.feedback ? (
						<div className="form-group mt-4" style={{ width: "100%" }}>
							<label>Summative feedback</label>
							<textarea className="form-control" readOnly={true} defaultValue={this.state.feedback.summative.comments} />
						</div>
					) : (
						<></>
					)}
					{"formative" in this.state.feedback ? (
						this.state.feedback.formative.map((item, index) => {
							return (
								<div className="form-group" style={{ width: "100%" }} key={index}>
									<label>{`Formative feedback ${index + 1}:`}</label>
									<textarea className="form-control" disabled={true} defaultValue={item.comments} />
								</div>
							);
						})
					) : (
						<></>
					)}
				</div>
				<div className="fb fb-row fb-sb">
					<button className="btn btn-danger" onClick={this.props.setPage} data-value="overview">
						Back
					</button>
				</div>
			</Panel>
		);
	}
}

class AchievementView extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const achievements = this.props.state.achievements;

		return (
			<Panel>
				<div className="fb fb-col">
					<div className="mb-3">
						<h3 className="text-center">
							<label>My Achievements</label>
						</h3>
					</div>
					<div className="fb fb-row fb-sa" style={{ flexWrap: "wrap", maxWidth: "700px" }}>
						{achievements.map((item, index) => {
							return (
								<div className="mx-3 text-center fb fb-col">
									<AchievementItem key={index} item={item} src={item.src} />
									<label className="text-center">{item.name}</label>
								</div>
							);
						})}
					</div>
				</div>
				<div className="fb fb-row mt-5">
					<button className="btn btn-danger" data-value="overview" onClick={this.props.setPage}>
						Back
					</button>
				</div>
			</Panel>
		);
	}
}

class AchievementItem extends Component {
	render() {
		const item = this.props.item;

		if (item.unlocked) {
			return (
				<div className="fb fb-col" style={{}}>
					<img alt="" key={this.props.key} className="rounded-circle achievement-img-small" src={`${process.env.PUBLIC_URL}${this.props.src}`} />
				</div>
			);
		} else {
			return (
				<div style={{ position: "relative" }} className="fb fb-col fcc">
					<div className="achievement-locked-overlay" style={{ zIndex: 10 }}></div>
					<label style={{ position: "absolute", zIndex: 11, margin: 0 }}>
						<h4 style={{ margin: 0 }}>LOCKED</h4>
					</label>
					<img alt="" key={this.props.key} className="rounded-circle achievement-img-small" src={`${process.env.PUBLIC_URL}${this.props.src}`} />
				</div>
			);
		}
	}
}

class Ladder extends Component {
	render() {
		const item = this.props.item;
		const nums = [
			[1, 2, 3, 4, 5],
			[6, 7, 8, 9, 10],
			[11, 12, 13, 14, 15],
			[16, 17, 18, 19, 20],
		];

		return (
			<div className="bg-secondary p-5">
				<div className="fb fb-col">
					<div className="text-center">
						<h3>
							<label>Ladder for ICT2X01</label>
						</h3>
						<h4>
							<label>Bracket 1</label>
						</h4>
					</div>
					<div className="fb fb-row fcc">
						<table>
							<tbody>
								{nums.map((arr, index) => {
									console.log(arr);
									return <LadderRow numbers={arr} key={index} />;
								})}
							</tbody>
						</table>
						<div className="ml-5 fb fb-col">
							<span className="text-success material-icons" style={{ fontSize: "100px" }}>
								arrow_upward
							</span>
							<label className="text-success" style={{ fontSize: "75px" }}>
								+5
							</label>
						</div>
					</div>
				</div>
				<div className="fb fb-row fb-sb mt-3">
					<button className="btn btn-danger" onClick={this.props.setPage} data-value="overview">
						Back
					</button>
				</div>
			</div>
		);
	}
}

class LadderRow extends Component {
	render() {
		const numbers = this.props.numbers;

		return (
			<tr className="text-center">
				{numbers.map((item) => {
					return <React.Fragment key={item}>{item !== 14 ? <LadderUser unknown={true} index={item} /> : <LadderUser unknown={false} index={item} />}</React.Fragment>;
				})}
			</tr>
		);
	}
}

class LadderUser extends Component {
	render() {
		if (this.props.index === 1) {
			return (
				<td key={this.props.index}>
					<div className="fb fb-col fcc">
						<img alt="" key={this.props.key} className="rounded-circle achievement-img-small" src={`${process.env.PUBLIC_URL}/img/kaiwen.jpg`} />
					</div>
					<label>
						<strong>Yong Kai Wen</strong>
					</label>
				</td>
			);
		} else if (this.props.index === 2) {
			return (
				<td key={this.props.index}>
					<div className="fb fb-col fcc">
						<img alt="" key={this.props.key} className="rounded-circle achievement-img-small" src={`${process.env.PUBLIC_URL}/img/dywoo.jpg`} />
					</div>
					<label>
						<strong>Dylan Woo</strong>
					</label>
				</td>
			);
		} else if (this.props.index === 3) {
			return (
				<td key={this.props.index}>
					<div className="fb fb-col fcc">
						<img alt="" key={this.props.key} className="rounded-circle achievement-img-small" src={`${process.env.PUBLIC_URL}/img/alwin.jpg`} />
					</div>
					<label>
						<strong>Alwin Chua</strong>
					</label>
				</td>
			);
		} else if (this.props.unknown) {
			return (
				<td key={this.props.index}>
					<div style={{ position: "relative" }} className="fb fb-col fcc text-center">
						<div style={{ zIndex: 10 }} className="unknown-user-overlay"></div>
						<label style={{ position: "absolute", zIndex: 11, margin: 0 }}>
							<h4 style={{ margin: 0 }}>{`#${this.props.index}`}</h4>
						</label>
						<img alt="" key={this.props.key} className="rounded-circle achievement-img-small" src={`${process.env.PUBLIC_URL}/img/unknown.jpg`} />
					</div>
					<label>Unknown</label>
				</td>
			);
		} else {
			return (
				<td key={this.props.index}>
					<div className="fb fb-col fcc">
						<img alt="" key={this.props.key} className="rounded-circle achievement-img-small" src={`${process.env.PUBLIC_URL}/img/1902619.jpg`} />
					</div>
					<label>
						<strong>YOU</strong>
					</label>
				</td>
			);
		}
	}
}

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import StudentHome from "./pages/StudentHome";
/* import ProfessorHome from './pages/ProfessorHome'; */
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Upload from "./pages/Upload";
import Navbar from "./components/navbar";
import AddAssessment from "./pages/AddAssessment";
import AddSubcomponent from "./pages/AddSubcomponent";
import AddFeedback from "./pages/AddFeedback";
import EditAssessment from "./pages/EditAssessment";
import EditSubcomponent from "./pages/EditSubcomponent";
import EditFeedback from "./pages/EditFeedback";
import ViewAssessment from "./pages/ViewAssessment";
import ViewSubcomponent from "./pages/ViewSubcomponent";
import ViewFeedback from "./pages/ViewFeedback";
import SelectAssessment from "./pages/SelectAssessment";
import SelectSubcomponent from "./pages/SelectSubcomponent";
import DeleteFeedback from "./pages/DeleteFeedback";
import ViewModule from "./pages/ViewModule";
import ProfessorHome from "./pages/ProfessorHome";
import { MyProvider } from "./context/myContext";

const App = () => {
	return (
		<MyProvider>
			<BrowserRouter>
				<Switch>
					<Route exact path="/login" component={Login} />
					<div className="hg-container">
						<header>
							<Navbar />
						</header>
						<main>
							<Route exact path="/" component={StudentHome} />
							<Route exact path="/home" component={StudentHome} />
							<Route exact path="/professorhome" component={ProfessorHome} />
							<Route exact path="/view/module/:id" component={ViewModule} />
							<Route exact path="/logout" component={Logout} />
							<Route exact path="/upload" component={Upload} />
							<Route exact path="/add/assessment" component={AddAssessment} />
							<Route exact path="/add/subcomponent" component={AddSubcomponent} />
							<Route exact path="/add/feedback/:id" component={AddFeedback} />
							<Route exact path="/edit/assessment/:id" component={EditAssessment} />
							<Route exact path="/edit/subcomponent/:id" component={EditSubcomponent} />
							<Route exact path="/edit/feedback/:id" component={EditFeedback} />
							<Route exact path="/select/assessment" component={SelectAssessment} />
							<Route exact path="/select/subcomponent" component={SelectSubcomponent} />
							<Route exact path="/delete/feedback/:id" component={DeleteFeedback} />
							<Route exact path="/view/assessment" component={ViewAssessment} />
							<Route exact path="/view/subcomponent" component={ViewSubcomponent} />
							<Route exact path="/view/feedback/:id" component={ViewFeedback} />
						</main>
					</div>
				</Switch>
			</BrowserRouter>
		</MyProvider>
	);
};

export default App;

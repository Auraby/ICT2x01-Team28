import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import StudentHome from './pages/StudentHome';
/* import ProfessorHome from './pages/ProfessorHome'; */
import Login from './pages/Login';
import Upload from './pages/Upload';
import Navbar from './components/navbar';
import AddAssessment from './pages/AddAssessment';
import EditAssessment from './pages/EditAssessment';
import SelectAssessment from './pages/SelectAssessment';
import ViewAssessment from './pages/ViewAssessment';
import AddSubcomponent from './pages/AddSubcomponent';
import EditSubcomponent from './pages/EditSubcomponent';
import SelectSubcomponent from './pages/SelectSubcomponent';
import ViewSubcomponent from './pages/ViewSubcomponent';


import { MyProvider } from './context/myContext';

export default class App extends React.Component {

    render() {
        return (
            <MyProvider>
                <Router>
                    <div className="hg-container">
                        <header>
                            <Navbar />
                        </header>
                        <nav className="d-none d-md-block sidebar"></nav>
                        <main>
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/" component={StudentHome} />
                                <Route exact path="/home" component={StudentHome} />
                                <Route exact path="/upload" component={Upload} />
                                <Route exact path="/add/assessment" component={AddAssessment} />
                                <Route exact path="/view/assessment" component={ViewAssessment} />
                                <Route exact path="/edit/assessment/:id" component={EditAssessment} />
                                <Route exact path="/select/assessment" component={SelectAssessment}/>
                                <Route exact path="/add/subcomponent" component={AddSubcomponent} />
                                <Route exact path="/view/subcomponent" component={ViewSubcomponent} />
                                <Route exact path="/edit/subcomponent/:id" component={EditSubcomponent} />
                                <Route exact path="/select/subcomponent" component={SelectSubcomponent}/>
                            </Switch>
                        </main>
                        <aside></aside>
                        <footer></footer>
                    </div>
                </Router>
            </MyProvider>
        )
    }
}
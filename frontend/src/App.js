import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { StudentHome } from './pages/home';
import Login from './pages/login';
import Upload from './pages/upload';
import Navbar from './components/navbar';
import { AddAssessment, EditAssessment, ViewAssessment } from './pages/assessment';
import { AddSubcomponent, ViewSubcomponent } from './pages/subcomponent';

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
                                <Route exact path="/edit/assessment" component={EditAssessment} />
                                <Route exact path="/add/subcomponent" component={AddSubcomponent} />
                                <Route exact path="/view/subcomponent" component={ViewSubcomponent} />
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
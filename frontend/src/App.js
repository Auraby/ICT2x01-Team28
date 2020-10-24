import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StudentHome } from './pages/home';
import Login from './pages/login';
import Upload from './pages/upload';
import Navbar from './components/navbar';
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
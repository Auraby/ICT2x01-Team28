import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login'
import Navbar from './components/Nav';
import { MyProvider } from './context/myContext';

export default class App extends React.Component {
    render() {
        return (
            <MyProvider>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                    <div class="hg-container">
                        <header>
                            <Navbar />
                        </header>
                        <nav className="d-none d-md-block sidebar"></nav>
                        <main>
                                <div className="content row">
                                    <Route exact path="/" component={Home} />
                                    <Route exact path="/home" component={Home} />
                                </div>
                        </main>
                        <aside></aside>
                        <footer></footer>
                    </div>
                    </Switch>
                </Router>
                
            </MyProvider>
        )
    }
}
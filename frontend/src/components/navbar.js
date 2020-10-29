import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

class NavbarDropdown extends Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired
    };

    render() {
        return (
            <li className="nav-item nav-dropdown">
                <a className="nav-link dropdown-toggle" href={this.props.href}>{this.props.title}</a>
                <div className="nav-dropdown-content">
                    {
                        this.props.options.map((item, index) => {
                            return (
                                <a key={"key_" + item.title} href={item.href} className="nav-link">{item.title}</a>
                            )
                        })
                    }
                </div>
            </li>
        )
    }
}

class NavItems extends Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        path: PropTypes.string.isRequired
    };

    getNavlinkParentStyle = (path) => {
        return path === this.props.path ? "nav-item active" : "nav-item";
    }

    render() {
        return (
            <>
            {
                this.props.options.map((item, index) => {
                    return (
                        <li className={this.getNavlinkParentStyle(item.href)} key={index}>
                            <NavLink to={item.href} className="nav-link">{item.title}</NavLink>
                        </li>
                    )
                })
            }
            </>
        )
    }
}

class Navbar extends Component {
    render() {
        const navItems = [
            {title: "Home", href: "/home"},
            {title: "Login",href: "/login"},
            {title: "Upload",href: "/upload"},
        ];

        const assessmentDropdown = [
            {title: "Add Assessment", href: "/add/assessment"},
            {title: "View Assessment", href: "/view/assessment"},
            {title: "Edit Assessment", href:"/select/assessment"}
        ];

        const subcomponentDropdown = [
            {title: "Add Subcomponent", href: "/add/subcomponent"},
            {title: "View Subcomponent", href: "/view/subcomponent"},
            {title: "Edit Subcomponent", href:"/select/subcomponent"}
        ]

        const feedbackDropdown = [
            {title: "Add feedback", href: "/add/feedback/1"},
            {title: "View feedback", href:"/view/feedback/1"}
        ]

        return(
            <nav className="navbar navbar-expand-lg navbar-dark shadow bg-secondary">
                <a className="navbar-brand" href="/home">SIT</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <NavItems options={navItems} path={this.props.location.pathname}/>
                        <NavbarDropdown href="/view/assessment" options={assessmentDropdown} title="Assessment"/>
                        <NavbarDropdown href="/view/subcomponent" options={subcomponentDropdown} title="Subcomponent"/>
                        <NavbarDropdown href="/view/feedback" options={feedbackDropdown} title="Feedback"/>
                    </ul>
                    <ul className="ml-auto navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-danger" href="/logout">
                                <i className="fas fa-sign-out-alt mr-2"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);
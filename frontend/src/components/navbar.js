import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Navbar extends Component {

    getNavlinkParentStyle = (path) => {
        return path === this.props.location.pathname ? "nav-item active" : "nav-item";
    }

    render() {
        const navItems = [
            {title: "Home", href: "/home"},
            {title: "Login",href: "/login"},
            {title: "Upload",href: "/upload"},
            {title: "Add Assessment", href: "/add/assessment"},
            {title: "View Assessment", href: "/view/assessment"},
            {title: "Edit Assessment", href:"/edit/assessment"}
        ];

        return(
            <nav className="navbar navbar-expand-lg navbar-dark shadow bg-secondary">
                <a className="navbar-brand" href="/">SIT</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            navItems.map((item, index) => {
                                return (
                                    <li className={this.getNavlinkParentStyle(item.href)} key={index}>
                                        <NavLink to={item.href} className="nav-link">{item.title}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="ml-auto navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-danger" href="/">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);
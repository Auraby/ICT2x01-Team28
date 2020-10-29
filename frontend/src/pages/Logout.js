import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MyContext } from '../context/myContext';

export default class Logout extends Component {

    static contextType = MyContext;

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        this.context.logout();
        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={"/login"} />
        }

        return (
            <></>
        )
    }
}
 
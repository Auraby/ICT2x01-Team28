import React, { Component } from 'react';
import { MyContext } from '../context/myContext';

export default class ProfessorHome extends Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        ;
    }

    render() { 
        return (
            <>
            <div className="StudentHome-container">
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="DrpModule" className="login-title">Professor Home</label>
                </form>
            </div>
            </>
        );
    }
}
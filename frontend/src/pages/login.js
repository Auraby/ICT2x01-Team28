import React, { Component } from 'react';
import { Input } from '../components/input';
import { Panel } from '../components/panel';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
    }

    render() { 
        return (
            <Panel>
                <form onSubmit={this.handleSubmit} className="fill-panel">
                    <label htmlFor="TxtUsername" className="display-1 text-white text-center">Login</label>
                    <Input name="username" type="text" label="Username" onChange={this.handleChange}/>
                    <Input name="password" type="password" label="Password" onChange={this.handleChange}/>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </Panel>
        )
    }
}
 
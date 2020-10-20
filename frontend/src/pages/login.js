import React, { Component } from 'react';
import { InputWithLabel } from '../components/input'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() { 
        return (
            <div className="login-container shadow">
                <div className="login-card">
                    <form onSubmit={this.handleSubmit}>
                        <label className="login-title">Login</label>
                        <div className="pt-3 pb-3">
                            <InputWithLabel inputClass="login-input" inputId="TxtUsername" label="Username" />
                        </div>
                        <div className="pb-3">
                            <InputWithLabel inputClass="login-input" inputId="TxtPassword"label="Password" />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}
 
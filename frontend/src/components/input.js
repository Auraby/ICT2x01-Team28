import React, { Component } from 'react';

export class InputWithLogo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <>
                <input type="text" name="" id=""/>
                <span></span>
            </>
        );
    }
}
 
export class InputWithLabel extends Component {
    render() {
        return (
            <>
                <label htmlFor={this.props.inputId}>{ this.props.label }</label>
                <input id={this.props.inputId} className={this.props.inputClass} />
            </>
        )
    }
}
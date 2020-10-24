import React, { Component } from 'react';

export class DropdownWithLabel extends Component {
    static defaultProps = {
        label: "",
        className: "",
        id: "DrpTicker",
        name: "ticker",
        onChange: function(){},
        value: "",
        options: [],
    }

    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 

        const options = this.props.options

        return (
            <>
                <label for={this.props.id} className="text-light-2">{this.props.label}</label>
                <select className={this.props.className} id={this.props.id} disabled={this.props.options.length === 0 ? true : false} onChange={this.props.onChange}>
                    {options.map(o => <option value={o}>{o}</option>)}
                </select>
            </>
        );
    }
}
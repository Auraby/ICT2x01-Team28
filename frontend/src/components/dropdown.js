import React, { Component } from 'react';
import PropTypes from "prop-types";

export class Dropdown extends Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string,
        className: PropTypes.string
    }

    static defaultProps = {
        className: "custom-select-lg custom-select"
    }

    render() { 

        const options = this.props.options

        return (
            <div className="form-group">
                <label htmlFor={this.props.name} className="text-light-2">{this.props.label}</label>
                <select className={this.props.className} id={this.props.name} name={this.props.name} disabled={this.props.options.length === 0 ? true : false} onChange={this.props.onChange}>
                    {options.map(o => <option value={o} key={"key_" + o}>{o}</option>)}
                </select>
            </div>
        );
    }
}
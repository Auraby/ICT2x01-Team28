import React, { Component } from 'react';
import PropTypes from "prop-types";

export class Panel extends Component {
    static propTypes = {
        className: PropTypes.string.isRequired
    }

    static defaultProps = {
        className: "panel bg-secondary"
    }

    render() { 
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}
import React, { Component } from 'react';
import PropTypes from "prop-types";

export class Table extends Component {
    static propTypes = {
        headers: PropTypes.array.isRequired,
        data: PropTypes.array,
        className: PropTypes.string,
    }

    static defaultProps = {
        className: "table table-hover",
        data: []
    }

    constructor(props) {
        super(props);

        this.state = ({
            data: this.props.data
        })
    }

    render() { 

        const headers = this.props.headers;
        const data = this.props.data;

        if (this.props.data.length === 0) {
            return null;
        }

        return (
            <table className={this.props.className}>
                <thead>
                    <tr className="text-white text-center">
                        {headers.map(h => <th className="font-weight-normal" key={"key_" + h}>{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map(d =>
                        <tr className="text-center">
                            <td>{d.name}</td>
                            <td>{d.weightage * 100 + "%"}</td>
                            <td>{d.maxMarks}</td>
                            <td>{d.date}</td>
                            <td><a href="/" className="text-primary"><i className="fas fa-edit"></i></a></td>
                            <td><a href="/" className="text-danger"><i className="fas fa-trash"></i></a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
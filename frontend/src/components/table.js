import React, { Component } from 'react';
import PropTypes from "prop-types";

class ObjectData extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        object: PropTypes.object.isRequired
    }

    render() {
        const object = this.props.object;

        return (
            <tr className="text-center">
                {Object.keys(object).map(function(key, _) {
                    return (
                        <td key={"key_" + key}>{object[key]}</td>
                    )
                })}
                <td key={"key_edit_" + this.props.object.id}><a href={`/edit/${this.props.type}/${object.id}`} className="text-primary"><i className="fas fa-edit"></i></a></td>
                <td key={"key_delete_" + this.props.object.id}><a href={`/delete/${this.props.type}/${object.id}`} className="text-danger"><i className="fas fa-trash"></i></a></td>
            </tr>
        )
    }
}

export class Table extends Component {
    static propTypes = {
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
        
        const data = this.props.data;

        if (this.props.data.length === 0) {
            return null;
        }

        return (
            <table className={this.props.className}>
                <thead>
                    <tr className="text-white text-center">
                        {
                            Object.keys(data[0]).map(function(key) {
                                return <th className="font-weight-normal" key={"key_" + key}>{key}</th>
                            })
                        }
                         <th className="font-weight-normal" key={"key_edit"}>Edit</th>
                         <th className="font-weight-normal" key={"key_delete"}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(d =>
                        <ObjectData object={d} type={this.props.type}/>
                    )}
                </tbody>
            </table>
        );
    }
}
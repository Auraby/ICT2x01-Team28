import React, { Component } from 'react';
import { Input } from '../components/input';
import { Panel } from '../components/panel';

export default class EditSubcomponent extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            name: "Subcomponent 1",
            maxMarks: 55,
            weightage: "10%",
        });
    }

    componentDidMount() {
        /* Use axios to update module list */
        const modules = ["ICT2101", "ICT2102", "ICT2103"];

        this.setState({
            id: this.props.match.params.id,
            modules: modules,
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() { 
        return (
            <Panel>
                <form onSubmit={this.handleSubmit} className="flexbox column">
                    <label className="display-1 text-white mb-4">Edit Subcomponent</label>
                    <Input value={this.state.name} disabled={this.state.disableInputs} name="name" type="text" label="Subcomponent Name" onChange={this.handleChange}/>
                    <Input value={this.state.maxMarks} disabled={this.state.disableInputs} name="maxMarks" type="text" label="Max Marks" onChange={this.handleChange}/>
                    <Input value={this.state.weightage} disabled={this.state.disableInputs} name="weightage" type="text" label="Weightage" onChange={this.handleChange}/>
                    <div className="flexbox">
                        <button type="submit" className="btn btn-danger">Delete</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </Panel>
        );
    }
}
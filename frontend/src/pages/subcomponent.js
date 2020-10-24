import React, { Component } from 'react';
import { Input } from '../components/input';
import { Dropdown } from '../components/dropdown';
import { Panel } from '../components/panel';
import { Table } from '../components/table';

export class AddSubcomponent extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            name: "",
            data: "",
            maxMarks: -1,
            weightage: -1.0,
            modules: [],
        })
    }

    componentDidMount() {
        /* Use axios to update module list */
        const modules = ["ICT2101", "ICT2102", "ICT2103"];

        this.setState({
            modules: modules
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
                    <label className="display-1 text-white mb-4">Add Assessment</label>
                    <Dropdown name="selectedModule" label="Select Module" options={this.state.modules} onChange={this.moduleChange}/>
                    <Input name="name" type="text" label="Assessment Name" onChange={this.handleChange}/>
                    <Input name="date" type="text" label="Assessment Date" onChange={this.handleChange}/>
                    <Input name="maxMarks" type="text" label="Max Marks" onChange={this.handleChange}/>
                    <Input name="weightage" type="text" label="Weightage" onChange={this.handleChange}/>
                    <div className="flexbox">
                        <button type="submit" className="btn btn-danger">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </Panel>
        );
    }
}
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
            assessments: [],
            disableInputs: true,
        });
    }

    componentDidMount() {
        /* Use axios to update module list */
        const modules = ["ICT2101", "ICT2102", "ICT2103"];

        this.setState({
            modules: modules
        });
    }

    moduleChange = (event) => {
        /* TODO: Use axios to update assessment dropdown */
        const assessments = ["Quiz 1", "Quiz 2", "Quiz 3"];

        this.setState({
            selectedModule: event.target.value,
            assessments: assessments
        });
    }

    assessmentChange = (event) => {
        this.setState({
            selectedAssessment: event.target.value,
            disableInputs: false
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
                    <label className="display-1 text-white mb-4">Add Subcomponent</label>
                    <Dropdown name="selectedModule" label="Select Module" options={this.state.modules} onChange={this.moduleChange}/>
                    <Dropdown name="selectedAssessment" label="Select Assessment" options={this.state.assessments} onChange={this.assessmentChange}/>
                    <Input disabled={this.state.disableInputs} name="name" type="text" label="Subcomponent Name" onChange={this.handleChange}/>
                    <Input disabled={this.state.disableInputs} name="maxMarks" type="text" label="Max Marks" onChange={this.handleChange}/>
                    <Input disabled={this.state.disableInputs} name="weightage" type="text" label="Weightage" onChange={this.handleChange}/>
                    <div className="flexbox">
                        <button type="submit" className="btn btn-danger">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </Panel>
        );
    }
}

export class ViewSubcomponent extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            modules: [],
            assessments: [],
            subcomponents: [],
            selectedModule: "",
            selectedAssessment: "",
        });
    }

    componentDidMount() {
        /* Use axios to update module list */
        const modules = ["ICT2101", "ICT2102", "ICT2103"];

        this.setState({
            modules: modules
        });
    }

    moduleChange = (event) => {
        /* TODO: Use axios to update assessment dropdown */
        const assessments = ["Quiz 1", "Quiz 2", "Quiz 3"];

        this.setState({
            selectedModule: event.target.value,
            assessments: assessments
        });
    }

    assessmentChange = (event) => {
        
        /* Dummy data for now */
        const subcomponents = [
            {
                    "name": "Subcomponent 1",
                    "weightage": 0.1,
                    "maxMarks": 100
                },
                {
                    "name": "Subcomponent 2",
                    "weightage": 0.2,
                    "maxMarks": 50
                },
                {
                    "name": "Subcomponent 3",
                    "weightage": 0.3,
                    "maxMarks": 75
                }
        ];

        this.setState({
            selectedAssessment: event.target.value,
            subcomponents: subcomponents
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() { 
        
        const headers = ["Name", "Weightage", "Max Marks", "Edit", "Delete"];

        return (
            <Panel>
                <div className="flexbox column">
                    <label className="display-1 text-white mb-4">View Subcomponents</label>
                    <Dropdown name="selectedModule" label="Select Module" options={this.state.modules} onChange={this.moduleChange}/>
                    <Dropdown name="selectedAssessment" label="Select Assessment" options={this.state.assessments} onChange={this.assessmentChange}/>
                    <Table headers={headers} data={this.state.subcomponents}/>
                </div>
            </Panel>
        );
    }
}
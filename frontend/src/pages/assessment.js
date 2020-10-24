import React, { Component } from 'react';
import { Input } from '../components/input';
import { Dropdown } from '../components/dropdown';
import { Panel } from '../components/panel';
import { Table } from '../components/table';

export class AddAssessment extends Component {
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

export class ViewAssessment extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            modules: [],
            assessments: [],
            selectedModule: "",
        });
    }

    componentDidMount() {
        /*
         * Make an API call to update the module dropdown
         
         axios.get(`url_to_rest_api`)
            .then(res => {
             const modules = res.data;
             this.setState({ modules: modules });
        })
        */
        const modules = ["ICT2101", "ICT2102", "ICT2103"];

        this.setState({
            modules: modules,
        });
    }

    moduleChange = () => {
        /* Dummy data for now */
        const assessments = [
                {
                    "name": "Quiz 1",
                    "weightage": "10%",
                    "date": "02/02/2020",
                    "maxMarks": 100,
                    "id": 1
                },
                {
                    "name": "Quiz 1",
                    "weightage": "20%",
                    "date": "02/02/2020",
                    "maxMarks": 50,
                    "id": 2
                },
                {
                    "name": "Quiz 1",
                    "weightage": "30%",
                    "date": "02/02/2020",
                    "maxMarks": 75,
                    "id": 3
                }
        ];

        this.setState({
            assessments: assessments
        });
    }

    render() { 
        return (
            <Panel>
                <label className="display-1 text-white mb-4">View Assessments</label>
                <Dropdown name="selectedModule" label="Select Module" options={this.state.modules} onChange={this.moduleChange}/>
                <Table data={this.state.assessments} type="assessment"/>
            </Panel>
        );
    }
}

export class EditAssessment extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            id: "",
            name: "",
            data: "",
            maxMarks: -1,
            weightage: -1.0,
        })
    }

    componentDidMount() {
        /* Use AXIOS to update state */

        this.setState({
            id: this.props.match.params.id
        })
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
                    <label className="display-1 text-white mb-4">Edit Assessment</label>
                    <Input value="Quiz 1" name="name" type="text" label="Assessment Name" onChange={this.handleChange}/>
                    <Input value="20/20/2020" name="date" type="text" label="Assessment Date" onChange={this.handleChange}/>
                    <Input value="100" name="maxMarks" type="text" label="Max Marks" onChange={this.handleChange}/>
                    <Input value="100%" name="weightage" type="text" label="Weightage" onChange={this.handleChange}/>
                    <div className="flexbox">
                        <button type="submit" className="btn btn-danger">Delete</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </Panel>
        );
    }
}
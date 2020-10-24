import React, { Component } from 'react';
// import axios from 'axios';
import { MyContext } from '../context/myContext';
import { Dropdown } from '../components/dropdown';
import { Panel } from '../components/panel';


/***********************************************************
 * Student Home Page can only view feedback 
***********************************************************/
export class StudentHome extends Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);

        this.state = ({
            modules: [],
            assessments: [],
            subcomponents: [],

            selectedModule: "",
            selectedAssessment: "",
            selectedSubcomponent: "",
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
        
        /* 
         * Dummy data for now
        */
        const modules = ["ICT2101", "ICT2102", "ICT2103"];

        this.setState({
            modules: modules,
        });
    }

    moduleChange = (event) => {
        /*
         * Make an API call to update the assessment dropdown

         axios.get(`url_to_rest_api`)
            .then(res => {
             const assessments = res.data;
        });
        */

        /* 
         * Dummy data for now
        */
        this.setState({
            selectedModule: event.target.value,
            assessments: ["Quiz 1", "Lab Quiz 1"]
        });
    }

    assessmentChange = (event) => {
        /*
         * Make an API call to update the subcomponent dropdown

         axios.get(`url_to_rest_api`)
            .then(res => {
             const c = res.data;
             this.setState({ assessments: assessments });
        })
        */

        /* 
         * Dummy data for now
        */
       this.setState({
            selectedAssessment: event.target.value,
            subcomponents: ["Section 1", "Section 2"]
        });
    }

    subcomponentChange = (event) => {
        this.setState({
            selectedSubcomponent: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <>
            <Panel>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="DrpModule" className="display-1 text-white">View Feedback</label>
                <Dropdown name="selectedModule" label="Select Module" options={this.state.modules} onChange={this.moduleChange}/>
                <Dropdown name="selectedAssessment" label="Select Assessment" options={this.state.assessments} onChange={this.assessmentChange}/>
                <Dropdown name="selectedSubcomponent" label="Select Subcomponent" options={this.state.subcomponents} onChange={this.subcomponentChange}/>
                <button type="submit" className="btn-primary btn">View</button>
                </form>
            </Panel>
            </>
        )
    }
}

export class ProfessorHome extends Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        ;
    }

    render() { 
        return (
            <>
            <div className="StudentHome-container">
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="DrpModule" className="login-title">Professor Home</label>
                </form>
            </div>
            </>
        );
    }
}
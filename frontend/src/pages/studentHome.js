import React from 'react';
import axios from 'axios';
import { MyContext } from '../context/myContext';
import { DropdownWithLabel } from '../components/dropdown';

export default class StudentHome extends React.Component {
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
            <div className="StudentHome-container">
                <div className="login-card">
                    <form onSubmit={this.handleSubmit}>
                    <label className="login-title">View Feedback</label>
                        <div class="form-group">
                            <DropdownWithLabel id="DrpModule" label="Select Module" className="form-control" options={this.state.modules} onChange={this.moduleChange}/>
                        </div>
                        <div class="form-group">
                            <DropdownWithLabel id="DrpAssessment" label="Select Assessment" className="form-control" options={this.state.assessments} onChange={this.assessmentChange}/>
                        </div>
                        <div class="form-group">
                            <DropdownWithLabel id="DrpSubcomponent" label="Select Subcomponent" className="form-control" options={this.state.subcomponents} onChange={this.subcomponentChange}/>
                        </div>
                        <button type="submit" className="btn-primary btn">View</button>
                    </form>
                </div>
            </div>
            </>
        )
    }
}
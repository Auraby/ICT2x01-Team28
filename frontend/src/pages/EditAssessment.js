import React, { Component } from 'react';
import { Input } from '../components/input';
import { Panel } from '../components/panel';

export default class EditAssessment extends Component {
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
                    <div className="flexbox flexbox-center mb-4">
                        <label className="display-1 text-white">Edit Assessment</label>
                        <a href="/add/feedback/1">
                            <i class="fas fa-comment-medical"></i>
                        </a>
                    </div>
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
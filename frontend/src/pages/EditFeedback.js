import React, { Component } from 'react';
import { Input, InputReadOnly } from '../components/input';
import { Panel } from '../components/panel';

export default class EditFeedback extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            students: [],
            selectedStudents: [],
            componentId: "",
            commentType: "",
            comment: "",
        });
    }

    componentDidMount() {
        /* Retrieve component ID from URL */
        this.setState({
            componentId: this.props.match.params.id
        });

        /* Use axios to update student list */
        /* Using dummy data for now */
        const students = [
            {
                "value": "1902619",
                "label": "1902619 --- Max"
            },
            {
                "value": "1902621",
                "label": "1902620 --- Alwin"
            },
            {
                "value": "1902622",
                "label": "1902621 --- Eugene"
            },
            {
                "value": "1902623",
                "label": "1902622 --- Linus"
            },
            {
                "value": "1902623",
                "label": "1902623 --- Dylan"
            },
        ];

        this.setState({
            students: students
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    selectChange = (option) => {
        console.log(option);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log(this.state.selectedStudents);
    }

    render() { 
        return (
            <Panel>
                <form onSubmit={this.handleSubmit} className="flexbox column">
                    <label className="display-1 text-white mb-4">Edit Feedback</label>
                    <Input disabled={true} value="ICT2101 - Quiz 1" label="Editing feedback for" name="" onChange={function() {}}/>
                    <InputReadOnly value={this.props.match.params.id} label="Target student" />
                    <Input textarea={true} name="comment" type="text" label="Comments" value="Old comments here" onChange={this.handleChange}/>
                    
                    <div className="flexbox">
                        <button type="reset" className="btn btn-danger">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </Panel>
        );
    }
}
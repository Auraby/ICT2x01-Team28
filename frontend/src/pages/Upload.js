import React, { Component } from 'react';
import { FileInput } from '../components/input';
import { Panel } from '../components/panel';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }

    fileChange = (event) => {
        this.setState({
            file: event.target.value
        });

        console.log(event.target.value);
    }
    
    componentDidMount() {
        ;
    }

    render() { 
        return (
            <Panel>
                <label className="display-1 text-white">
                    Upload
                </label>
                <form>
                    <FileInput />
                    <button type="submit" className="btn btn-primary mt-2">Upload</button>
                </form>
            </Panel>
        );
    }
}
 
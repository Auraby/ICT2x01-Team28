import React, { Component } from 'react';
import PropTypes from "prop-types";

export class Input extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        labelClassName: PropTypes.string,
        inputClassName: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
        disabled: PropTypes.bool
    }

    static defaultProps = {
        labelClassName: "text-light-2",
        inputClassName: "form-control",
        type: "text",
        value: "",
        disabled: false
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name} className={this.props.labelClassName}>{ this.props.label }</label>
                <input disabled={this.props.disabled} name={this.props.name} id={this.props.name} className={this.props.inputClassName} type={this.props.type} onChange={this.props.onChange} value={this.props.value}/>
            </div>
        )
    }
}

export class FileInput extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();
    }

    fileChange = (event) => {
        console.log(this.fileInput.current.files[0].name);
    }

    handleSubmit(event) {
      event.preventDefault();
      alert(
        `Selected file - ${this.fileInput.current.files[0].name}`
      );
    }
  
    render() {
      return (
        <div class="custom-file my-3">
            <input type="file" ref={this.fileInput} class="custom-file-input" id="fileInput" onChange={this.fileChange}/>
            <label class="custom-file-label text-white" for="fileInput">{this.fileInput.current === null ? "No file selected" : "test"}</label>
        </div>
      );
    }
  }
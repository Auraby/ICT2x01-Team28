import React, { Component } from 'react';
import PropTypes from "prop-types";

export class InputReadOnly extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        labelClassName: PropTypes.string,
        inputClassName: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired
          ]),
    }

    static defaultProps = {
        labelClassName: "text-light-2",
        inputClassName: "form-control",
        value: "",
    }

    render() {
        return (
            <div className="form-group">
                <label className={this.props.labelClassName}>{ this.props.label }</label>
                <input disabled={true} className={this.props.inputClassName} value={this.props.value}/>
            </div>
        )
    }
}

export class Input extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        labelClassName: PropTypes.string,
        inputClassName: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
          ]),
        disabled: PropTypes.bool,
        textarea: PropTypes.bool,
    }

    static defaultProps = {
        labelClassName: "text-light-2",
        inputClassName: "form-control",
        type: "text",
        value: "",
        disabled: false,
        textarea: false,
    }

    render() {

        const textarea = this.props.textarea;

        if (textarea) {
            return (
                <div className="form-group">
                    <label htmlFor={this.props.name} className={this.props.labelClassName}>{ this.props.label }</label>
                    <textarea disabled={this.props.disabled} name={this.props.name} id={this.props.name} className={this.props.inputClassName} type={this.props.type} onChange={this.props.onChange} value={this.props.value}/>
                </div>
            )
        } else {
            return (
                <div className="form-group">
                    <label htmlFor={this.props.name} className={this.props.labelClassName}>{ this.props.label }</label>
                    <input disabled={this.props.disabled} name={this.props.name} id={this.props.name} className={this.props.inputClassName} type={this.props.type} onChange={this.props.onChange} value={this.props.value}/>
                </div>
            )
        }
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
        <div className="custom-file my-3">
            <input type="file" ref={this.fileInput} className="custom-file-input" id="fileInput" onChange={this.fileChange}/>
            <label className="custom-file-label text-white" htmlFor="fileInput">{this.fileInput.current === null ? "No file selected" : "test"}</label>
        </div>
      );
    }
  }
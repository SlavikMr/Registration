import React from 'react';

export class FormGroup extends React.Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    this.props.onFieldChange(name, value);
  }

  handleBlur = (e) => {
    const { name } = e.target;
    this.props.onBlurChange(name);
  }

  render() {
    const { labelValue, name, type, value, placeholder, showError, errorMessage } = this.props;

    return (
      <div className="form-group">
        <label>{labelValue}
          <input
            name={name}
            type={type}
            value={value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            className="form-control"
            placeholder={placeholder}
            autoComplete="off"
          />
        </label>
        <small className="form-text">{showError && errorMessage}</small>
      </div>
    );
  }
}
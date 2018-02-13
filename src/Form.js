import React from 'react';
import cloneDeep from 'lodash.clonedeep';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FormGroup } from './FormGroup';
import {
  getError,
  minLengthValidator,
  requiredValidator,
  firstCharacterValidator,
  usernameValidator,
  passwordValidator,
} from './validators';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.regExp = {
      username: [/^[a-z]/i, /^[a-zA-Z0-9]+$/],
      password: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\/|!-]))/,
    };
    this.validators = {
      username: [
        requiredValidator,
        minLengthValidator(6),
        firstCharacterValidator(this.regExp.username[0]),
        usernameValidator(this.regExp.username[1]),
      ],
      password1: [
        requiredValidator,
        minLengthValidator(6),
        passwordValidator(this.regExp.password)
      ],
      password2: [
        requiredValidator,
        minLengthValidator(6),
        passwordValidator(this.regExp.password)
      ],
    };
    this.state = {
      username: { value: '', dirty: false, focused: false, error: '', showError: false },
      password1: { value: '', dirty: false, focused: false, error: '', showError: false },
      password2: { value: '', dirty: false, focused: false, error: '', showError: false },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading, message } = nextProps;
    if (message && !isLoading) alert(message);
  }

  componentDidMount() {
    this.validate(cloneDeep(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendFormData();
  }

  handleChange = (fieldName, value) => {
    const fields = cloneDeep(this.state);
    fields[fieldName].value = value;
    this.validate(fields, fieldName);
  };

  handleBlur = (fieldName) => {
    const field = this.state[fieldName];
    const { dirty, error } = field;
    const focused = true;
    const showError = error && (dirty || focused);
    this.setState({ [fieldName]: { ...field, focused, error, showError } });
  };

  validate(fields, changedField) {
    Object.entries(fields).forEach(([fieldName, data]) => {
      const { focused, dirty: fDirty } = data;
      const dirty = fieldName === changedField ? true : fDirty;
      const error = getError(fieldName, data.value, this.validators[fieldName], fields);
      const showError = error && (dirty || focused);
      fields[fieldName] = { ...data, error, dirty, showError };
    });
    this.setState(fields);
  }

  render() {
    const { username, password1, password2 } = this.state;
    const { isLoading, message } = this.props;
    const disabled = Object.values(this.state).some(field => field.error);

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          labelValue='Username'
          name='username'
          type='text'
          value={username.value}
          placeholder='Enter username'
          showError={username.showError}
          errorMessage={username.error}
          onFieldChange={this.handleChange}
          onBlurChange={this.handleBlur}
        />
        <FormGroup
          labelValue='Password'
          name='password1'
          type='text'
          value={password1.value}
          placeholder='Enter password'
          showError={password1.showError}
          errorMessage={password1.error}
          onFieldChange={this.handleChange}
          onBlurChange={this.handleBlur}
        />
        <FormGroup
          labelValue='Password again'
          name='password2'
          type='text'
          value={password2.value}
          placeholder='Confirm password'
          showError={password2.showError}
          errorMessage={password2.error}
          onFieldChange={this.handleChange}
          onBlurChange={this.handleBlur}
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading || disabled}>Send</button>
        <div>{isLoading && message}</div>
      </form>);
  }
}
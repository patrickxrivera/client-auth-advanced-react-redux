import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { signUpUser } from '../../redux/auth.js';

class SignUp extends Component {
  handleFormSubmit = (formProps) => {
    // Call action creator to sign up the user!
    console.log('HELLO');
    this.props.signUpUser(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  renderAlert() {
    if (this.props.errorMsg) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMsg}
        </div>
      );
    }
  }

  render() {
    const {
      handleSubmit,
      fields: { email, password, passwordConfirm }
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched &&
            email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} type="password" />
          {password.touched &&
            password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input
            className="form-control"
            {...passwordConfirm}
            type="password"
          />
          {passwordConfirm.touched &&
            passwordConfirm.error && (
              <div className="error">{passwordConfirm.error}</div>
            )}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign up!
        </button>
      </form>
    );
  }
}

const validate = (formProps) => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
};

const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMsg
});

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(connect(mapStateToProps, { signUpUser })(SignUp));

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInUser } from '../../redux/signIn.js';

class SignIn extends Component {
  handleFormSubmit = ({ email, password }) => {
    // Need to do something to log user in
    this.props.signInUser({ email, password });
  };

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(connect(null, { signInUser })(SignIn));

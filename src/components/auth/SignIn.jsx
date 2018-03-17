import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInUser } from '../../redux/auth.js';

class SignIn extends Component {
  handleFormSubmit = ({ email, password }) => {
    this.props.signInUser({ email, password }, () => {
      this.props.history.push('/feature');
    });
  };

  renderAlert = () => {
    if (this.props.errorMsg) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
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
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMsg
});

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(connect(mapStateToProps, { signInUser })(SignIn));

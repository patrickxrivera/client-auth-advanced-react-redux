import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../../redux/auth.js';

class SignOut extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}

export default connect(null, { signOutUser })(SignOut);

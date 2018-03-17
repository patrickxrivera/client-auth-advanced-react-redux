import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessage } from '../redux/auth.js';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return <div>{this.props.msg}</div>;
  }
}

function mapStateToProps(state) {
  return { msg: state.auth.msg };
}

export default connect(mapStateToProps, { fetchMessage })(Feature);

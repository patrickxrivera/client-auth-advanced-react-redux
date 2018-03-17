import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (ComposedComponent) => {
  class Authentication extends Component {
    PropTypes = {
      router: PropTypes.object
    };
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated };
  };
  return connect(mapStateToProps)(Authentication);
};

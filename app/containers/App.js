// @flow
import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

App.defaultProps = {
  children: {}
};

App.propTypes = {
  children: PropTypes.node
};

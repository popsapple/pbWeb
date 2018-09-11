// @flow
import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counterApp from '../reducers/reducers';

import Routes from '../routes';
const store = createStore(counterApp);

export default class Root extends Component {
  constructor({ history }) {
    super();
    this.history = history;
  }

  getChildContext(){
    return {
      store: this.props.store
    }
  }
  componentWillMount() {
    this.unsubscribe = store.subscribe(
      () => this.forceUpdate()
    )
  }
  componentWillUnMount() {
    this.unsubscribe();
  }

  render() {
    return (
      <ConnectedRouter store={store} history={this.history}>
        <Routes />
      </ConnectedRouter>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

Root.childContextTypes = {
  store: PropTypes.object.isRequired
}
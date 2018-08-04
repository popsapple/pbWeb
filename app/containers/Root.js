// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Routes from '../routes';

export default class Root extends Component {
  constructor({ store, history }) {
    super();

    this.store = store;
    this.history = history;
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}

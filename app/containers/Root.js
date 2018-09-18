// @flow
import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counterApp from '../reducers/reducers';
import { ipcMain, ipcRenderer } from 'electron';
import ErrorPage from './ErrorPage';

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
    ipcRenderer.send('root-loaded', 'Root');

    ipcRenderer.on('error-occurred', (event, args) => {
      console.log(this.history)
      this.history.push(args);
    });

    ipcRenderer.on('click-file', (event, arg) => {
      console.log(this.history)
      if(this.history.location.pathname != arg){
        this.history.push(arg)
      }
    })
  }

  componentWillUnMount() {
    this.unsubscribe();
  }

  render() {
    return (
      <ConnectedRouter store={store} history={this.history}>
        <Routes history={this.history} />
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
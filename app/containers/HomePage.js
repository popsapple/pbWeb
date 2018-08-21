// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import { Provider, connect } from 'react-redux';  
import SideComponent from '../components/SideComponent';
import SideInspector from '../components/SideInspector';
import { createStore } from 'redux';
import counterApp  from '../reducers/reducers';
import { findEditor }  from '../actions/actions';

const store = createStore(counterApp);

export default class HomePage extends Component {
  constructor(){
    super();
  };

  componentDidMount(){
    store.dispatch(findEditor(this.main));
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <SideComponent />
          <main ref={ref => {this.main = ref;}} className="col-md-8 col-xl-8 bd-content fr-content">
            <Home />
          </main>
          <SideInspector />
        </div>
      </div>
    );
  }
}

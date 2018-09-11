// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';  
import SideComponent from '../components/SideComponent';
import SideInspector from '../components/SideInspector';
import { SampleProvider } from '../context';

export default class HomePage extends Component {
  constructor(){
    super();
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
            <SideComponent />
            <main ref={ref => {this.main = ref;}} className="col-xs-9 col-sm-9 col-md-9 col-lg-9 bd-content fr-content">
              <Home />
            </main>
            <SideInspector />
        </div>
      </div>
    );
  }
}
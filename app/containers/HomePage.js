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
      <SampleProvider>
      <div className="container-fluid">
        <div className="row">
          <SideComponent />
          <main ref={ref => {this.main = ref;}} className="col-md-8 col-xl-8 bd-content fr-content">
            <Home />
          </main>
          <SideInspector />
        </div>
      </div>
      </SampleProvider>
    );
  }
}
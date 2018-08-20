// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import SideComponent from '../components/SideComponent';
import SideInspector from '../components/SideInspector';

export default class HomePage extends Component {
  render() {
    return (
      <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-2 sidebar">
          <SideComponent />
        </div>
        <main className="col-md-8 col-xl-8 bd-content">
          <Home />
        </main>
        <div className="col-md-2 inspector sidebar right">
          <SideInspector />
          </div>
      </div>
      </div>
    );
  }
}

// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import SideComponent from '../components/SideComponent';
import SideInspector from '../components/SideInspector';

export default class HomePage extends Component {
  constructor(){
    super();
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <SideComponent />
          <main className="col-md-8 col-xl-8 bd-content fr-content">
            <Home />
          </main>
          <SideInspector />
        </div>
      </div>
    );
  }
}

// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import SideComponent from './SideComponent';
import SideInspector from './SideInspector';

import 'bootstrap/dist/css/bootstrap.css';

export default class HomePage extends Component {
  render() {
    return (
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-2 py-md-3 pl-md-5 bd-sidebar">
            <SideComponent />
          </div>
          <main class="col-md-auto col-xl-8 py-md-3 pl-md-5 bd-content">
            <Home />
          </main>
          <div class="col-md-2 py-md-3 pl-md-5">
            <SideInspector />
          </div>
        </div>
      </div>
    );
  }
}

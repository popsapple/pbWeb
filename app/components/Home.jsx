// @flow
import React, { Component } from 'react';
import FrogEditor from './FrogEditor';
import SideComponent from './SideComponent'

import 'bootstrap/dist/css/bootstrap.css'

export default class Home extends Component {
   constructor(){
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };
  forceUpdateHandler(){
  console.log("forceUpdateHandler");
  	this.forceUpdate();
  }
  render() {
    return (
      <main class="col-md-auto col-xl-8 py-md-3 pl-md-5 bd-content">
        <FrogEditor pbUpdateHandler={this.forceUpdateHandler}/>
      </main>
    );
  }
}

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
        <div><FrogEditor pbUpdateHandler={this.forceUpdateHandler}/></div>
    );
  }
}

// @flow
import React, { Component } from 'react';
import { SampleConsumer } from '../context';

export default class ErrorPage extends Component {
   constructor(){
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };
  forceUpdateHandler(){
  	this.forceUpdate();
  }
  render() {
    return (
      <div>    
         404 Error
      </div>
    );
  }
}

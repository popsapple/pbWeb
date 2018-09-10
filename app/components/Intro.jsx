// @flow
import React, { Component } from 'react';
import SideComponent from './SideComponent';
import { SampleConsumer } from '../context';

export default class Intro extends Component {
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
        <SampleConsumer>
          {
            (sample) => (
              <div align="center">
                <h2> INTRO PAGE </h2>
              </div>
            )
          }
        </SampleConsumer>
        
      </div>
    );
  }
}

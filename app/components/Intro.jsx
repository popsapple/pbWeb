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
              <div>
                <h1> Intro Page </h1>
              </div>
            )
          }
        </SampleConsumer>
        
      </div>
    );
  }
}

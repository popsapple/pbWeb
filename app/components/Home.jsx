// @flow
import React, { Component } from 'react';
import FrogEditor from './FrogEditor';
import { SampleConsumer } from '../context';

export default class Home extends Component {
   constructor(){
    super();
    this.state = {
      refresh: true
    }
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };
  forceUpdateHandler(){
  	return this.forceUpdate();
  }
  render() {
    return (
      <div>
        <SampleConsumer>
          {
            (sample) => (
              <div><FrogEditor storelist={sample} pbUpdateHandler={this.forceUpdateHandler} /></div>
            )
          }
        </SampleConsumer>
        
      </div>
    );
  }
}

// @flow
import React, { Component } from 'react';
import FrogEditor from './FrogEditor';
import SideComponent from './SideComponent';

import { SampleConsumer } from '../context';

export default class Home extends Component {
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
              <div><FrogEditor storelist={sample} pbUpdateHandler={this.forceUpdateHandler} /></div>
            )
          }
        </SampleConsumer>
        
      </div>
    );
  }
}

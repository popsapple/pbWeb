// @flow
import React, { Component } from 'react';
import Intro from '../components/Intro';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';  
import SideComponent from '../components/SideComponent';
import SideInspector from '../components/SideInspector';
import { SampleProvider } from '../context';


export default class IntroPage extends Component {
  constructor(){
    super();
  };

  render() {
    return (
      <SampleProvider>
      <div className="container-fluid">
        <Intro/>
      </div>
      </SampleProvider>
    );
  }
}
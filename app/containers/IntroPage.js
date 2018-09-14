// @flow
import React, { Component } from 'react';
import Intro from '../components/Intro';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';  
import { SampleProvider } from '../context';
import { Link } from 'react-router-dom'

export default class IntroPage extends Component {
  constructor(){
    super();
  };

  render() {
    return (
      <SampleProvider>
      <div className="container-fluid">
        <Intro/>
        <Link to="homePage">새로운 파일을 만듭니다.</Link>
      </div>
      </SampleProvider>
    );
    
  }
}
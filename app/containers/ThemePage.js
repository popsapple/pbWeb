// @flow
import React, { Component } from 'react';
import MakeThemeUsingSass from '../components/MakeThemeUsingSass';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';  
import { SampleProvider } from '../context';


export default class ThemePage extends Component {
  constructor(){
    super();
  };

  render() {
    return (
      <div className="container-fluid">
        <MakeThemeUsingSass />
      </div>
    );
  }
}
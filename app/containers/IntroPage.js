// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { selectDocType } from './../actions/actions';
import { connect } from 'react-redux';
import { app, dialog, Menu, shell, ipcRenderer, BrowserWindow } from 'electron';
import CategoryList from './../components/CategoryList';

export default class IntroPage extends React.Component {

  constructor(){
    super();
    this.pbNew = this.pbNew.bind(this);
    
    this.state = {
      index: 0
    }
  };
  ChangeListMode(){
    this.setState({
      index: this.state.index+1
    },()=>{
      this.setState({
        index: this.state.index+1
      })
    })
  }

  pbNew(){
    ipcRenderer.send('send-new','IntroPage');    
  }

  render() {
    this.store = this.context;
    return (
      <div className="container-fluid category_select">
        <h2>안녕하세요 :)</h2>
        <h2>만드실 문서의 종류를 선택하세요</h2>
        <div>
          <CategoryList idx={this.state.index} ChangeMode={(()=>{this.ChangeListMode.bind(this)})}/>
          <button className="catetory_more" onClick={this.ChangeListMode.bind(this)}>더보기</button>
          <button to="homePage" onClick={this.pbNew}>시작하기</button>
        </div>
      </div>
    );
  }
}

IntroPage.contextTypes = {
    store: PropTypes.object
}
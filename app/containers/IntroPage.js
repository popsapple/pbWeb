// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { selectDocType } from './../actions/actions';
import { connect } from 'react-redux';
import { app, dialog, Menu, shell, ipcRenderer, BrowserWindow } from 'electron';

export default class IntroPage extends Component {
  constructor(){
    super();
    this.pbNew = this.pbNew.bind(this);
  };

  onSelectDocType(event){
    this.store.store.dispatch(selectDocType({docType: event.target.value}));
  }

  pbNew(){
    ipcRenderer.send('send-new','IntroPage');    
  }

  render() {
    this.store = this.context;
    return (
      <div className="container-fluid">
        <h2>만드실 문서의 종류를 선택해 주세요</h2>
        <ul>
          <li>
            <input type="radio" name="docType" defaultChecked id="docType01" value="NameCard" onChange={this.onSelectDocType.bind(this)} />
            <label htmlFor="docType01"></label>
            <h3>명함</h3>
          </li>
          <li>
            <input type="radio" name="docType" id="docType02" value="Pamphlet" onChange={this.onSelectDocType.bind(this)} />
            <label htmlFor="docType02"></label>
            <h3>팜플렛</h3>
          </li>
          <li>
            <input type="radio" name="docType" id="docType03" value="Sticker" onChange={this.onSelectDocType.bind(this)} />
            <label htmlFor="docType03"></label>
            <h3>스티커</h3>
          </li>
          <li>
            <input type="radio" name="docType" id="docType04" value="Tshirt" onChange={this.onSelectDocType.bind(this)} />
            <label htmlFor="docType04"></label>
            <h3>티셔츠</h3>
          </li>
        </ul>
        <button onClick={this.pbNew}>시작하기</button>
      </div>
    );
  }
}

IntroPage.contextTypes = {
    store: PropTypes.object
}
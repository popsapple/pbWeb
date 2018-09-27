// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { selectDocType } from './../actions/actions';
import { connect } from 'react-redux';
import CategoryList from './../components/CategoryList';

export default class IntroPage extends React.Component {
  constructor(){
    super();
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
  newFile(){
    console.log("intro new file in!!!")
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
          <Link to="homePage" className="goto_start" onClick={this.newFile.bind(this)}>시작하기</Link>
        </div>
      </div>
    );
  }
}

IntroPage.contextTypes = {
    store: PropTypes.object
}
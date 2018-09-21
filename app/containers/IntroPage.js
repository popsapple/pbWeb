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
      is_title: true
    }
  };
  ChangeListMode(){
    this.setState({
      is_title: !this.state.is_title
    },()=>{
      this.setState({
        is_title: this.state.is_title
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
        <CategoryList type={this.state.is_title} ChangeMode={(()=>{this.ChangeListMode.bind(this)})}/>
        <button onClick={this.ChangeListMode.bind(this)}>자세히 보기</button>
        <Link to="homePage" onClick={this.newFile.bind(this)}>시작하기</Link>
      </div>
    );
  }
}

IntroPage.contextTypes = {
    store: PropTypes.object
}
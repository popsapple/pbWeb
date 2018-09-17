import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';

export default class ThemeControllbutton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    clickTest(){
        alert('clickTest');
    }
	render(){
        this.store = this.context.store;
        return (
            <li>
                <span onClick={this.clickTest.bind(this)}>{this.props.nameKor}</span>
                <span onClick={this.clickTest.bind(this)}>{this.props.category}</span>
                <span onClick={this.clickTest.bind(this)}>{this.props.name}</span>
            </li>
        )
    }
}
ThemeControllbutton.contextTypes = {
    store: PropTypes.object
}
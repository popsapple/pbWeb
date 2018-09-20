import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';

export default class SearchThemeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    ChangeThemeIndex(e){
        console.log("change idx :: "+e.target.value);
        this.props.ChangeList(e.target.value);
    }

    render(){
        return (
            <select onChange={this.ChangeThemeIndex.bind(this)}>
                <option value="0">증권</option>
                <option value="1">결혼</option>
                <option value="2">학교</option>
            </select>
        )
    }
}
SearchThemeList.contextTypes = {
    store: PropTypes.object
}
SearchThemeList.PropTypes = {
    ChangeList: PropTypes.any
}
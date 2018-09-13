import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';

export default class ComponentLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
	render(){
        this.store = this.context;
        return (
            <li>
                <span>${this.props.nameKor}</span>
                <span>${this.props.category}</span>
                <span>${this.props.name}</span>
            </li>
        )
    }
}
ComponentLogo.contextTypes = {
    store: PropTypes.object
}
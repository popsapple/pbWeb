import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';


export default class TemplateListGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        console.log(nextProps);
    }
	render(){
        this.store = this.context;
        return (
            <ul>
                {
                    this.props.list.map((arr,idx)=>{
                        return (arr)
                    })
                }
            </ul>
        )
    }
}
TemplateListGroup.contextTypes = {
    store: PropTypes.object
}
TemplateListGroup.propTypes = {
    list: PropTypes.array
}
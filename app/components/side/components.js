import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import { connect } from 'react-redux';
import DropdownComponent from './DropdownComponent';
import ButtonToolbarComponent from './ButtonToolbarComponent';


export default class SideComponentList extends React.Component {
    constructor(props) {
        super(props);
    }
	
	render(){
        return (
            <ul>
            	<DropdownComponent />
            	<ButtonToolbarComponent/>
            </ul>
        )
    }
}
import React from 'react';
import SideComponentList from './components';
const components = new SideComponentList();
export default class SideComponentOther extends React.Component{

	componentWillMount(){

	}

    render(){

		let html = '';
        
        return(
        	<SideComponentList />
        )
    }
}
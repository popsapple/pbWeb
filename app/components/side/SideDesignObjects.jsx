import React from 'react';
import SideDesignObjectList from './SideDesignObjectList';
import SideDesignObjectTab from './SideDesignObjectTab';
export default class SideDesignObjects extends React.Component{

	componentWillMount(){

	}

    render(){

		let html = '';
        
        return(
        	<div>
	        	<SideDesignObjectTab />
	        	<SideDesignObjectList />
        	</div>
        )
    }
}
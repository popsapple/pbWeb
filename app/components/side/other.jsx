import React from 'react';
import SideComponentList from './components';
const components = new SideComponentList();
export default class SideComponentOther extends React.Component{

	componentWillMount(){

	}
	componentDidMount() {
	    components.ready();
	}

    render(){

		let html = '';
        
        return(
        	<ul dangerouslySetInnerHTML={{__html:
        		(()=>{
	            	components.list.map((item)=>{
	            		html += item.iconhml;
	            	})
	            	return html;
	            })()
        	}}>
            </ul>
        )
    }
}
import React from 'react';
import SideComponentData from './side/tagging';
import SideComponentPolygon from './side/polygon';
import SideComponentOther from './side/other';

export default class SideComponent extends React.Component{
    render(){
        return(
        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 sidebar">
            <div className="component_list">
            	<ul>
            		<SideComponentData />
            		<SideComponentPolygon />
            	</ul>
                <SideComponentOther />
            </div>
        </div>
        )
    }
}
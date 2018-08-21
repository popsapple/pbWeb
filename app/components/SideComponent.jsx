import React from 'react';
import SideComponentPreview from './side/preview';
import SideComponentData from './side/tagging';
import SideComponentPolygon from './side/polygon';
import SideComponentAccordion from './side/accordion';
import SideComponentTab from './side/tab';
import SideComponentSlider from './side/slider';

export default class SideComponent extends React.Component{
    render(){
        console.log("====================");
        console.log(this.props.maincontainer);
        return(
        <div className="col-md-2 sidebar">
            <div className="component_list">
            	<ul>
            		<SideComponentPreview maincontainer={this.props.maincontainer} />
            		<SideComponentData />
            		<SideComponentPolygon />
            		<SideComponentAccordion />
            		<SideComponentTab />
            		<SideComponentSlider />
            	</ul>
            </div>
        </div>
        )
    }
}
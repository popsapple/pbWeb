import React from 'react';
import SideComponentPreview from './side/preview';
import SideComponentData from './side/tagging';
import SideComponentPolygon from './side/polygon';
import SideComponentAccordion from './side/accordion';
import SideComponentTab from './side/tab';
import SideComponentSlider from './side/slider';

export default class SideComponent extends React.Component{
    render(){
        return(
            <div className="component_list">
            	<ul>
            		<SideComponentPreview />
            		<SideComponentData />
            		<SideComponentPolygon />
            		<SideComponentAccordion />
            		<SideComponentTab />
            		<SideComponentSlider />
            	</ul>
            </div>
        )
    }
}
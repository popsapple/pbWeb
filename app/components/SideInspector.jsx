import React from 'react';
import CompomentInfo from './inspector/CompomentInfo';
import WorkingTree from './inspector/WorkingTree';

export default class SideInspector extends React.Component{
    render(){
        return(
            <div className="component_list">
            	<button>Info</button>
            	<button>Tree</button>
            	<CompomentInfo />
            	<WorkingTree />
            </div>
        )
    }
}
import React from 'react';
import SideComponentOther from './side/other';
import SideCopiedComponent from './SideCopiedComponent';

export default class SideComponent extends React.Component{
    render(){
        return(
        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 sidebar">
            <div className="component_list">
                <ul>
                    <SideComponentOther />
                </ul>
                <SideCopiedComponent />
            </div>
        </div>
        )
    }
}
import React from 'react';
import SideDesignObjects from './side/SideDesignObjects';
export default class SideComponent extends React.Component{
    render(){
        return(
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 sidebar">
            <div className="component_list">
                <ul>
                    <SideDesignObjects />
                </ul>
            </div>
        </div>
        )
    }
}
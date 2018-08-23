import React from 'react';
import { ipcRenderer } from 'electron';

export default class SideComponentPolygon extends React.Component{
    render(){
        return(
            <li>
    			<button>도형</button>
    		</li>
        )
    }
}
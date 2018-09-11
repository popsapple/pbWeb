import React from 'react';
import ReactDOMServer from 'react-dom/server';
import SideCopiedComponent from './SideCopiedComponent';
import ComponentInterface from './ComponentInterface';
import DropdownComponent from './side/DropdownComponent';
import ButtonToolbarComponent from './side/ButtonToolbarComponent';
import Parser from 'html-react-parser';
import { ipcRenderer } from 'electron';

export default class SideComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [
                /*<DropdownComponent/>,
                <ButtonToolbarComponent/>,
                <ButtonToolbarComponent/>,
                <ButtonToolbarComponent/>,
                <DropdownComponent/>*/
            ]
        }
        this.component_type = "";
    }
    componentWillMount(){
        ipcRenderer.on('componentlist-draginsert', (event, arg) => {
           this.component_type = arg;
        });
    }
    DraggingComponent(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    SelectEditCompoment() {
        console.log("SelectEditCompoment");
        ipcRenderer.send('SelectEditCompoment', () => {console.log('bbb')});
    }
    DroppedComponent(event) {
        ipcRenderer.on('SelectEditCompoment', (event) => {
      console.log("DroppedComponentDroppedComponent");
    });
        let component_type = this.component_type;
        let components_list;
        switch(component_type){
            case "DropdownComponent": 
                this.setState(() => {
                    return {
                        components: [<DropdownComponent selectComponent={this.SelectEditCompoment} />, ...this.state.components]
                    }
                });
                break;
            case "ButtonToolbarComponent": 
                this.setState(() => {
                    return {
                        components: [<ButtonToolbarComponent selectComponent={this.SelectEditCompoment} />, ...this.state.components]
                    }
                });
                break;
            default :
                this.setState(() => {
                    return {
                        components: [<DropdownComponent selectComponent={this.SelectEditCompoment} />, ...this.state.components]
                    }
                });
                break;
        }
        event.preventDefault();
        event.stopPropagation();
    }
    render(){
        return(
            <ul key="component_list" onDragOver={this.DraggingComponent.bind(this)}
                onDrop={this.DroppedComponent.bind(this)}
                className="testingurl">
                {this.state.components}
            </ul>
        )
    }
}
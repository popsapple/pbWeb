import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ComponentOptionInterface from './ComponentOptionInterface';
const {ipcRenderer} = require('electron');

export default class CompomentInfo extends React.Component implements ComponentOptionInterface {
    constructor(props) {
        super(props);
        this.background = "red";
        this.border = "1px solid red";
        this.color = "blue";
        
        this.state = {
            background: this.background,
            border: this.border,
            color: this.color
        }
    }
    setComponentOption(params, event){
        var key = event.target.id;
        this.setState(()=>{
            return {
                key: event.target.value
            }
        });
    }
    getComponentOption(params, event){
        console.log(this.state);
    }
    render(){
        return(
            <div style={this.props.DataStyle}>
            	<ul>
            		<li>
            			<label for="background">배경색(기본)</label>
            			<input type="text" id="background" onKeyUp={this.getComponentOption.bind(this)} />
            		</li>
            		<li>
            			<label for="border">테두리색</label>
            			<input type="text" id="border" onKeyUp={this.getComponentOption.bind(this)} />
            		</li>
            		<li>
            			<label for="mouseover_background">글자색(마우스오버)</label>
            			<input type="text" id="mouseover_background" onKeyUp={this.getComponentOption.bind(this)} />
            		</li>
            	</ul>
                <button onClick={this.getComponentOption.bind(this)}>변경하기</button>
            </div>
        )
    }
}
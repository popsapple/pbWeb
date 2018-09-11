import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ComponentInterface from './../ComponentInterface';
import Parser from 'html-react-parser';
const {ipcRenderer} = require('electron');

export default class DropdownComponent extends React.Component implements ComponentInterface{
	constructor(props) {
        super(props);
        this.state = {
        	is_list: true,
        	opt: {
        		name: "dropdownMenu1",
        		group:[
        			[
        				{
        					label: 'Frist Group',
        					text: ["1Dropdown","2Dropdown","3Dropdown"],
        					link: ["#1","#2","#3"]
        				}
	        		]
        		]
        	}
        }

        this.id = "sample";
        this.type = "dropdown";
        this.iconhml = <li><button draggable="true" className="ComponentButton" onClick={this.ToggleActiveComponent.bind(this)} onDragStart={this.DragEvent.bind(this, 'start')}
        onDragEnd={this.DragEvent.bind(this, 'end')}>드롭다운</button></li>;
        this.html = "yes";
        this.style = {
        	width: 300+'px'
        }
    }

	InsertCompomentEditor(){
		return ipcRenderer.send('editor-drag', ReactDOMServer.renderToStaticMarkup(this.getComponentHtml()));
	}

    ToggleActiveComponent(event){
        if(this.props.selectComponent){
            this.props.selectComponent();
        }
        event.stopPropagation();
        event.preventDefault();
    }

	DragEvent(type, event){
		if(type == 'start'){
			ipcRenderer.send('componentlist-drag', 'DropdownComponent');
			this.InsertCompomentEditor(event);
			var img = document.createElement("img");
		    img.src = "";
		    event.dataTransfer.setDragImage(img, 0, 0);
		    return event;
		}else {
			event.preventDefault();
      		event.stopPropagation();
		    return event;
		}	
	}

    getComponentHtml(){
    	return(
        	<div className="dropdown component-wrap" data-component="dropdown">
			  <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
			    Dropdown
			    <span className="caret"></span>
			  </button>
			  {Parser((()=>{
        	  	let text_ = ``
        	  	this.state.opt.group.map((item)=>{
        	  		text_ += `<ul className="dropdown-menu" role="menu" aria-labelledby="${this.state.opt.name}">`
        	  		item[0].text.map((ele, idx)=>{
        	  			text_ += `<li role="presentation"><a role="menuitem" tabIndex="-1" href="${item[0].link[idx]}">${ele}</a></li>`
        	  		})
        	  		text_ += `</ul>`
        	  	})
        	  	return text_
        	  })())}
			</div>
        );
    }
    getIconHtml(){
    	return this.iconhml;
    }
    render(){
		if(this.state.is_list){
			return this.getIconHtml();
    	}else{
    		return this.getComponentHtml();
    	}
    }
}
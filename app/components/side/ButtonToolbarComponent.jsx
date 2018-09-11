import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import ComponentInterface from './../ComponentInterface';
import { dragEditorHtml, dropEditorHtml } from '../../actions/actions';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
const {ipcRenderer} = require('electron');

export default class ButtonToolbarComponent extends React.Component implements ComponentInterface {
	constructor(props) {
        super(props);
        this.state = {
        	is_list: true,
        	opt: {
        		group:[
        			[
        				{
        					label: 'Frist Group',
        					text: ["11111","2222","3333"],
        					link: ["#1","#2","#3"]
        				}
	        		],
	        		[
	        			{
        					label: 'Second Group',
        					text: ["4","5","6"],
        					link: ["#1","#2","#3"]
        				}
	        		]
        		]
        	}
        }
        this.store = "";
        this.id = "sample";
        this.type = "buttontoolbar";
        this.iconhml = <li><button draggable="true" className="ComponentButton" onDragStart={this.DragEvent.bind(this, 'start')}
        onDragEnd={this.DragEvent.bind(this, 'end')}>버튼툴바</button><button onClick={this.ToggleActiveComponent.bind(this)}>Check</button></li>;
        this.html = "yes";
        this.style = {
        	width: 300+'px'
        }
    }

	InsertCompomentEditor(){
            console.log(this.store.store.dispatch(dropEditorHtml(ReactDOMServer.renderToStaticMarkup(this.getComponentHtml()))).html);
        return this.store.store.dispatch(dropEditorHtml(ReactDOMServer.renderToStaticMarkup(this.getComponentHtml())));
		//return ipcRenderer.send('editor-drag', ReactDOMServer.renderToStaticMarkup(this.getComponentHtml()));
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
			ipcRenderer.send('componentlist-drag', 'ButtonToolbarComponent');
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
        	<div className="btn-toolbar component-wrap" data-component="toolbar" role="toolbar" aria-label="Group all">
        	  {Parser((()=>{
        	  	let text_ = ``
        	  	this.state.opt.group.map((item)=>{
        	  		text_ += `<div className="btn-group" role="group" aria-label="${this.state.opt.label}">`
        	  		item[0].text.map((ele)=>{
        	  			text_ += `<button type="button" className="btn btn-default">${ele}</button>`
        	  		})
        	  		text_ += `</div>`
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
        this.store = this.context;
    	if(this.state.is_list){
			return this.getIconHtml();
    	}else{
    		return this.getComponentHtml();
    	}
    }
}
ButtonToolbarComponent.contextTypes = {
    store: PropTypes.object
}
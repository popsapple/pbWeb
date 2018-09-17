import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';
import { dragEditorHtml, dropEditorHtml } from '../../actions/actions';

export default class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    DragEvent(type, event){
        if(type == 'start'){
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
    InsertCompomentEditor(){
        return this.store.dispatch(dropEditorHtml(ReactDOMServer.renderToStaticMarkup(this.getComponentHtml())));
    }
    getComponentHtml(){
        return(
            <div>
                <div className={this.props.type + " front template"} data-component="template">
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                </div>
                <div className={this.props.type + " back template"} data-component="template">
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                    <div class="layoutbox"><br/></div>
                </div>
            </div>
        );
    }
	render(){
        this.store = this.context.store;
        return (
            <li>
                <button draggable="true" onDragStart={this.DragEvent.bind(this, 'start')} onDragEnd={this.DragEvent.bind(this, 'end')}>{this.props.name}</button>
            </li>
        )
    }
}
TemplateList.contextTypes = {
    store: PropTypes.object
}
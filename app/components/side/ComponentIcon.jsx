import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';

export default class ComponentIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.iconhml = <li><button draggable="true" className="ComponentButton" onDragStart={this.DragEvent.bind(this, 'start')}
        onDragEnd={this.DragEvent.bind(this, 'end')}>아이콘</button></li>;
    }


    InsertCompomentEditor(){
        return this.store.dispatch(dropEditorHtml(ReactDOMServer.renderToStaticMarkup(this.getComponentHtml())));
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
            <img src="" />
        );
    }
    getIconHtml(){
        return this.iconhml;
    }
    render(){
        this.store = this.context.store;
        if(this.props.type.indexOf('is_title') != -1){
            return this.getIconHtml();
        }else{
            return this.getComponentHtml();
        }
    }
}
ComponentIcon.contextTypes = {
    store: PropTypes.object
}
ComponentIcon.propTypes = {
    type: PropTypes.string,
    key: PropTypes.number
}
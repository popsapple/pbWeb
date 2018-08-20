import React from 'react';
import CompomentInfo from './inspector/CompomentInfo';
import WorkingTree from './inspector/WorkingTree';

export default class SideInspector extends React.Component{
	constructor(){
    	super();
    	this.state = {
    		labal_draging: false
    	}
    };
    DragLabelTab(event){
    	this.setState({
    		labal_draging: true
    	});
    	console.log("드래그시작");
    }
    DragLabelUp(event){
    	this.setState({
    		labal_draging: false
    	});
    	console.log("드래그끝남");
    }
    DragLabelMove(event){
    	if(this.state.labal_draging){
    		let window_width = window.innerWidth;
    		console.log(event.clientX);
    		console.log("window_width "+window_width);
    		console.log(this.container);
    		this.container.style.width = window_width - event.clientX;
    	}
    }
    render(){
        return(
            <div ref={ref => {this.container = ref;}} className="component_list">
            	<button className="label" onMouseDown={this.DragLabelTab.bind(this)} onMouseLeave={this.DragLabelUp.bind(this)} onMouseUp={this.DragLabelUp.bind(this)} onMouseMove={this.DragLabelMove.bind(this)}>Label</button>
            	<button>Info</button>
            	<button>Tree</button>
            	<CompomentInfo />
            	<WorkingTree />
            </div>
        )
    }
}
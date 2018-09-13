import React from 'react';
import CompomentInfo from './inspector/CompomentInfo';
import WorkingTree from './inspector/WorkingTree';

export default class SideInspector extends React.Component{
	constructor(){
    	super();
    	this.state = {
    		labal_draging: false,
    		style: {},
            tab: {
                info: {display: 'none'},
                tree: {display: 'block'}
            }
    	}
    };
    DragLabelTab(event){
    	this.setState({
    		labal_draging: true
    	});
    	this.container.className = "col-xs-2 col-sm-2 col-md-2 col-lg-2 inspector sidebar right active";
    }
    DragLabelUp(event){
    	this.setState({
    		labal_draging: false
    	});
	    this.container.className = "col-xs-2 col-sm-2 col-md-2 col-lg-2 inspector sidebar right active";
    }
    DragLabelLeave(event){
    	setTimeout(f=>{
    		this.setState({
	    		labal_draging: false
	    	});
    	},700);
    	
    }
    DragLabelMove(event){
    	if(this.state.labal_draging){
    		let window_width = window.innerWidth;
    		if(window_width - (event.clientX) < (window.innerWidth/6)){
    			return false;
    		}
    		this.setState({
	    		style: {width: window_width - (event.clientX+10), maxWidth: window_width - (event.clientX+10)}
	    	});
    	}
    }
    ToggleInspector(type, event){
        if(type == 'info'){
            this.setState(()=>{
                return {
                    tab: {
                        info: {display: 'block'},
                        tree: {display: 'none'}
                    }
                }
            })
        }else{
            this.setState(()=>{
                return {
                    tab: {
                        info: {display: 'none'},
                        tree: {display: 'block'}
                    }
                }
            })
        }
    }
    render(){
        return(
        <div ref={ref => {this.container = ref;}} className="col-xs-2 col-sm-2 col-md-2 col-lg-2 inspector sidebar right" style={this.state.style}>
            <div className="component_list">
            	<button className="label" onMouseDown={this.DragLabelTab.bind(this)} onMouseLeave={this.DragLabelLeave.bind(this)} onMouseUp={this.DragLabelUp.bind(this)} onMouseMove={this.DragLabelMove.bind(this)}>Label</button>
            	<button onClick={this.ToggleInspector.bind(this, 'info')}>Info</button>
            	<button onClick={this.ToggleInspector.bind(this, 'tree')}>Tree</button>
            	<CompomentInfo DataStyle={this.state.tab.info} />
            	<WorkingTree DataStyle={this.state.tab.tree} />
            </div>
        </div>
        )
    }
}
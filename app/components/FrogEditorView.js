import React from 'react';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import { connect } from 'react-redux';
import { showEditorView, setEditorView } from '../actions/actions';

class FrogEditorView extends React.Component {
  constructor() {
    super();
    this.state = {
      labal_draging: false,
      style: {}
    }
  }

  DragLabelTab(event){
    this.setState({
      labal_draging: true
    });
  }
  DragLabelUp(event){
    this.setState({
      labal_draging: false
    });
  }
  DragLabelLeave(event){
    setTimeout(f=>{
      this.setState({
        labal_draging: false
      });
    },700);
    
  }
  DragLabelMove(event){
    event.stopPropagation();
    if(this.state.labal_draging){
      var offset_left = this.input.parentElement.getBoundingClientRect().left;
      console.log(offset_left);
      this.setState({
        style: {top: event.clientY-(this.input.offsetHeight/2),right: 'auto', left: event.clientX-offset_left-(this.input.offsetWidth/2)}
      });
    }
  }
  DragLabelSize(event){
    event.stopPropagation();
    if(this.state.labal_draging){
      var offset_left = this.input.parentElement.getBoundingClientRect().left;
      console.log("size 조절");
    }
  }

  render() {
    return (
      <div style={this.state.style} className='editorview' ref={ref => {this.input = ref; this.props.storelist.dispatch(setEditorView(this.input));}}  onMouseDown={this.DragLabelTab.bind(this)} onMouseLeave={this.DragLabelLeave.bind(this)} onMouseUp={this.DragLabelUp.bind(this)} onMouseMove={this.DragLabelMove.bind(this)}>
        <button class="sizecontroll"  onMouseDown={this.DragLabelTab.bind(this)} onMouseLeave={this.DragLabelLeave.bind(this)} onMouseUp={this.DragLabelUp.bind(this)} onMouseMove={this.DragLabelSize.bind(this)}></button>
        <FroalaEditorView
          model={this.props.model}
        />
      </div>
    );
  }
}
export default FrogEditorView;

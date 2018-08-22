import React from 'react';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import { connect } from 'react-redux';
import { showEditorView, setEditorView } from '../actions/actions';

class FrogEditorView extends React.Component {
  constructor() {
    super();
    this.state = {
      labal_draging: false,
      size_draging: false,
      style_inside: {},
      style: {}
    }
    this.parent_width = 0;
    this.view_width = 0;
    this.inner_scale = 0;
    this.zoom_scale = 0;
  }

  InnerScale(zoom_type){
    this.view_width = this.props.storelist.getState().default.editor_view.offsetWidth || 300;
    this.parent_width = this.props.storelist.getState().default.editor_view.parentElement.offsetWidth;

    let scale = `scale(${(this.view_width / this.parent_width)})`;

    if(zoom_type == 'in'){
      this.zoom_scale += 0.1;
      scale = `scale(${(this.view_width / this.parent_width)+this.zoom_scale})`;
    }
    if(zoom_type == 'out'){
      this.zoom_scale -= 0.1;
      this.zoom_scale < 0 ? this.zoom_scale = 0 : '';
      scale = `scale(${(this.view_width / this.parent_width)+this.zoom_scale})`;
    }

    this.setState({
      style_inside: Object.assign({...this.state.style_inside}, {width: this.parent_width, transform: `${scale}`})
    });

    return (this.view_width / this.parent_width);
  }

  DragLabelTab(event){
    event.stopPropagation();
    this.setState({
      labal_draging: true
    });
  }
  DragLabelUp(event){
    event.stopPropagation();
    this.setState({
      labal_draging: false
    });
  }
  DragLabelLeave(event){
    event.stopPropagation();
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
        style: Object.assign({...this.state.style}, {top: event.clientY-(this.input.offsetHeight/2), left: event.clientX-offset_left-(this.input.offsetWidth/2)})
      });
    }
  }
  

  DragSizeTab(event){
    event.stopPropagation();
    this.setState({
      size_draging: true
    });
  }
  DragSizeUp(event){
    event.stopPropagation();
    this.setState({
      size_draging: false
    });
  }
  DragSizeLeave(event){
    event.stopPropagation();
    setTimeout(f=>{
      this.setState({
        size_draging: false
      });
    },700);
    
  }
  DragLabelSize(event){
    event.stopPropagation();
    if(this.state.size_draging){
      this.zoom_scale = 0;
      var offset_left = this.input.getBoundingClientRect().left;
      var offset_top = this.input.getBoundingClientRect().top;
      this.setState({
        style: Object.assign({...this.state.style}, {width: event.pageX-offset_left+20, height: event.pageY-offset_top+20})
      });
      this.inner_scale = this.InnerScale();
    }
  }

  componentDidMount(){
    this.inner_scale = this.InnerScale();
  }
  render() {
    return (
      <div draggable='false' style={this.state.style} className='editorview' ref={ref => {this.input = ref; this.props.storelist.dispatch(setEditorView(this.input));}}  onMouseDown={this.DragLabelTab.bind(this)} onMouseLeave={this.DragLabelLeave.bind(this)} onMouseUp={this.DragLabelUp.bind(this)} onMouseMove={this.DragLabelMove.bind(this)}>
        <button className="sizecontroll" ref={ref => {this.controller = ref;}} onMouseDown={this.DragSizeTab.bind(this)} onMouseLeave={this.DragSizeLeave.bind(this)} onMouseUp={this.DragSizeUp.bind(this)} onMouseMove={this.DragLabelSize.bind(this)}></button>
        <div className="fr-view-inner">
          <div style={this.state.style_inside}  className="fr-view-inside">
            <FroalaEditorView model={this.props.model} />
          </div>
        </div>
        <button className="zoomin" onMouseDown={()=>{event.stopPropagation();this.setState({size_draging: false,labal_draging: false});this.InnerScale('in')}}>+</button>
        <button className="zoomout" onMouseDown={()=>{event.stopPropagation();this.setState({size_draging: false,labal_draging: false});this.InnerScale('out')}}>-</button>
      </div>
    );
  }
}
export default FrogEditorView;

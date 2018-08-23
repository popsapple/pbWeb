import React from 'react';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import { connect } from 'react-redux';
import { showEditorView, setEditorView } from '../actions/actions';
import { ipcRenderer } from 'electron';

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

    ipcRenderer.on('preview-open', (event, filename) => {
      console.log("AA");
      if(document.getElementById("FrogEditorView").className.indexOf("active") != -1){
        document.getElementById("FrogEditorView").className = document.getElementById("FrogEditorView").className.replace(" active", "");
      }else{
        document.getElementById("FrogEditorView").className += " active";
      }
    });
  }

  InnerScale(zoom_type){
    this.view_width = this.input.parentElement.offsetWidth || 300;
    this.parent_width = this.input.parentElement.offsetWidth;

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
  componentDidMount(){
    this.inner_scale = this.InnerScale();
  }
  render() {
    return (
      <div draggable='false' style={this.state.style} className='editorview' id='FrogEditorView' ref={ref => {this.input = ref;}}>
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

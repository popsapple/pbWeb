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
      style: {},
      iframe_style: {
        position: "absolute", width: "100%", height: "100vh", border: "0px"
      }
    }
    this.parent_width = 0;
    this.view_width = 0;
    this.inner_scale = 0;
    this.zoom_scale = 0;

    ipcRenderer.on('preview-open', (event, filename) => {
      if(document.getElementById("FrogEditorView").className.indexOf("active") != -1){
        document.getElementById("FrogEditorView").className = document.getElementById("FrogEditorView").className.replace(" active", "");
      }else{
        document.getElementById("FrogEditorView").className += " active";
        document.getElementById('preivew').contentWindow.document.open();
        document.getElementById('preivew').contentWindow.document.write("<br />");

        const myFirstPromise = new Promise((resolve, reject) => {
          try{
            document.getElementById('preivew').contentWindow.document.write(this.props.model);
            resolve(); // fulfilled 
          }catch(err){
            console.log(err);
            reject("failure reason"); // rejectedpreview-
          }
        });

        myFirstPromise.then(()=>{
          this.props.config.iframeStyleFiles.forEach((arr,idx)=>{
            var cssLink = document.createElement("link") 
            cssLink.href = arr; 
            cssLink .rel = "stylesheet"; 
            cssLink .type = "text/css"; 
            document.getElementById('preivew').contentWindow.document.head.appendChild(cssLink);
          });
        }).then(()=>{
          this.props.config.iframeScriptFiles.forEach((arr,idx)=>{
            console.log("props");
            setTimeout(()=>{
              var jsLink = document.createElement("script") 
              jsLink.src = arr; 
              jsLink .type = "text/javascript"; 
              document.getElementById('preivew').contentWindow.document.head.appendChild(jsLink);
            },100*idx);
          });
        });

        document.getElementById('preivew').contentWindow.document.close();
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
      style_inside: Object.assign({...this.state.style_inside}, {transform: `${scale}`})
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
          <div style={this.state.style_inside} className="fr-view-inside">
            <iframe id='preivew' style={this.state.iframe_style} />
          </div>
        </div>
        <button className="zoomin" onMouseDown={()=>{event.stopPropagation();this.setState({size_draging: false,labal_draging: false});this.InnerScale('in')}}>+</button>
        <button className="zoomout" onMouseDown={()=>{event.stopPropagation();this.setState({size_draging: false,labal_draging: false});this.InnerScale('out')}}>-</button>
      </div>
    );
  }
}
export default FrogEditorView;

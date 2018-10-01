import React from 'react';
import { ipcMain, ipcRenderer, dialog } from 'electron';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/js/plugins/inline_style.min';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/js/plugins/paragraph_style.min';
import 'froala-editor/js/plugins/forms.min';
import 'froala-editor/js/plugins/link.min';

import 'froala-editor/js/languages/ko';

import fs from 'fs-extra';

import ReactFroalaWysiwyg from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FrogEditorView from './FrogEditorView';

import { connect } from 'react-redux';
import { FrogEditorStyles } from './FrogEditorStyles';

import PropTypes from 'prop-types';
import { dragEditorHtml, dropEditorHtml } from '../actions/actions';

class FrogEditor extends React.Component {
  constructor(props, context) {
    super();

    this.state = {
      model: '<div><br /></div>',
      csslist: [],
      jslist: [],
      createFileOk: true,
      dirname: __dirname.replace("/app","").replace("\app","")
    };

    this.editor;

    this.config = {
      model: "<div class='default_box'>hello</div>",
      reactIgnoreAttrs: ['class', 'id'],
      language: 'ko',
      dragInline : true,
      htmlUntouched : true,
      codeMirror: window.CodeMirror,
      fullPage: true,
      toolbarSticky: false,
      quickInsertButtons: ['image', 'table'],
      lineBreakerTags: [
        'table',
        'hr',
        'form',
        'div',
        'img',
        'tr',
        'td',
        'span' //a
      ],
      htmlRemoveTags : [ 'script' , 'style' , 'link' ] ,
      paragraphStyles: FrogEditorStyles,
      iframeScriptFiles: [],
      iframeStyleFiles: this.state.csslist,
      htmlDoNotWrapTags: ['input', 'style', 'script', 'img'],
      htmlAllowedEmptyTags: ['style', 'script'],
      toolbarButtons: ['undo', 'redo' , '|', 'bold', 'italic', 'underline', 'color', 'fontSize', 'fontFamily', 'align', 'insertImage', 'url', 'insertLink', 'paragraphStyle', 'strikeThrough', 'insertTable', 'html'],
      toolbarButtonsXS: ['undo', 'redo' , '-', 'bold', 'italic', 'underline'],
      lineBreakerOffset: 50,
      height: 600,
      toolbarVisibleWithoutSelection: true,
      pluginsEnabled: ['align', 'codeBeautifier', 'codeView', 'colors', 'emoticons', 'fontFamily', 'fontSize', 'image', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'table', 'url', 'video', 'wordPaste'],
      events: {
        'froalaEditor.initialized': (e, editor) => {
          this.editor = editor;
          this.darg_point = "";
          this.editor.selected_item = "";
          this.insert_html = "";

          editor.events.on('dragover',dragEvent => {
            this.insert_html = this.store.store.dispatch(dragEditorHtml()).html;
            // Focus at the current posisiton.
            editor.markers.insertAtPoint(dragEvent.originalEvent);
            var $marker = editor.$el.find('.fr-marker');
            var $drag_point = editor.$el.find('.fr_drag_point');
            $marker.replaceWith($.FroalaEditor.MARKERS);
            editor.selection.restore();

            // Insert HTML.
            if($drag_point) {
              $drag_point.remove();
            }
            editor.html.insert("<span class='fr_drag_point'>drop here</span>");

            // Stop event propagation.
            dragEvent.preventDefault();
            dragEvent.stopPropagation();
            return false;
          });

          editor.events.on('mouseup', (e, editor_, keydownEvent) => {
            try {pb_selected_img ? pb_selected_img = false : '';}catch(err){}
            editor.$el.find('.fr-selected') ?  editor.$el.find('.fr-selected').removeClass("fr-selected") : "";
            var $marker = editor.$el.find('.fr-marker');
            $marker.replaceWith($.FroalaEditor.MARKERS);
            this.editor.selected_item = editor.selection.element();
            editor.selection.restore();
            this.editor.selected_item ?  $(this.editor.selected_item).addClass("fr-selected") : "";
          });

          editor.events.on('dragstart',(ev,id) => {
            return false;
          })

          editor.events.on('drop', dropEvent => {
            // Focus at the current posisiton.
            editor.markers.insertAtPoint(dropEvent.originalEvent);
            var $marker = editor.$el.find('.fr-marker');
            $marker.replaceWith($.FroalaEditor.MARKERS);
            editor.selection.restore();
            // Insert HTML.

            var $drag_point = editor.$el.find('.fr_drag_point');
            if($drag_point) {
              $drag_point.remove();
            }
            editor.html.insert(this.insert_html);

            if (!editor.undo.canDo()) editor.undo.saveStep();
            dropEvent.preventDefault();
            editor.undo.saveStep();
            // Stop event propagation.
            dropEvent.stopPropagation();
            return false;
          }, true)
        }
      }
    };

    this.key_item = 0;
    this.handleManualController = this.handleManualController.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  componentWillMount() {
    ipcRenderer.on('new-file', (event, filename) => {
      this.makeFileIntoEditor(filename);
    });

    ipcRenderer.on('file-open', (event, htmlcode) => {
      this.readFileIntoEditor(htmlcode);
    });

    ipcRenderer.on('resources-open', (event, dirPath, cssfile, jsfile) => {
      this.readResourcesFile(dirPath, cssfile, jsfile);
    });

    ipcRenderer.on('html-save', (event, filename, cssArr, jsArr, saveMessage) => {
      this.saveHTML(filename, cssArr, jsArr, saveMessage);
    });
  }

  handleModelChange(model) {
    this.setState({
      model: model
    });
  }

  handleManualController(item) {
    console.log("handleManualController");
    this.config.iframeStyleFiles = [...this.state.csslist, `file://${this.state.dirname}/resources/css/bootstrap.css`];
    this.config.iframeScriptFiles = [...this.state.jslist, `file://${this.state.dirname}/resources/js/jquery.js`, `file://${this.state.dirname}/resources/js/bootstrap.js`];
    item.initialize(this.config);
  }

  makeFileIntoEditor = theFileEntry => {
    var htmlcode = fs.readFileSync(theFileEntry.toString());
    if(htmlcode){
      this.handleModelChange(htmlcode.toString());
    }else {
      console.log("FrogEditor : new file error");
    }
  };

  readFileIntoEditor = htmlcode => {
    this.handleModelChange(htmlcode.toString())
  };

  readCSSIntoEditor = theFileEntry => {

    try{
      var cssCode = fs.readFileSync(theFileEntry.toString());
      if(cssCode){
        this.setState({
          csslist: [...this.state.csslist, theFileEntry.toString()]
        });
        this.config.iframeStyleFiles = this.state.csslist;
        this.key_item += 1;
        if(this.props){
          this.props.pbUpdateHandler();
        }else{
        }
      }else {
        console.log("FrogEditor : read css error");
      }
    }catch(err){
      console.log("readCSSIntoEditor error => "+err);
    }
    
  };

  readJSIntoEditor = theFileEntry => {
    try{
      var jsCode = fs.readFileSync(theFileEntry.toString());
      if(jsCode){
        this.setState({
          jslist: [...this.state.jslist, theFileEntry.toString()]
        });
        this.config.iframeScriptFiles = this.state.jslist;
        this.key_item += 1;
        if(this.props){
          this.props.pbUpdateHandler();
        }else{
        }
      }else {
        console.log("FrogEditor : read js error");
      }
    }catch(err){
      console.log("readJSIntoEditor error => "+err);
    }    
  };

  readResourcesFile = (dirPath, cssfile, jsfile) => { 
    if(!dirPath && !cssfile && !jsfile){
      try{
        this.editor.destroy();
      }catch(err){
        console.log("destroy err 01 => "+err);
      }
    } else{
      this.setState({
        csslist: [],
        jslist: []
      });
  
      try{
        this.editor.destroy();
      }catch(err){
        console.log("destroy err => "+err);
      }
  
      for(let i=0; i<cssfile.length; i++){
        try {
          fs.accessSync(dirPath+cssfile[i], fs.constants.R_OK | fs.constants.W_OK);
          this.readCSSIntoEditor(dirPath+cssfile[i]); //err
        } catch (err) {
          console.log("===== readResourcesFile readCSSIntoEditor error =====")
          console.log(err)
          alert("리소스 경로가 올바르지 않습니다.")
          return false;
        }
      }
  
      for(let i=0; i<jsfile.length; i++){
        try {
          fs.accessSync(dirPath+jsfile[i], fs.constants.R_OK | fs.constants.W_OK);
          this.readJSIntoEditor(dirPath+jsfile[i]); //err
        } catch (err) {
          console.log("===== readResourcesFile readJSIntoEditor error =====")
          console.log(err)
          alert("리소스 경로가 올바르지 않습니다.")
          return false;
        }
      }
    }
  }

  saveHTML = (theFileEntry, cssArr, jsArr, saveMessage) => {
    console.log("theFileEntry: "+theFileEntry) //folder path
    var html = this.state.model.toString();
    var head = html.split("</head>")
    var resourcesTagCode = (head[0]+cssArr+jsArr).replace(/(,)/g,'');
    var insertTagHTML = resourcesTagCode+"</head>"+head[1];

    var write = fs.writeFileSync(theFileEntry+'/index.html', insertTagHTML, {overwrite: true})
    if(write == undefined){
      alert("저장되었습니다.")
    } else{
      console.log(`save failed: ${err}`);
    }
  };

  render() {
    this.store = this.context;
    return (
      <div>
        <ReactFroalaWysiwyg
          key={this.key_item}
          config={this.config}
          model={this.state.model}
          onModelChange={this.handleModelChange}
          onManualControllerReady={this.handleManualController}
        />
        <FrogEditorView model={this.state.model} config={this.config} />
      </div>
    );
  }
}
export default FrogEditor;

FrogEditor.contextTypes = {
    store: PropTypes.object
}

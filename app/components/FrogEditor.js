import React from 'react';
import { ipcRenderer, dialog } from 'electron';
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
  constructor() {
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
      paragraphStyles: FrogEditorStyles,
      iframeScriptFiles: [],
      iframeStyleFiles: this.state.csslist,
      htmlDoNotWrapTags: ['input', 'style', 'script', 'img'],
      htmlAllowedEmptyTags: ['style', 'script'],
      lineBreakerOffset: 50,
      height: 600,
      toolbarVisibleWithoutSelection: true,
      pluginsEnabled: ['align', 'codeBeautifier', 'codeView', 'colors', 'emoticons', 'fontFamily', 'fontSize', 'image', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'table', 'url', 'video', 'wordPaste'],
      events: {
        'froalaEditor.initialized': (e, editor) => {
          this.editor = editor;
          this.darg_point = "";
          this.editor.selected_item = "";
          this.insert_html = this.store.store.dispatch(dragEditorHtml()).html;

          editor.events.on('dragover',dragEvent => { 
            this.insert_html = this.store.store.dispatch(dragEditorHtml()).html;
            console.log("dragover :: "+this.insert_html);
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
            console.log("drop :: "+this.insert_html);
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
    ipcRenderer.send('editor-loaded', 'FrogEditor');

    ipcRenderer.on('new-file', (event, filename) => {
      this.makeFileIntoEditor(filename);
    });

    ipcRenderer.on('file-open', (event, filename) => {
      this.readFileIntoEditor(filename);
    });

    ipcRenderer.on('js-open', (event, filename) => {
      this.readJSIntoEditor(filename);
    });

    ipcRenderer.on('css-open', (event, filename) => {
      this.readCSSIntoEditor(filename);
    });

    ipcRenderer.on('html-save', (event, filename, saveMessage) => {
      this.saveHTML(filename, saveMessage);
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
    fs.readFile(theFileEntry.toString(), (err, data) => {
      if (err) {
        console.log(`Read failed: ${err}`);
      } else {
        var htmlCode = data.toString()
        this.handleModelChange(htmlCode);
      }
    });
  };

  
  readFileIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      var htmlCode = data.toString()
      if (err) {
        console.log(`Read failed: ${err}`);
      } else {
        this.handleModelChange(String(data));

      }
    });
  };

  readCSSIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      console.log("read css : "+theFileEntry.toString())

      if (err) {
        console.log(`Read failed: ${err}`);
      } else {
        this.setState({
          csslist: [...this.state.csslist, theFileEntry.toString()]
        });
        this.key_item += 1;
        this.config.iframeStyleFiles = this.state.csslist;
        this.props.pbUpdateHandler();
      }
    });
  };

  readJSIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      if (err) {
        console.log(`Read failed: ${err}`);
      } else {
        this.setState({
          jslist: [...this.state.jslist, theFileEntry.toString()]
        });
        this.key_item += 1;
        this.config.iframeScriptFiles = this.state.jslist;
        this.props.pbUpdateHandler();
      }
    });
  };

  saveHTML = (theFileEntry, saveMessage) => {
    setTimeout(()=>{
      console.log("theFileEntry: "+theFileEntry)
      fs.writeFile(theFileEntry+'/index.html', this.state.model, (err) => {
        if(err) console.log(`Read failed: ${err}`);
        console.log("saveMessage : "+saveMessage)
      });      
    },500)
    if(saveMessage){
      alert("저장되었습니다.")
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
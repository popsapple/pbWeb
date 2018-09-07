import React from 'react';
import { ipcRenderer } from 'electron';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/js/languages/ko';

import fs from 'fs-extra';

import ReactFroalaWysiwyg from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FrogEditorView from './FrogEditorView';

import { connect } from 'react-redux';
import { showEditorView, setEditorView } from '../actions/actions';

class FrogEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      model: '',
      csslist: [],
      jslist: [],
      createFileOk: true,
      dirname: __dirname.replace("/app","").replace("\app","")
    };

    this.editor;
    this.insert_html;
    
    this.config = {
      charCounterCount: false,
      model: "<div class='default_box'>hello</div>",
      reactIgnoreAttrs: ['class', 'id'],
      language: 'ko',
      codeMirror: window.CodeMirror,
      fullPage: true,
      iframeDefaultStyle: ``,      
      quickInsertButtons: ['image', 'table'],
      lineBreakerTags: [
        'table',
        'hr',
        'form',
        'div',
        'img',
        'tr',
        'td',
        'span'
      ],
      iframeStyleFiles: this.state.csslist,
      iframeScriptFiles: [],
      htmlAllowedEmptyTags: ['style', 'script'],
      lineBreakerOffset: 50,
      height: 600,
      theme: 'royal',
      events: {
        'froalaEditor.initialized': (e, editor) => {
          console.log('editor 초기화됨')
          this.editor = editor;
          this.mouse_x = "";
          this.mouse_y = "";
          this.darg_point = "";

          ipcRenderer.on('editor-draginsert', (e, arg) => {
            this.insert_html = arg;
          })

          editor.events.on('dragover',dragEvent => {  
              this.mouse_x = dragEvent.offsetX;
              this.mouse_y = dragEvent.offsetY;
              // Focus at the current posisiton.
              editor.markers.insertAtPoint(dragEvent.originalEvent);
              var $marker = editor.$el.find('.fr-marker');
              var $drag_point = editor.$el.find('.fr_drag_point');
              $marker.replaceWith($.FroalaEditor.MARKERS);
              editor.selection.restore();

              // Save into undo stack the current position.
              if (!editor.undo.canDo()) editor.undo.saveStep();

              // Insert HTML.
              if($drag_point) {
                $drag_point.remove();
              }
              editor.html.insert("<span class='fr_drag_point'>drop here</span>");

              // Save into undo stack the changes.
              editor.undo.saveStep();

              // Stop event propagation.
              dragEvent.preventDefault();
              dragEvent.stopPropagation();
              return false;
          })
          editor.events.on('keydown', (e, editor_, keydownEvent) => {
            // Do something here.
            console.log("keydown :: "+e.keyCode);
            if(e.keyCode == 13 && e.ctrlKey){
              // Focus at the current posisiton.
            var $marker = editor.$el.find('.fr-marker');
            $marker.replaceWith($.FroalaEditor.MARKERS);
            editor.selection.restore();

            if (!editor.undo.canDo()) editor.undo.saveStep();
            // Save into undo stack the current position.

            // Insert HTML.
            //editor.html.insert("<div>break!!</div>");
            editor.markers.insertAtPoint($marker.closest(".container"));
            editor.html.insert("<div>break!!</div>", true);

            // Save into undo stack the changes.
            editor.undo.saveStep();

            }
          });
          editor.events.on('dragstart',(ev,id) => {  
            if(id) { 
              ev.nativeEvent.dataTransfer.setData('id', id)
            }
          })

          editor.events.on('drop', dropEvent => {
            // Focus at the current posisiton.
            editor.markers.insertAtPoint(dropEvent.originalEvent);
            var $marker = editor.$el.find('.fr-marker');
            $marker.replaceWith($.FroalaEditor.MARKERS);
            editor.selection.restore();

            // Save into undo stack the current position.
            if (!editor.undo.canDo()) editor.undo.saveStep();
            // Insert HTML.

            var $drag_point = editor.$el.find('.fr_drag_point');
            if($drag_point) {
              $drag_point.remove();
            }
            editor.html.insert(this.insert_html);
            // Save into undo stack the changes.
            editor.undo.saveStep();
            // Stop event propagation.
            dropEvent.preventDefault();
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

    ipcRenderer.on('html-save', (event, filename) => {
      this.saveHTML(filename);
    });

    // ipcRenderer.on('html-saveAs', (event, filename) => {
    //   this.saveAsHTML(filename);
    // });

  }

  handleModelChange(model) {
    this.setState({
      model: model
    });
  }

  handleManualController(item) {
    this.config.iframeStyleFiles = [...this.state.csslist, `file://${this.state.dirname}/resources/css/bootstrap.css`];
    this.config.iframeScriptFiles = [...this.state.jslist, `file://${this.state.dirname}/resources/js/jquery.js`];
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

  saveHTML = (theFileEntry) => {
    setTimeout(()=>{
      fs.writeFile(theFileEntry+'/index.html', this.state.model, (err) => {
        if(err) console.log(`Read failed: ${err}`);
      });
    },500)
  };

  // saveAsHTML = (theFileEntry) => {
  //   setTimeout(()=>{
  //     fs.writeFile(theFileEntry+ '/index.html', this.state.model, (err) => {
  //       if(err) console.log(`Read failed: ${err}`);
  //     });
  //   },500)
  // }

  render() {
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

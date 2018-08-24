import React from 'react';
import { ipcRenderer } from 'electron';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/js/languages/ko';

import fs from 'fs';

import ReactFroalaWysiwyg from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FrogEditorView from './FrogEditorView';

import { connect } from 'react-redux';
import { showEditorView, setEditorView } from '../actions/actions';

class FrogEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      model: "<div class='default_box'></div>",
      csslist: [],
      jslist: [],
      createFileOk: true
    };

    this.editor;
    this.insert_html;
    this.config = {
      charCounterCount: false,
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
      height: 300,
      iframeStyleFiles: [...this.state.csslist],
      iframeScriptFiles: [],
      htmlAllowedEmptyTags: ['style', 'script'],
      htmlRemoveTags: ['base'],
      lineBreakerOffset: 50,
      heightMax: 1600,
      theme: 'royal',
      events: {
        'froalaEditor.initialized': (e, editor) => {
          console.log('editor 초기화됨')
          this.editor = editor;


          ipcRenderer.on('editor-draginsert', (e, arg) => {
            this.insert_html = arg;
          })

          editor.events.on('dragover',ev => {  
            ev.preventDefault();
          })
          editor.events.on('dragstart',(ev,id) => {  
            console.log('dragstart',id)
            if(id) { 
              ev.nativeEvent.dataTransfer.setData('id', id)
            }
          })

          editor.events.on('drop', dropEvent => {
            console.log("drop!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            // Focus at the current posisiton.
            editor.markers.insertAtPoint(dropEvent.originalEvent);
            var $marker = editor.$el.find('.fr-marker');
            $marker.replaceWith($.FroalaEditor.MARKERS);
            editor.selection.restore();

            // Save into undo stack the current position.
            if (!editor.undo.canDo()) editor.undo.saveStep();

            // Insert HTML.
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

    ipcRenderer.on('html-saveAs', (event, filename) => {
      this.saveAsHTML(filename);
    });
  }

  handleModelChange(model) {
    this.setState({
      model: model
    });
  }

  handleManualController(item) {
    this.config.iframeStyleFiles = [...this.state.csslist, `file://${__dirname}/resources/css/bootstrap.css`];
    item.initialize(this.config);
  }

  readFileIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      var parsingData = data.toString()
      if (err) {
        console.log(`Read failed: ${err}`);
      } else {
        this.handleModelChange(String(data));
        if(parsingData.indexOf('<!--[') != -1){
          var start = parsingData.indexOf('<!--[')
          var end = parsingData.indexOf(']-->')
          var parsing = parsingData.substring(start+6, end)
          var json = JSON.parse(parsing)
          for(var i=0; i<json.js.length; i++){
            if(json.js[i].indexOf("&is_use='true'" != -1)){
              json.js[i] = json.js[i].split("&")[0]; 
              this.readCSSIntoEditor(json.js[i])
            }
          }
          for(var i=0; i<json.css.length; i++){
            if(json.css[i].indexOf("&is_use='true'" != -1)){
              json.css[i] = json.css[i].split("&")[0]; 
              this.readCSSIntoEditor(json.css[i])
            }
          }
        }   
      }
    });
  };

  readCSSIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
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

  saveHTML = theFileEntry => {
    theFileEntry = theFileEntry.toString();
    if (this.state.createFileOk) {
      if (theFileEntry.indexOf('.html') == -1) {
        fs.writeFile(theFileEntry + '.html', this.state.model, err => {
          console.log(`Read failed: ${err}`);
        });
      } else {
        fs.writeFile(theFileEntry, this.state.model, err => {
          console.log(`Read failed: ${err}`);
        });
      }
      this.setState({ createFileOk: false });
    } else {
      if (theFileEntry.indexOf('.html') == -1) {
        fs.writeFile(theFileEntry + '.html', this.state.model, err => {
          console.log(`Read failed: ${err}`);
        });
      } else {
        fs.writeFile(theFileEntry, this.state.model, err => {
          console.log(`Read failed: ${err}`);
        });
      }
    }
  };

  saveAsHTML = theFileEntry => {
    fs.writeFile(theFileEntry + '.html', this.state.model, err => {
      console.log(`Read failed: ${err}`);
    });
  };

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
        <FrogEditorView model={this.state.model} />
      </div>
    );
  }
}
export default FrogEditor;

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
      model: '',
      csslist: [],
      jslist: [],
      createFileOk: true
    };

    this.config = {
      charCounterCount: false,
      reactIgnoreAttrs: ['class', 'id'],
      language: 'ko',
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
        'span'
      ],
      iframeStyleFiles: this.state.csslist,
      iframeScriptFiles: [],
      htmlAllowedEmptyTags: ['style', 'script'],
      htmlRemoveTags: ['base'],
      lineBreakerOffset: 50,
      height: 600,
      theme: 'royal',
      events: {
        'froalaEditor.initialized': (e, editor) => {
          editor.events.on('dragover', dragEvent => {
            dragEvent.preventDefault();
          });
          editor.events.on('dragstart', (dragEvent, id) => {
            if (id) {
              dragEvent.nativeEvent.dataTransfer.setData('id', id);
            }
          });
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
    this.config.iframeStyleFiles = this.state.csslist; // ['C:/Users/clbee/Desktop/REACT WORK/electron/app/resources/css/bootstrap.css'];
    item.initialize(this.config);
  }

  makeFileIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      if (err) {
        console.log(`Read failed: ${err}`);
      } else {
        this.setState({
          model: ''
        })
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
        if(htmlCode.indexOf('<!--[') != -1){
          var start = htmlCode.indexOf('<!--[')
          var end = htmlCode.indexOf(']-->')
          var annotation = htmlCode.substring(start+6, end)
          var toJson = JSON.parse(annotation)
          for(var i=0; i<toJson.js.length; i++){
            if(toJson.js[i].indexOf("&is_use='true'" != -1)){
              toJson.js[i] = toJson.js[i].split("&")[0]; 
              this.readCSSIntoEditor(toJson.js[i])
            }
          }
          for(var i=0; i<toJson.css.length; i++){
            if(toJson.css[i].indexOf("&is_use='true'" != -1)){
              toJson.css[i] = toJson.css[i].split("&")[0]; 
              this.readCSSIntoEditor(toJson.css[i])
            }
          }
        } 
        else{
          var defaultCSSPath = '/Users/clbeemac3/Documents/ReactElectron/app/resources/css/bootstrap.css'
          this.readCSSIntoEditor(defaultCSSPath)

          var defaultJSPath = '/Users/clbeemac3/Documents/ReactElectron/app/resources/js/bootstrap.js'
          this.readJSIntoEditor(defaultJSPath)
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

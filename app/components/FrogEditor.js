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

    
    // ipcRenderer.on('asynchronous-message', (event, arg) => {
    //   console.log(arg) // "pong"이 출력됩니다.
    // });

  }

  handleModelChange(model) {
    this.setState({
      model: model
    });
  }

  handleManualController(item) {
    this.config.iframeStyleFiles = [...this.state.csslist, `file://${__dirname}/resources/css/bootstrap.css`, `file://${__dirname}/resources/css/custom_bootstrap.css`];
    this.config.iframeScriptFiles = [...this.state.jslist, `file://${__dirname}/resources/js/jquery.js`, `file://${__dirname}/resources/js/bootstrap.js`];
    item.initialize(this.config);
  }

  makeFileIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      if (err) {
        console.log(`Read failed: ${err}`);
      } else {
        var htmlCode = data.toString()
        this.handleModelChange(String(data));
        var start = htmlCode.indexOf('<!--[')
        var end = htmlCode.indexOf(']-->')
        var annotation = htmlCode.substring(start+6, end)
        var toJson = JSON.parse(annotation)

        for(var i=0; i<toJson.js.length; i++){
          if(toJson.js[i].indexOf("&is_use='true'" != -1)){
            toJson.js[i] = toJson.js[i].split("&")[0]; 
            this.readJSIntoEditor(toJson.js[i])
          }
        }
        for(var i=0; i<toJson.css.length; i++){
          if(toJson.css[i].indexOf("&is_use='true'" != -1)){
            toJson.css[i] = toJson.css[i].split("&")[0]; 
            //console.log(toJson.css[i])
            this.readCSSIntoEditor(toJson.css[i])
          }
        }
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
        if(htmlCode.indexOf('<!--[') != -1){ //css, js 경로가 있을 경우
          var start = htmlCode.indexOf('<!--[')
          var end = htmlCode.indexOf(']-->')
          var annotation = htmlCode.substring(start+6, end)
          var toJson = JSON.parse(annotation)

          // if()
          for(var i=0; i<toJson.js.length; i++){
            if(toJson.js[i].indexOf("&is_use='true'" != -1)){
              toJson.js[i] = toJson.js[i].split("&")[0]; 
              this.readJSIntoEditor(toJson.js[i])
            }
          }
          for(var i=0; i<toJson.css.length; i++){
            if(toJson.css[i].indexOf("&is_use='true'" != -1)){
              toJson.css[i] = toJson.css[i].split("&")[0]; 
              this.readCSSIntoEditor(toJson.css[i])
            }
          }
        } 
        else{ //css, js 경로가 없을 경우
          console.log('no file')
          
          // var defaultCSSPath = '/Users/clbeemac3/Documents/ReactElectron/app/resources/css/bootstrap.css'
          // this.readCSSIntoEditor(defaultCSSPath)

          // var defaultJSPath = '/Users/clbeemac3/Documents/ReactElectron/app/resources/js/bootstrap.js'
          // this.readJSIntoEditor(defaultJSPath)
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
    if(theFileEntry == null){
      console.log('please write contents')

    } else {
      theFileEntry = theFileEntry.toString();
      if (this.state.createFileOk) {
        if (theFileEntry.indexOf('.html') == -1) { //html 확장자가 없을 경우
          fs.writeFile(theFileEntry + '.html', this.state.model, (err) => {
            if(err) console.log(`Read failed: ${err}`);
          });
        } else { //html 확장자가 있을 경우
          fs.writeFile(theFileEntry, this.state.model, (err) => {
            if(err) console.log(`Read failed: ${err}`);
          });
        }
        this.setState({ createFileOk: false });
      } else {
        if (theFileEntry.indexOf('.html') == -1) {
          fs.writeFile(theFileEntry + '.html', this.state.model, (err) => {
            if(err) console.log(`Read failed: ${err}`);
          });
        } else {
          fs.writeFile(theFileEntry, this.state.model, (err) => {
            if(err) console.log(`Read failed: ${err}`);
          });
        }
      }
      // this.mainWindow.setTitle(`[ ${theFileEntry} ] - PageBuilder`)
      console.log('저장되었습니다.')
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
        <FrogEditorView model={this.state.model} config={this.config} />
      </div>
    );
  }
}
export default FrogEditor;

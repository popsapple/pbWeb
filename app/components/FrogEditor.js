import React from 'react';
import { ipcRenderer } from 'electron';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/js/languages/ko';

import fs from 'fs';

import ReactFroalaWysiwyg from 'react-froala-wysiwyg';

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

  readFileIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      var parsingData = data.toString()
      // console.log('-------parsingData---------')
      // console.log(parsingData)
      if (err) {
        console.log(`Read failed: ${err}`);
      } else {
        this.handleModelChange(String(data));

        var start = parsingData.indexOf('<!-- [[')
        var end = parsingData.indexOf(']] -->')
        var parsing = parsingData.substring(start+7, end)
        console.log('-------parsing---------')
        console.log(parsing)
        
        if(parsing.indexOf('JS') != -1){
          console.log('-------JS_IN-------')
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
        console.log("this.config.iframeStyleFiles")
        console.log(this.config.iframeStyleFiles);
        this.props.pbUpdateHandler();
        
      }
    });
  };

  readJSIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      console.log(data);
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
      <ReactFroalaWysiwyg
        key={this.key_item}
        config={this.config}
        model={this.state.model}
        onModelChange={this.handleModelChange}
        onManualControllerReady={this.handleManualController}
      />
    );
  }
}
export default FrogEditor;

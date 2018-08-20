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
      csslist: []
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
  }

  componentDidMount() {
    ipcRenderer.on('file-open', (event, filename) => {
      this.readFileIntoEditor(filename);
    });

    ipcRenderer.on('css-open', (event, filename) => {
      this.readCSSIntoEditor(filename);
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('file-open', (event, filename) => {
      this.readFileIntoEditor(filename);
    });

    ipcRenderer.removeListener('css-open', (event, filename) => {
      this.readCSSIntoEditor(filename);
    });
  }

  handleModelChange(model) {
    this.setState({
      model
    });
  }
  handleManualController(item) {
    this.config.iframeStyleFiles = this.state.csslist; // ['C:/Users/clbee/Desktop/REACT WORK/electron/app/resources/css/bootstrap.css'];
    item.initialize(this.config);
  }

  readFileIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      if (err) {
        console.log(`Read failed: ${err}`);
      } else {
        this.handleModelChange(String(data));
      }
    });
  };

  readCSSIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      console.log(data);
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

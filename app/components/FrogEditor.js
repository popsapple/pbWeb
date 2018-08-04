import React from 'react';
import { ipcRenderer } from 'electron';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/js/languages/ko';

import fs from 'fs';

import ReactFroalaWysiwyg from 'react-froala-wysiwyg';

class FrogEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      model: ''
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
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  componentWillMount() {
    ipcRenderer.send('editor-loaded', 'FrogEditor');

    ipcRenderer.on('file-open', (event, filename) => {
      this.readFileIntoEditor(filename);
    });
  }

  handleModelChange(model) {
    this.setState({
      model
    });
  }

  readFileIntoEditor = theFileEntry => {
    fs.readFile(theFileEntry.toString(), (err, data) => {
      if (err) {
        console.log(`Read failed: ${err}`);
      } else {
        this.handleModelChange(String(data));
      }
      // this.handleDocumentChange(theFileEntry);
      // editor.setValue(String(data));
    });
  };
  render() {
    return (
      <ReactFroalaWysiwyg
        config={this.config}
        model={this.state.model}
        onModelChange={this.handleModelChange}
      />
    );
  }
}
export default FrogEditor;

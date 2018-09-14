import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

export default class ErrorPage extends Component {
    constructor(){
      super();
      
    ipcRenderer.on('error-occurred', (event, args) => {
      console.log("error page ==> "+args)
    });

    };

    render() {
      return (
          <div>
            <h1>error page</h1>
          </div>
      );
    }
  }
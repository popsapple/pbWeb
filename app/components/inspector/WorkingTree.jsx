import React from 'react';
import { ipcRenderer } from 'electron';

export default class WorkingTree extends React.Component{
    constructor(){
        super()

        // this.state = {
        //     csslist_: [],
        //     jslist_: []
        // }
        // this.renderer = {
        //     events: {

        //     'froalaEditor.initialized': (e, editor) => {
        //       editor.events.on('dragover', dragEvent => {
        //         dragEvent.preventDefault();
        //       });
        //       editor.events.on('dragstart', (dragEvent, id) => {
        //         if (id) {
        //           dragEvent.nativeEvent.dataTransfer.setData('id', id);
        //         }
        //       });
        //     }
        //   }
        // }
    }
    componentWillMount() {
        // ipcRenderer.send('tree-loaded', 'WorkingTree') 

        // ipcRenderer.on('css-list', (event, filename) => {
        //     this.printCSSList(filename);
        // });

        // ipcRenderer.on('js-list', (event, filename) => {
        //     this.printJSList(filename);
        // });

        // this.setState({
        //     csslist_: menu.csslist,
        //     jslist_: menu.jslist
        // }) 
    }

    

    // printCSSList = csslist => {
    //     console.log('--------csslist---------')
    //     console.log(csslist)
    // }

    // printJSList = jslist => {{}
    //     console.log('--------jslist---------')
    //     console.log(jslist)
    //}
    
    render(){
        return(
            <div>
                {/* <div>{this.state.csslist_}</div>
                <div>{this.state.jslist_}</div> */}
            </div>
        )
    }
}
import React from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';

// import ErrorPage from '../ErrorPage';

export default class WorkingTree extends React.Component{
    constructor(){
        super()
        this.state = {
            cssList: [],
            jsList: []
        }
    }
    componentWillMount(){
        ipcRenderer.on('css-list', (event, csslist) => {
            if(csslist != null){
                this.InputCSS(csslist)
            } else {
                console.log('no css file')
                //  this.ErrorControl()
            }
        });

        ipcRenderer.on('js-list', (event, jslist) => {
            if(jslist != null){
                this.InputJS(jslist)
            } else {
                console.log('no js file')
                //this.ErrorControl()
            }
        });
    }

    ErrorControl = () => {
        console.log('error in')
        this.render
        return(
            console.log("404 error")
            //<ErrorPage/>            
        )
    }

    InputCSS = theFileEntry => {
        this.setState({
            cssList: theFileEntry
        });

    };

    InputJS = theFileEntry => {
        this.setState({
            jsList: theFileEntry
        });
    };

    render() {
        return(
            <div>
                <div>CSS</div>
                <ul dangerouslySetInnerHTML={
                    (() => {
                        var cssArr = []
                        for(var i=0; i<this.state.cssList.length; i++){
                            cssArr.push('<li>'+this.state.cssList[i]+'</li>')
                        }
                        return {__html: cssArr.join('')};
                    })()
                }>
                </ul>
                <div>JS</div>
                <ul dangerouslySetInnerHTML={
                    (() => {
                        var jsArr = []
                        for(var i=0; i<this.state.jsList.length; i++){
                            jsArr.push('<li>'+this.state.jsList[i]+'</li>')
                        }
                        return {__html: jsArr.join('')};
                    })()
                }>
                </ul>
            </div>
        )
    }
}
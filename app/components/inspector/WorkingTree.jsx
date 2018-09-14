import React from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';

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
            this.InputCSS(csslist)
        });

        ipcRenderer.on('js-list', (event, jslist) => {
            this.InputJS(jslist)
        });
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
            <div style={this.props.DataStyle}>
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
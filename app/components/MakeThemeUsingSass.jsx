import React from 'react';
const fs = require('fs');

export default class MakeThemeUsingSass extends React.Component{
    constructor(){
        super();
        this.state = {
            datalist: {}
        }
    }
    setJsonData(event){
        console.log(event.target);
        var target_val = event.target.value;
        var target_key = event.target.getAttribute("id");
        var obj = {};
        obj[target_key] = target_val;
        this.setState({
            datalist: Object.assign(this.state.datalist,obj)
        })
    }
    getJsonData(){
        return this.state.datalist;
    }
    exportJsonData(){
        var fileContent = JSON.stringify(this.getJsonData());
        var filepath = "theme.json";
        fs.writeFile(filepath, fileContent, (err) => {
            if (err) throw err;
            console.log("The file was succesfully saved!");
        });
    }
    accordionMoving(event){
        var target = event.target;
        if(event.target.tagName.toUpperCase() == "SPAN"){
            target = event.target.parentElement;
        }
        var accordion_list = document.querySelectorAll("ul.accordion > li");
        var index = parseInt(target.getAttribute("data-index"));
            console.log("index :: "+index);
       
        accordion_list.forEach(function(arr, idx){
            if(index != idx){
                accordion_list.item(idx).querySelector("h3").className = "hide";
            }else{
                console.log("show");
                accordion_list.item(idx).querySelector("h3").className = "show";   
            }
        });
    }
    render(){
        return(
            <div>
                <div className="options">
                    <h2>CSS 설정하기</h2>
                    <ul className="accordion">
                        <li>
                            <h3 className="show" data-index="0" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Colors</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-gray-base" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-gray-base">@gray-base</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-graydarker" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-graydarker">@gray-darker</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-gray-dark" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-gray-dark">@gray-dark</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-gray" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-gray">@gray</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-gray-light" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-gray-light">@gray-light</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-gray-lighter" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-gray-lighter">@gray-lighter</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-brandprimary" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-brandprimary">@brand-primary</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-brand-success" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-brand-success">@brand-success</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-brand-info" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-brand-info">@brand-info</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-brand-warning" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-brand-warning">@brand-warning</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-brand-danger" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-brand-danger">@brand-danger</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="1" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Scaffolding</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-body-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-body-bg">@body-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-text-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-text-color">@text-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-link-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-link-color">@link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-link-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-link-hover-color">@link-hover-color</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-link-hover-decoration" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-link-hover-decoration">@link-hover-decoration</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="2" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Typography</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="text" id="sass-font-family-sans-serif" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-family-sans-serif">@font-family-sans-serif</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-font-family-serif" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-family-serif">@font-family-serif</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-font-family-monospace" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-family-monospace">@font-family-monospace</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-font-family-base" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-family-base">@font-family-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-font-size-base" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-size-base">@font-size-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-font-size-large" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-size-large">@font-size-large</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-font-size-small" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-size-small">@font-size-small</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-font-size-h1" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-size-h1">@font-size-h1</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-font-size-h2" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-size-h2">@font-size-h2</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-font-size-h3" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-size-h3">@font-size-h3</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-font-size-h4" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-size-h4">@font-size-h4</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-font-size-h5" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-size-h5">@font-size-h5</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-font-size-h6" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-font-size-h6">@font-size-h6</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-line-height-base" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-line-height-base">@line-height-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-line-height-computed" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-line-height-computed">@line-height-computed</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-headings-font-family" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-headings-font-family">@headings-font-family</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-headings-font-weight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-headings-font-weight">@headings-font-weight</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-headings-line-height" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-headings-line-height">@headings-line-height</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-headings-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-headings-color">@headings-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="3" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Iconography</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="text" id="sass-icon-font-path" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-icon-fon-tpath">@icon-font-path</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-icon-font-name" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-icon-font-name">@icon-font-name</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-icon-font-svg-id" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-icon-font-svg-id">@icon-font-svg-id</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="4" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Components</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-padding-base-vertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-padding-base-vertical">@padding-base-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-padding-base-horizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-padding-base-horizontal">@padding-base-horizontal</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-padding-large-vertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-padding-large-vertical">@padding-large-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-padding-large-horizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-padding-large-horizontal">@padding-large-horizontal</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-padding-small-vertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-padding-small-vertical">@padding-small-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-padding-small-horizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-padding-small-horizontal">@padding-small-horizontal</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-padding-xs-vertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-padding-xs-vertical">@padding-xs-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-padding-xs-horizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-padding-xs-horizontal">@padding-xs-horizontal</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-line-height-large" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-line-height-large">@line-height-large</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-line-height-small" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-line-height-small">@line-height-small</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-border-radius-base" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-border-radius-base">@border-radius-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-border-radius-large" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-border-radius-large">@border-radius-large</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-border-radius-small" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-border-radius-small">@border-radius-small</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-component-active-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-component-active-color">@component-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-component-active-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-component-active-bg">@component-active-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-caret-width-base" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-caret-width-base">@caret-width-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-caret-width-large" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-caret-width-large">@caret-width-large</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="5" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Tables</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-table-cell-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-table-cell-padding">@table-cell-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-table-condensed-cell-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-table-condensed-cell-padding">@table-condensed-cell-padding</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-table-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-table-bg">@table-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-table-bg-accent" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-table-bg-accent">@table-bg-accent</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-table-bg-hover" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-table-bg-hover">@table-bg-hover</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-table-bg-active" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-table-bg-active">@table-bg-active</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-table-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-table-border-color">@table-border-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="6" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Buttons</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-btn-font-weight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-font-weight">@btn-font-weight</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-default-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-default-color">@btn-default-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-default-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-default-bg">@btn-default-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-default-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-default-border">@btn-default-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-primary-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-primary-color">@btn-primary-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-primary-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-primary-bg">@btn-primary-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-primary-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="color-btn-primary-border">@btn-primary-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-success-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-success-color">@btn-success-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-success-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-success-bg">@btn-success-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-success-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-success-border">@btn-success-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-info-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-info-color">@btn-info-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-info-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-info-bg">@btn-info-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-info-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-info-border">@btn-info-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-warning-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-warning-color">@btn-warning-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-warning-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-warning-bg">@btn-warning-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-warning-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-warning-border">@btn-warning-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-danger-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-danger-color">@btn-danger-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-danger-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-danger-bg">@btn-danger-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-danger-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btndangerborder">@btn-danger-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btn-link-disabled-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btn-link-disabled-color">@btn-link-disabled-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="7" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Forms</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-input-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-bg">@input-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-input-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-color">@input-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-input-bg-disabled" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-bg-disabled">@input-bg-disabled</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-input-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-border">@input-border</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-input-border-radius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-border-radius">@input-border-radius</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-input-border-radius-large" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-border-radius-large">@input-border-radius-large</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-input-border-radius-small" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-border-radius-small">@input-border-radius-small</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-input-border-focus" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-border-focus">@input-border-focus</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-input-color-placeholder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-color-placeholder">@input-color-placeholder</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-input-height-base" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-height-base">@input-height-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-input-height-large" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-height-large">@input-height-large</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-input-height-small" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-height-small">@input-height-small</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-form-group-margin-bottom" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-form-group-margin-bottom">@form-group-margin-bottom</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-legend-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-colorlegend-color">@legend-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-legend-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-legend-border-color">@legend-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-input-group-addon-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-group-addon-bg">@input-group-addon-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-input-group-addon-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-input-group-addon-border-color">@input-group-addon-border-color</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-cursor-disabled" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-cursor-disabled">@cursor-disabled</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="8" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Dropdowns</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-dropdown-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdown-bg">@dropdown-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-drop-down-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-drop-down-border">@dropdown-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-drop-down-fallback-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-drop-down-fallback-border">@dropdown-fallback-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdown-divider-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdown-divider-bg">@dropdown-divider-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdown-link-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdown-link-color">@dropdown-link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdown-link-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdown-link-hover-color">@dropdown-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdown-link-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdown-link-hover-bg">@dropdown-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdown-link-active-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdown-link-active-color">@dropdown-link-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdown-link-active-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdown-link-active-bg">@dropdown-link-active-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdown-link-disabled-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdown-link-disabled-color">@dropdown-link-disabled-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdown-header-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdown-header-color">@dropdown-header-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdown-caret-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdown-caret-color">@dropdown-caret-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="9" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Media queries breakpoints</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-screen-xs" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-xs">@screen-xs</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-xs-min" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-xs-min">@screen-xs-min</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-sm" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-sm">@screen-sm</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-sm-min" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screensmmin">@screen-sm-min</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-tablet" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-tablet">@screen-tablet</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-md" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-md">@screen-md</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-md-min" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-md-min">@screen-md-min</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-desktop" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-desktop">@screen-desktop</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-lg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-lg">@screen-lg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-lg-min" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-lg-min">@screen-lg-min</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-lg-desktop" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-lg-desktop">@screen-lg-desktop</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-xs-max" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-xs-max">@screen-xs-max</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-sm-max" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-sm-max">@screen-sm-max</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screen-md-max" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screen-md-max">@screen-md-max</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="10" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Grid system</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-grid-columns" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-grid-columns">@grid-columns</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-grid-gutter-width" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-grid-gutter-width">@grid-gutter-width</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-grid-float-breakpoint" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-grid-float-breakpoint">@grid-float-breakpoint</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-grid-float-breakpoint-max" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-grid-float-breakpoint-max">@grid-float-breakpoint-max</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="11" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Container sizes</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-container-tablet" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-container-tablet">@container-tablet</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-container-sm" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-container-sm">@container-sm</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-container-desktop" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-container-desktop">@container-desktop</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-container-md" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-container-md">@container-md</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-container-large-desktop" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-container-large-desktop">@container-large-desktop</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-container-lg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-container-lg">@container-lg</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="12" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Navbar</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-navbar-height" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-height">@navbar-height</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-navbar-margin-bottom" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-margin-bottom">@navbar-margin-bottom</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-navbar-border-radius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-border-radius">@navbar-border-radius</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-navbar-padding-horizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-padding-horizontal">@navbar-padding-horizontal</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-navbar-padding-vertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-padding-vertical">@navbar-padding-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-navbar-collapse-max-height" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-collapse-max-height">@navbar-collapse-max-height</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-color">@navbar-default-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-bg">@navbar-default-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-border">@navbar-default-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-link-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-link-color">@navbar-default-link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-link-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-link-hover-color">@navbar-default-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-link-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-link-hover-bg">@navbar-default-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-link-active-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-link-active-color">@navbar-default-link-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-bg">@navbar-default-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-link-active-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-link-active-bg">@navbar-default-link-active-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-default-link-disabled-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-default-link-disabled-color">@navbar-default-link-disabled-color></label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-link-disabled-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-link-disabled-bg">@navbar-default-link-disabled-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-brand-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-brand-color">@navbar-default-brand-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-brand-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-brand-hover-color">@navbar-default-brand-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-brand-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-brand-hover-bg">@navbar-default-brand-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-toggle-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-toggle-hover-bg">@navbar-default-toggle-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-toggle-icon-bar-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-toggle-icon-bar-bg">@navbar-default-toggle-icon-bar-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-default-toggle-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-default-toggle-border-color">@navbar-default-toggle-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-color">@navbar-inverse-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-bg">@navbar-inverse-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-border">@navbar-inverse-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-link-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inver-selink-color">@navbar-inverse-link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-link-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-link-hover-color">@navbar-inverse-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-link-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-link-hover-bg">@navbar-inverse-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-link-active-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-link-active-color">@navbar-inverse-link-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-link-active-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-link-active-bg">@navbar-inverse-link-active-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-link-disabled-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-link-disabled-color">@navbar-inverse-link-disabled-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-link-disabled-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-link-disabled-bg">@navbar-inverse-link-disabled-bg</label>
                                </li>

                                <li>
                                    <input type="color" id="sass-navbar-inverse-brand-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-brand-color">@navbar-inverse-brand-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-brand-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-brand-hover-color">@navbar-inverse-brand-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-brand-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-brand-hover-bg">@navbar-inverse-brand-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-toggle-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-toggle-hover-bg">@navbar-inverse-toggle-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-toggle-icon-bar-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-toggle-icon-bar-bg">@navbar-inverse-toggle-icon-bar-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbar-inverse-toggle-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbar-inverse-toggle-border-color">@navbar-inverse-toggle-border-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="13" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Navs</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-nav-link-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-link-padding">@nav-link-padding</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-link-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-link-hover-bg">@nav-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-disabled-linkc-olor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-disabled-link-color">@nav-disabled-link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-disabled-link-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-disabled-link-hover-color">@nav-disabled-link-hover-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="14" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Tabs</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-nav-tabs-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-tabs-border-color">@nav-tabs-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-tabs-link-hover-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navtabs-link-hover-border-color">@nav-tabs-link-hover-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-tabs-active-link-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-tabs-active-link-hove-rbg">@nav-tabs-active-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-tabs-active-link-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-tabs-active-link-hover-color">@nav-tabs-active-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-tabs-active-link-hover-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-tabs-active-link-hover-border-color">@nav-tabs-active-link-hover-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-tabs-justified-link-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-tabs-justified-link-border-color">@nav-tabs-justified-link-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-tabs-justified-active-link-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-tabs-justified-active-link-border-color">@nav-tabs-justified-active-link-border-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="15" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Pills</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-nav-pills-border-radius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-pills-border-radius">@nav-pills-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-pills-active-link-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-pills-active-link-hover-bg">@nav-pills-active-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-nav-pills-active-link-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-nav-pills-active-link-hover-color">@nav-pills-active-link-hover-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="16" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Pagination</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-pagination-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-color">@pagination-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagination-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-bg">@pagination-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagination-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-border">@pagination-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagination-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-hover-color">@pagination-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagination-hover-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-hover-border">@pagination-hover-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagination-active-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-active-color">@pagination-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagination-active-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-active-bg">@pagination-active-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagination-active-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-active-border">@pagination-active-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagination-disabled-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-disabled-color">@pagination-disabled-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagination-disabled-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-disabled-bg">@pagination-disabled-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagination-disabled-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagination-disabled-border">@pagination-disabled-border</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="17" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Pager</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-pager-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pager-bg">@pager-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pager-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pager-border">@pager-border</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-pager-border-radius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pager-border-radius">@pager-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pager-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pager-hover-bg">@pager-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pager-active-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pager-active-bg">@pager-active-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pager-active-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pager-active-color">@pager-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pager-disabled-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pager-disabled-color">@pager-disabled-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="18" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Jumbotron</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-jumbotron-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-jumbotron-padding">@jumbotron-padding</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-jumbotron-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-jumbotron-color">@jumbotron-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-jumbotron-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-jumbotron-bg">@jumbotron-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-jumbotron-heading-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-jumbotron-heading-color">@jumbotron-heading-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-jumbotron-font-size" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-jumbotron-font-size">@jumbotron-font-size</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="19" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Form states and alerts</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="text" id="sass-state-success-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-success-text">@state-success-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-state-success-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-success-bg">@state-success-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-state-success-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-success-border">@state-success-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-state-info-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-info-bg">@state-info-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-state-info-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-info-border">@state-info-border</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-state-warning-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-warning-text">@state-warning-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-state-warning-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-warning-bg">@state-warning-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-state-warning-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-warning-border">@state-warning-border</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-state-danger-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-danger-text">@state-danger-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-state-danger-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-danger-bg">@state-danger-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-state-danger-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-state-danger-border">@state-danger-border</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="20" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Tooltips</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-tooltip-max-width" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltip-max-width">@tooltip-max-width</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-tooltip-colo" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltip-colo">@tooltip-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-tooltip-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltip-bg">@tooltip-bg</label>
                                </li>
                                <li>
                                    <input type="number" step="0.01" id="sass-tooltip-opacity" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltip-opacity">@tooltip-opacity</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-tooltip-arrow-width" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltip-arrow-width">@tooltip-arrow-width</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-tooltip-arrow-colo" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltip-arrow-colo">@tooltip-arrow-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="21" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Popovers</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-popover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popover-bg">@popover-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-popover-max-width" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popover-max-width">@popover-max-width</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popover-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popover-border-color">@popover-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popover-fallback-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popover-fallback-border-color">@popover-fallback-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popover-title-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popover-title-bg">@popover-title-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-popover-arrow-width" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popover-arrow-width">@popover-arrow-width</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popover-arrow-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popover-arrow-color">@popover-arrow-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-popover-arrow-outer-width" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popover-arrow-outer-width">@popover-arrow-outer-width</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popover-arrow-outer-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popover-arrow-outer-color">@popover-arrow-outer-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popover-arrow-outer-fallback-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popover-arrow-outer-fallback-color">@popover-arrow-outer-fallback-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="22" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Labels</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-label-default-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-label-default-bg">@label-default-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-label-primary-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-label-primary-bg">@label-primary-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-label-success-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-label-success-bg">@label-success-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-label-info-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-label-info-bg">@label-info-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-label-warning-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-label-warning-bg">@label-warning-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-label-danger-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-label-danger-bg">@label-danger-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-label-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-label-color">@label-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-label-link-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-label-link-hover-color">@label-link-hover-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="23" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">LabModalsels</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-modal-inner-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-inner-padding">@modal-inner-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-modal-title-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-title-padding">@modal-title-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-modal-title-line-height" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-title-line-height">@modal-title-line-height</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modal-content-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-content-bg">@modal-content-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modal-content-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-content-border-color">@modal-content-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modal-content-fallback-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-content-fallback-border-color">@modal-content-fallback-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modal-backdrop-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-backdrop-bg">@modal-backdrop-bg</label>
                                </li>
                                <li>
                                    <input type="number" stop="0.01" id="sass-modal-backdrop-opacity" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-backdrop-opacity">@modal-backdrop-opacity</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modal-header-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-header-border-color">@modal-header-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modal-footer-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-footer-border-color">@modal-footer-border-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-modal-lg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-lg">@modal-lg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-modal-md" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-md">@modal-md</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-modal-sm" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modal-sm">@modal-sm</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="24" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Alerts</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-alert-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-padding">@alert-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alert-border-radius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-border-radius">@alert-border-radius</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alert-link-font-weight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-link-font-weight">@alert-link-font-weight</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-alert-success-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-success-bg">@alert-success-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-alert-success-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-success-text">@alert-success-text</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alert-success-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-success-border">@alert-success-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-alert-info-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-info-bg">@alert-info-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-alert-info-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-info-text">@alert-info-text</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alert-info-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-info-border">@alert-info-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-alert-warning-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-warning-bg">@alert-warning-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-alert-warning-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-warning-text">@alert-warning-text</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alert-warning-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-warning-border">@alert-warning-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-alert-danger-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-danger-bg">@alert-danger-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-alert-danger-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-danger-text">@alert-danger-text</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alert-danger-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alert-danger-border">@alert-danger-border</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="25" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Progress bars</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-progress-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progress-bg">@progress-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progress-bar-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progress-bar-color">@progress-bar-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-progress-border-radius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progress-border-radius">@progress-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progress-bar-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progress-bar-bg">@progress-bar-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progress-bar-success-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progress-bar-success-bg">@progress-bar-success-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progress-bar-warning-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progress-bar-warning-bg">@progress-bar-warning-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progress-bar-danger-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progress-bar-danger-bg">@progress-bar-danger-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progress-bar-info-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progress-bar-info-bg">@progress-bar-info-bg</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="26" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">List group</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-list-group-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-bg">@list-group-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-list-group-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-border">@list-group-border</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-list-group-border-radius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-border-radius">@list-group-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-list-group-hover-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-hover-bg">@list-group-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-list-group-active-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-active-color">@list-group-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-list-group-active-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-active-bg">@list-group-active-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-list-group-active-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-active-border">@list-group-active-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-list-group-active-text-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-active-text-color">@list-group-active-text-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-list-group-disabled-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-disabled-color">@list-group-disabled-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-list-group-disabled-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-disabled-bg">@list-group-disabled-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-list-group-disabled-text-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-disabled-text-color">@list-group-disabled-text-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-list-group-link-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-link-color">@list-group-link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-list-group-link-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-link-hover-color">@list-group-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-list-group-link-heading-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-list-group-link-heading-color">@list-group-link-heading-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="27" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Panels</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-panel-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-bg">@panel-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-panel-body-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-body-padding">@panel-body-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-panel-heading-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-heading-padding">@panel-heading-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-panel-footer-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-footer-padding">@panel-footer-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-panel-border-radius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-border-radius">@panel-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-inner-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-inner-border">@panel-inner-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-footer-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-footer-bg">@panel-footer-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-panel-default-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-default-text">@panel-default-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-default-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-default-border">@panel-default-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-default-heading-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-default-heading-bg">@panel-default-heading-bg</label>
                                </li>


                                <li>
                                    <input type="text" id="sass-panel-primary-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-primary-text">@panel-primary-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-primary-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-primary-border">@panel-primary-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-primary-heading-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-primary-heading-bg">@panel-primary-heading-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-panel-success-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-success-text">@panel-success-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-primary-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-primary-text">@panel-primary-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-success-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-success-border">@panel-success-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-success-heading-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-success-heading-bg">@panel-success-heading-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-panel-info-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-info-text">@panel-info-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-info-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-info-border">@panel-info-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-info-heading-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-info-heading-bg">@panel-info-heading-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-panel-warning-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-warning-text">@panel-warning-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-warning-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-warning-border">@panel-warning-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-warning-heading-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-warning-heading-bg">@panel-warning-heading-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-panel-danger-text" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-danger-text">@panel-danger-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-danger-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-danger-border">@panel-danger-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panel-danger-heading-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panel-danger-heading-bg">@panel-danger-heading-bg</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="28" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Thumbnails</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-thumbnail-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnail-padding">@thumbnail-padding</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-thumbnail-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnail-bg">@thumbnail-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-thumbnail-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnail-border">@thumbnail-border</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-thumbnail-border-radius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnail-border-radius">@thumbnail-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-thumbnail-caption-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnail-caption-color">@thumbnail-caption-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-thumbnail-caption-padding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnail-caption-padding">@thumbnail-caption-padding</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="29" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Wells</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-well-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-well-bg">@well-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-well-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-well-border">@well-border</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="30" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Badges</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-badge-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badge-color">@badge-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-badge-link-hover-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badge-link-hover-color">@badge-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-badge-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badge-bg">@badge-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-badge-active-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badge-active-color">@badge-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-badge-active-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badge-active-bg">@badge-active-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-badge-font-weight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badgefontweight">@badge-font-weight</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-badge-line-height" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badgelineheight">@badge-line-height</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-badge-border-radius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badge-border-radius">@badge-border-radius</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="31" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Breadcrumbs</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-breadcrumb-padding-vertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumb-padding-vertical">@breadcrumb-padding-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-breadcrumb-padding-horizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumb-padding-horizontal">@breadcrumb-padding-horizontal</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-breadcrumb-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumb-bg">@breadcrumb-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-breadcrumb-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumb-color">@breadcrumb-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-breadcrumb-active-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumb-active-color">@breadcrumb-active-color</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-breadcrumb-separator" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumb-separator">@breadcrumb-separator</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="32" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Carousel</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="text" id="sass-carousel-text-shadow" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carousel-text-shadow">@carousel-text-shadow</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-carousel-control-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carousel-control-color">@carousel-control-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-carousel-control-width" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carousel-control-width">@carousel-control-width</label>
                                </li>
                                <li>
                                    <input type="number" step="0.01" id="sass-carousel-control-opacit" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carousel-control-opacit">@carousel-control-opacity</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-carousel-control-font-size" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carousel-control-font-size">@carousel-control-font-size</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-carousel-indicator-active-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carousel-indicator-active-bg">@carousel-indicator-active-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-carousel-indicator-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carousel-indicator-border-color">@carousel-indicator-border-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-carousel-caption-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carousel-caption-color">@carousel-caption-color</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="33" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Close</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-close-font-weigh" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-close-font-weigh">@close-font-weight</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-close-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-close-color">@close-color</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-close-text-shadow" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-close-text-shadow">@close-text-shadow</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="34" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Code</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="color" id="sass-code-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-code-color">@code-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-code-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-code-bg">@code-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-kbd-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-kbd-color">@kbd-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-kbd-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-kbd-bg">@kbd-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pre-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pre-bg">@pre-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pre-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pre-color">@pre-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pre-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pre-border-color">@pre-border-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-pre-scrollable-max-height" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pre-scrollable-max-height">@pre-scrollable-max-height</label>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="hide" data-index="35" onClick={this.accordionMoving.bind(this)}>
                                <span className="title">Type</span>
                                <span className="carrot"></span>
                            </h3>
                            <ul>
                                <li>
                                    <input type="number" id="sass-component-offset-horizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-component-offset-horizontal">@component-offset-horizontal</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-text-muted" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-text-muted">@text-muted</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-abbr-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-abbr-border-color">@abbr-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-headings-small-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-headings-small-color">@headings-small-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-blockquote-small-colo" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-blockquote-small-colo">@blockquote-small-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-blockquote-font-size" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-blockquote-font-size">@blockquote-font-size</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-blockquote-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-blockquote-border-color">@blockquote-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-page-header-border-color" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-page-header-border-color">@page-header-border-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-dl-horizontal-offset" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dl-horizontal-offset">@dl-horizontal-offset</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-hr-border" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-hr-border">@hr-border</label>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="submit_theme_div">
                    <button className="submit_theme" onClick={this.exportJsonData.bind(this)}>테마 내보내기</button>
                </div>
            </div>
        )
    }
}
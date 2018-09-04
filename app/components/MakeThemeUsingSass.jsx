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
                                    <input type="color" id="sass-graybase" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-graybase">@gray-base</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-graydarker" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-graydarker">@gray-darker</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-graydark" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-graydark">@gray-dark</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-gray" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-gray">@gray</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-graylight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-graylight">@gray-light</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-graylighter" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-graylighter">@gray-lighter</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-brandprimary" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-brandprimary">@brand-primary</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-brandsuccess" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-brandsuccess">@brand-success</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-brandsuccess" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-brandsuccess">@brand-success</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-brandinfo" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-brandinfo">@brand-info</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-brandwarning" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-brandwarning">@brand-warning</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-branddanger" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-branddanger">@brand-danger</label>
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
                                    <input type="color" id="sass-graybase" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-bodybg">@body-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-graydarker" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-textcolor">@text-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-linkcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-linkcolor">@link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-linkhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-linkhovercolor">@link-hover-color</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-linkhoverdecoration" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-linkhoverdecoration">@link-hover-decoration</label>
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
                                    <input type="text" id="sass-fontfamilysansserif" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontfamilysansserif">@font-family-sans-serif</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-fontfamilyserif" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontfamilyserif">@font-family-serif</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-fontfamilymonospace" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontfamilymonospace">@font-family-monospace</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-fontfamilybase" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontfamilybase">@font-family-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-fontsizebase" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontsizebase">@font-size-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-fontsizelarge" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontsizelarge">@font-size-large</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-fontsizesmall" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontsizesmall">@font-size-small</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-fontsizeh1" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontsizeh1">@font-size-h1</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-fontsizeh2" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontsizeh2">@font-size-h2</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-fontsizeh3" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontsizeh3">@font-size-h3</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-fontsizeh4" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontsizeh4">@font-size-h4</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-fontsizeh5" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontsizeh5">@font-size-h5</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-fontsizeh6" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-fontsizeh6">@font-size-h6</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-lineheightbase" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-lineheightbase">@line-height-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-lineheightcomputed" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-lineheightcomputed">@line-height-computed</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-headingsfontfamily" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-headingsfontfamily">@headings-font-family</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-headingsfontweight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-headingsfontweight">@headings-font-weight</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-headingslineheight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-headingslineheight">@headings-line-height</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-headingscolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-headingscolor">@headings-color</label>
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
                                    <input type="text" id="sass-iconfontpath" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-iconfontpath">@icon-font-path</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-iconfontname" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-iconfontname">@icon-font-name</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-iconfontsvgid" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-iconfontsvgid">@icon-font-svg-id</label>
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
                                    <input type="number" id="sass-paddingbasevertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paddingbasevertical">@padding-base-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-paddingbasehorizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paddingbasehorizontal">@padding-base-horizontal</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-paddinglargevertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paddinglargevertical">@padding-large-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-paddinglargehorizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paddinglargehorizontal">@padding-large-horizontal</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-paddingsmallvertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paddingsmallvertical">@padding-small-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-paddingsmallhorizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paddingsmallhorizontal">@padding-small-horizontal</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-paddingxsvertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paddingxsvertical">@padding-xs-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-paddingxshorizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paddingxshorizontal">@padding-xs-horizontal</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-lineheightlarge" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-lineheightlarge">@line-height-large</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-lineheightsmall" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-lineheightsmall">@line-height-small</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-borderradiusbase" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-borderradiusbase">@border-radius-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-borderradiuslarge" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-borderradiuslarge">@border-radius-large</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-borderradiussmall" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-borderradiussmall">@border-radius-small</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-componentactivecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-componentactivecolor">@component-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-componentactivebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-componentactivebg">@component-active-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-caretwidthbase" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-caretwidthbase">@caret-width-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-caretwidthlarge" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-caretwidthlarge">@caret-width-large</label>
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
                                    <input type="number" id="sass-tablecellpadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tablecellpadding">@table-cell-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-tablecondensedcellpadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tablecondensedcellpadding">@table-condensed-cell-padding</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-table-bg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-table-bg">@table-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-tablebgaccent" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tablebgaccent">@table-bg-accent</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-table-bg-hover" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tablebghover">@table-bg-hover</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-tablebgactive" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tablebgactive">@table-bg-active</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-tablebordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tablebordercolor">@table-border-color</label>
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
                                    <input type="color" id="sass-btnfontweight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btnfontweight">@btn-font-weight</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btndefaultcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btndefaultcolor">@btn-default-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btndefaultbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btndefaultbg">@btn-default-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btndefaultborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btndefaultborder">@btn-default-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btnprimarycolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btnprimarycolor">@btn-primary-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btnprimarybg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btnprimarybg">@btn-primary-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btnprimaryborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="color-btnprimaryborder">@btn-primary-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btnsuccesscolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btnsuccesscolor">@btn-success-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btnsuccessbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btnsuccessbg">@btn-success-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btnsuccessborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btnsuccessborder">@btn-success-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btninfocolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btninfocolor">@btn-info-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btninfobg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btninfobg">@btn-info-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btninfoborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btninfoborder">@btn-info-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btnwarningcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btnwarningcolor">@btn-warning-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btnwarningbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btnwarningbg">@btn-warning-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btnwarningborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btnwarningborder">@btn-warning-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btndangercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btndangercolor">@btn-danger-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btndangerbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btndangerbg">@btn-danger-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btndangerborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btndangerborder">@btn-danger-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-btnlinkdisabledcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-btnlinkdisabledcolor">@btn-link-disabled-color</label>
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
                                    <input type="color" id="sass-inputbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputbg">@input-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-inputcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputcolor">@input-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-inputbgdisabled" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputbgdisabled">@input-bg-disabled</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-inputborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputborder">@input-border</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-inputborderradius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputborderradius">@input-border-radius</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-inputborderradiuslarge" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputborderradiuslarge">@input-border-radius-large</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-inputborderradiussmall" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputborderradiussmall">@input-border-radius-small</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-inputborderfocus" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputborderfocus">@input-border-focus</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-inputcolorplaceholder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputcolorplaceholder">@input-color-placeholder</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-inputheightbase" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputheightbase">@input-height-base</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-inputheightlarge" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputheightlarge">@input-height-large</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-inputheightsmall" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputheightsmall">@input-height-small</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-formgroupmarginbottom" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-formgroupmarginbottom">@form-group-margin-bottom</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-legendcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-colorlegendcolor">@legend-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-legendbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-legendbordercolor">@legend-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-inputgroupaddonbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputgroupaddonbg">@input-group-addon-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-inputgroupaddonbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-inputgroupaddonbordercolor">@input-group-addon-border-color</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-cursordisabled" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-cursordisabled">@cursor-disabled</label>
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
                                    <input type="color" id="sass-dropdownbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdownbg">@dropdown-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdownborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdownborder">@dropdown-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdownfallbackborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdownfallbackborder">@dropdown-fallback-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdowndividerbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdowndividerbg">@dropdown-divider-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdownlinkcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdownlinkcolor">@dropdown-link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdownlinkhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdownlinkhovercolor">@dropdown-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdownlinkhoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdownlinkhoverbg">@dropdown-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdownlinkactivecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdownlinkactivecolor">@dropdown-link-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdownlinkactivebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdownlinkactivebg">@dropdown-link-active-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdownlinkdisabledcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdownlinkdisabledcolor">@dropdown-link-disabled-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdownheadercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdownheadercolor">@dropdown-header-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-dropdowncaretcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dropdowncaretcolor">@dropdown-caret-color</label>
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
                                    <input type="number" id="sass-screenxs" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screenxs">@screen-xs</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screenxsmin" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screenxsmin">@screen-xs-min</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screensm" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screensm">@screen-sm</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screensmmin" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screensmmin">@screen-sm-min</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screentablet" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screentablet">@screen-tablet</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screenmd" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screenmd">@screen-md</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screenmdmin" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screenmdmin">@screen-md-min</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screendesktop" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screendesktop">@screen-desktop</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screenlg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screenlg">@screen-lg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screenlgmin" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screenlgmin">@screen-lg-min</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screenlgdesktop" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screenlgdesktop">@screen-lg-desktop</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screenxsmax" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screenxsmax">@screen-xs-max</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screensmmax" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screensmmax">@screen-sm-max</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-screenmdmax" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-screenmdmax">@screen-md-max</label>
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
                                    <input type="number" id="sass-gridcolumns" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-gridcolumns">@grid-columns</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-gridgutterwidth" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-gridgutterwidth">@grid-gutter-width</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-gridfloatbreakpoint" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-gridfloatbreakpoint">@grid-float-breakpoint</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-gridfloatbreakpointmax" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-gridfloatbreakpointmax">@grid-float-breakpoint-max</label>
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
                                    <input type="number" id="sass-containertablet" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-containertablet">@container-tablet</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-containersm" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-containersm">@container-sm</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-containerdesktop" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-containerdesktop">@container-desktop</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-containermd" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-containermd">@container-md</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-containerlargedesktop" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-containerlargedesktop">@container-large-desktop</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-containerlg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-containerlg">@container-lg</label>
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
                                    <input type="number" id="sass-navbarheight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarheight">@navbar-height</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-navbarmarginbottom" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarmarginbottom">@navbar-margin-bottom</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-navbarborderradius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarborderradius">@navbar-border-radius</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-navbarpaddinghorizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarpaddinghorizontal">@navbar-padding-horizontal</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-navbarpaddingvertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarpaddingvertical">@navbar-padding-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-navbarcollapsemaxheight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarcollapsemaxheight">@navbar-collapse-max-height</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultcolor">@navbar-default-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultbg">@navbar-default-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultborder">@navbar-default-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultlinkcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultlinkcolor">@navbar-default-link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultlinkhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultlinkhovercolor">@navbar-default-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultlinkhoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultlinkhoverbg">@navbar-default-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultlinkactivecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultlinkactivecolor">@navbar-default-link-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultbg">@navbar-default-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultlinkactivebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultlinkactivebg">@navbar-default-link-active-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-defaultlinkdisabledcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-defaultlinkdisabledcolor">@navbar-default-link-disabled-color></label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultlinkdisabledbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultlinkdisabledbg">@navbar-default-link-disabled-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultbrandcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultbrandcolor">@navbar-default-brand-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultbrandhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultbrandhovercolor">@navbar-default-brand-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaultbrandhoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaultbrandhoverbg">@navbar-default-brand-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaulttogglehoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaulttogglehoverbg">@navbar-default-toggle-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaulttoggleiconbarbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaulttoggleiconbarbg">@navbar-default-toggle-icon-bar-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbardefaulttogglebordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbardefaulttogglebordercolor">@navbar-default-toggle-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinversecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinversecolor">@navbar-inverse-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinversebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinversebg">@navbar-inverse-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinverseborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinverseborder">@navbar-inverse-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinverselinkcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinverselinkcolor">@navbar-inverse-link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinverselinkhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinverselinkhovercolor">@navbar-inverse-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinverselinkhoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinverselinkhoverbg">@navbar-inverse-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinverselinkactivecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinverselinkactivecolor">@navbar-inverse-link-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinverselinkactivebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinverselinkactivebg">@navbar-inverse-link-active-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinverselinkdisabledcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinverselinkdisabledcolor">@navbar-inverse-link-disabled-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinverselinkdisabledbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinverselinkdisabledbg">@navbar-inverse-link-disabled-bg</label>
                                </li>

                                <li>
                                    <input type="color" id="sass-navbarinversebrandcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinversebrandcolor">@navbar-inverse-brand-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinversebrandhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinversebrandhovercolor">@navbar-inverse-brand-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinversebrandhoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinversebrandhoverbg">@navbar-inverse-brand-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinversetogglehoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinversetogglehoverbg">@navbar-inverse-toggle-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinversetoggleiconbarbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinversetoggleiconbarbg">@navbar-inverse-toggle-icon-bar-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navbarinversetogglebordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navbarinversetogglebordercolor">@navbar-inverse-toggle-border-color</label>
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
                                    <input type="number" id="sass-navlinkpadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navlinkpadding">@nav-link-padding</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navlinkhoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navlinkhoverbg">@nav-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navdisabledlinkcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navdisabledlinkcolor">@nav-disabled-link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navdisabledlinkhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navdisabledlinkhovercolor">@nav-disabled-link-hover-color</label>
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
                                    <input type="color" id="sass-navtabsbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navtabsbordercolor">@nav-tabs-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navtabslinkhoverbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navtabslinkhoverbordercolor">@nav-tabs-link-hover-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navtabsactivelinkhoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navtabsactivelinkhoverbg">@nav-tabs-active-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navtabsactivelinkhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navtabsactivelinkhovercolor">@nav-tabs-active-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navtabsactivelinkhoverbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navtabsactivelinkhoverbordercolor">@nav-tabs-active-link-hover-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navtabsjustifiedlinkbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navtabsjustifiedlinkbordercolor">@nav-tabs-justified-link-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navtabsjustifiedactivelinkbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navtabsjustifiedactivelinkbordercolor">@nav-tabs-justified-active-link-border-color</label>
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
                                    <input type="number" id="sass-navpillsborderradius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navpillsborderradius">@nav-pills-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navpillsactivelinkhoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navpillsactivelinkhoverbg">@nav-pills-active-link-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-navpillsactivelinkhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-navpillsactivelinkhovercolor">@nav-pills-active-link-hover-color</label>
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
                                    <input type="color" id="sass-paginationcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationcolor">@pagination-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paginationbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationbg">@pagination-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paginationborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationborder">@pagination-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paginationhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationhovercolor">@pagination-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paginationhoverborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationhoverborder">@pagination-hover-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paginationactivecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationactivecolor">@pagination-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paginationactivebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationactivebg">@pagination-active-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paginationactiveborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationactiveborder">@pagination-active-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paginationdisabledcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationdisabledcolor">@pagination-disabled-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paginationdisabledbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationdisabledbg">@pagination-disabled-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paginationdisabledborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paginationdisabledborder">@pagination-disabled-border</label>
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
                                    <input type="color" id="sass-pagerbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagerbg">@pager-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagerborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagerborder">@pager-border</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-pagerborderradius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagerborderradius">@pager-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagerhoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagerhoverbg">@pager-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pageractivebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pageractivebg">@pager-active-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pageractivecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pageractivecolor">@pager-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pagerdisabledcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pagerdisabledcolor">@pager-disabled-color</label>
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
                                    <input type="number" id="sass-jumbotronpadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-jumbotronpadding">@jumbotron-padding</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-jumbotroncolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-jumbotroncolor">@jumbotron-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-jumbotronbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-jumbotronbg">@jumbotron-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-jumbotronheadingcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-jumbotronheadingcolor">@jumbotron-heading-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-jumbotronfontsize" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-jumbotronfontsize">@jumbotron-font-size</label>
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
                                    <input type="text" id="sass-statesuccesstext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-statesuccesstext">@state-success-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-statesuccessbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-statesuccessbg">@state-success-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-statesuccessborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-statesuccessborder">@state-success-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-stateinfobg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-stateinfobg">@state-info-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-stateinfoborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-stateinfoborder">@state-info-border</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-statewarningtext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-statewarningtext">@state-warning-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-statewarningbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-statewarningbg">@state-warning-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-statewarningborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-statewarningborder">@state-warning-border</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-statedangertext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-statedangertext">@state-danger-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-statedangerbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-statedangerbg">@state-danger-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-statedangerborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-statedangerborder">@state-danger-border</label>
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
                                    <input type="number" id="sass-tooltipmaxwidth" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltipmaxwidth">@tooltip-max-width</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-tooltipcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltipcolor">@tooltip-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-tooltipbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltipbg">@tooltip-bg</label>
                                </li>
                                <li>
                                    <input type="number" step="0.01" id="sass-tooltipopacity" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltipopacity">@tooltip-opacity</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-tooltiparrowwidth" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltiparrowwidth">@tooltip-arrow-width</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-tooltiparrowcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-tooltiparrowcolor">@tooltip-arrow-color</label>
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
                                    <input type="color" id="sass-popoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popoverbg">@popover-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-popovermaxwidth" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popovermaxwidth">@popover-max-width</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popoverbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popoverbordercolor">@popover-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popoverfallbackbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popoverfallbackbordercolor">@popover-fallback-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popovertitlebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popovertitlebg">@popover-title-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-popoverarrowwidth" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popoverarrowwidth">@popover-arrow-width</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popoverarrowcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popoverarrowcolor">@popover-arrow-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-popoverarrowouterwidth" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popoverarrowouterwidth">@popover-arrow-outer-width</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popoverarrowoutercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popoverarrowoutercolor">@popover-arrow-outer-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-popoverarrowouterfallbackcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-popoverarrowouterfallbackcolor">@popover-arrow-outer-fallback-color</label>
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
                                    <input type="color" id="sass-labeldefaultbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-labeldefaultbg">@label-default-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-labelprimarybg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-labelprimarybg">@label-primary-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-labelsuccessbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-labelsuccessbg">@label-success-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-labelinfobg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-labelinfobg">@label-info-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-labelwarningbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-labelwarningbg">@label-warning-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-labeldangerbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-labeldangerbg">@label-danger-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-labelcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-labelcolor">@label-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-labellinkhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-labellinkhovercolor">@label-link-hover-color</label>
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
                                    <input type="number" id="sass-modalinnerpadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modalinnerpadding">@modal-inner-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-modaltitlepadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modaltitlepadding">@modal-title-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-modaltitlelineheight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modaltitlelineheight">@modal-title-line-height</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modalcontentbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modalcontentbg">@modal-content-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modalcontentbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modalcontentbordercolor">@modal-content-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modalcontentfallbackbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modalcontentfallbackbordercolor">@modal-content-fallback-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modalbackdropbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modalbackdropbg">@modal-backdrop-bg</label>
                                </li>
                                <li>
                                    <input type="number" stop="0.01" id="sass-modalbackdropopacity" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modalbackdropopacity">@modal-backdrop-opacity</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modalheaderbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modalheaderbordercolor">@modal-header-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-modalfooterbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modalfooterbordercolor">@modal-footer-border-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-modallg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modallg">@modal-lg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-modalmd" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modalmd">@modal-md</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-modalsm" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-modalsm">@modal-sm</label>
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
                                    <input type="number" id="sass-alertpadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertpadding">@alert-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alertborderradius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertborderradius">@alert-border-radius</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alertlinkfontweight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertlinkfontweight">@alert-link-font-weight</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-alertsuccessbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertsuccessbg">@alert-success-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-alertsuccesstext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertsuccesstext">@alert-success-text</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alertsuccessborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertsuccessborder">@alert-success-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-alertinfobg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertinfobg">@alert-info-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-alertinfotext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertinfotext">@alert-info-text</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alertinfoborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertinfoborder">@alert-info-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-alertwarningbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertwarningbg">@alert-warning-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-alertwarningtext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertwarningtext">@alert-warning-text</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alertwarningborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertwarningborder">@alert-warning-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-alertdangerbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertdangerbg">@alert-danger-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-alertdangertext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertdangertext">@alert-danger-text</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-alertdangerborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-alertdangerborder">@alert-danger-border</label>
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
                                    <input type="color" id="sass-progressbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progressbg">@progress-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progressbarcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progressbarcolor">@progress-bar-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-progressborderradius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progressborderradius">@progress-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progressbarbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progressbarbg">@progress-bar-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progressbarsuccessbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progressbarsuccessbg">@progress-bar-success-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progressbarwarningbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progressbarwarningbg">@progress-bar-warning-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progressbardangerbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progressbardangerbg">@progress-bar-danger-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-progressbarinfobg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-progressbarinfobg">@progress-bar-info-bg</label>
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
                                    <input type="color" id="sass-listgroupbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgroupbg">@list-group-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-listgroupborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgroupborder">@list-group-border</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-listgroupborderradius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgroupborderradius">@list-group-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-listgrouphoverbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgrouphoverbg">@list-group-hover-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-listgroupactivecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgroupactivecolor">@list-group-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-listgroupactivebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgroupactivebg">@list-group-active-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-listgroupactiveborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgroupactiveborder">@list-group-active-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-listgroupactivetextcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgroupactivetextcolor">@list-group-active-text-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-listgroupdisabledcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgroupdisabledcolor">@list-group-disabled-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-listgroupdisabledbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgroupdisabledbg">@list-group-disabled-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-listgroupdisabledtextcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgroupdisabledtextcolor">@list-group-disabled-text-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-listgrouplinkcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgrouplinkcolor">@list-group-link-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-listgrouplinkhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgrouplinkhovercolor">@list-group-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-listgrouplinkheadingcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-listgrouplinkheadingcolor">@list-group-link-heading-color</label>
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
                                    <input type="color" id="sass-panelbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelbg">@panel-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-panelbodypadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelbodypadding">@panel-body-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-panelheadingpadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelheadingpadding">@panel-heading-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-panelfooterpadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelfooterpadding">@panel-footer-padding</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-panelborderradius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelborderradius">@panel-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelinnerborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelinnerborder">@panel-inner-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelfooterbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelfooterbg">@panel-footer-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-paneldefaulttext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paneldefaulttext">@panel-default-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paneldefaultborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paneldefaultborder">@panel-default-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paneldefaultheadingbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paneldefaultheadingbg">@panel-default-heading-bg</label>
                                </li>


                                <li>
                                    <input type="text" id="sass-panelprimarytext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelprimarytext">@panel-primary-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelprimaryborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelprimaryborder">@panel-primary-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelprimaryheadingbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelprimaryheadingbg">@panel-primary-heading-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-panelsuccesstext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelsuccesstext">@panel-success-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelsuccessborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelsuccessborder">@panel-primary-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelprimaryborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelprimaryborder">@panel-success-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelsuccessheadingbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelsuccessheadingbg">@panel-success-heading-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-panelinfotext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelinfotext">@panel-info-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelinfoborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelinfoborder">@panel-info-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelinfoheadingbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelinfoheadingbg">@panel-info-heading-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-panelwarningtext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelwarningtext">@panel-warning-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelwarningborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelwarningborder">@panel-warning-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-panelwarningheadingbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-panelwarningheadingbg">@panel-warning-heading-bg</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-paneldangertext" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paneldangertext">@panel-danger-text</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paneldangerborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paneldangerborder">@panel-danger-border</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-paneldangerheadingbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-paneldangerheadingbg">@panel-danger-heading-bg</label>
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
                                    <input type="number" id="sass-thumbnailpadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnailpadding">@thumbnail-padding</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-thumbnailbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnailbg">@thumbnail-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-thumbnailborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnailborder">@thumbnail-border</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-thumbnailborderradius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnailborderradius">@thumbnail-border-radius</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-thumbnailcaptioncolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnailcaptioncolor">@thumbnail-caption-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-thumbnailcaptionpadding" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-thumbnailcaptionpadding">@thumbnail-caption-padding</label>
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
                                    <input type="color" id="sass-wellbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-wellbg">@well-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-wellborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-wellborder">@well-border</label>
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
                                    <input type="color" id="sass-badgecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badgecolor">@badge-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-badgelinkhovercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badgelinkhovercolor">@badge-link-hover-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-badgebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badgebg">@badge-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-badgeactivecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badgeactivecolor">@badge-active-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-badgeactivebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badgeactivebg">@badge-active-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-badgefontweight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badgefontweight">@badge-font-weight</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-badgelineheight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badgelineheight">@badge-line-height</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-badgeborderradius" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-badgeborderradius">@badge-border-radius</label>
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
                                    <input type="number" id="sass-breadcrumbpaddingvertical" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumbpaddingvertical">@breadcrumb-padding-vertical</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-breadcrumbpaddinghorizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumbpaddinghorizontal">@breadcrumb-padding-horizontal</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-breadcrumbbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumbbg">@breadcrumb-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-breadcrumbcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumbcolor">@breadcrumb-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-breadcrumbactivecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumbactivecolor">@breadcrumb-active-color</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-breadcrumbseparator" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumbseparator">@breadcrumb-separator</label>
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
                                    <input type="text" id="sass-carouseltextshadow" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carouseltextshadow">@carousel-text-shadow</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-carouselcontrolcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumbpaddinghorizontal">@carousel-control-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-carouselcontrolwidth" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-breadcrumbbg">@carousel-control-width</label>
                                </li>
                                <li>
                                    <input type="number" step="0.01" id="sass-carouselcontrolopacity" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carouselcontrolopacity">@carousel-control-opacity</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-carouselcontrolfontsize" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carouselcontrolfontsize">@carousel-control-font-size</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-carouselindicatoractivebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carouselindicatoractivebg">@carousel-indicator-active-bg</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-carouselindicatorbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carouselindicatorbordercolor">@carouselindicatorbordercolor</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-carouselcaptioncolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-carouselcaptioncolor">@carousel-caption-color</label>
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
                                    <input type="number" id="sass-closefontweight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-closefontweight">@close-font-weight</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-closecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-closecolor">@close-color</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-closetextshadow" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-closetextshadow">@close-text-shadow</label>
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
                                    <input type="color" id="sass-codecolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-codecolor">@code-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-codebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-codebg">@code-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-kbdcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-kbdcolor">@kbd-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-kbdbg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-kbdbg">@kbd-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-prebg" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-prebg">@pre-bg</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-precolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-precolor">@pre-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-prebordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-prebordercolor">@pre-border-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-prescrollablemaxheight" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-prescrollablemaxheight">@pre-scrollable-max-height</label>
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
                                    <input type="number" id="sass-componentoffsethorizontal" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-componentoffsethorizontal">@component-offset-horizontal</label>
                                </li>
                                <li>
                                    <input type="text" id="sass-textmuted" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-textmuted">@text-muted</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-abbrbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-abbrbordercolor">@abbr-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-headingssmallcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-headingssmallcolor">@headings-small-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-blockquotesmallcolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-blockquotesmallcolor">@blockquote-small-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-blockquotefontsize" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-blockquotefontsize">@blockquote-font-size</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-blockquotebordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-blockquotebordercolor">@blockquote-border-color</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-pageheaderbordercolor" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-pageheaderbordercolor">@page-header-border-color</label>
                                </li>
                                <li>
                                    <input type="number" id="sass-dlhorizontaloffset" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-dlhorizontaloffset">@dl-horizontal-offset</label>
                                </li>
                                <li>
                                    <input type="color" id="sass-hrborder" onChange={this.setJsonData.bind(this)} />
                                    <label for="sass-hrborder">@hr-border</label>
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
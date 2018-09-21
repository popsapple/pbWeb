import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default class CategoryList extends React.Component {
	constructor(){
    	super();
    };

    onSelectDocType(event){
        this.store.store.dispatch(selectDocType({docType: event.target.value}));
    };

    render(){
        return(
            <div>
                <ul>
                  <li>
                    <input type="radio" name="docType" defaultChecked id="docType01" value="NameCard" onChange={this.onSelectDocType.bind(this)} />
                    <label htmlFor="docType01"></label>
                    <h3>명함</h3>
                  </li>
                  <li>
                    <input type="radio" name="docType" defaultChecked id="docType02" value="Banner" onChange={this.onSelectDocType.bind(this)} />
                    <label htmlFor="docType02"></label>
                    <h3>현수막</h3>
                  </li>
                  <li>
                    <input type="radio" name="docType" defaultChecked id="docType03" value="Poster" onChange={this.onSelectDocType.bind(this)} />
                    <label htmlFor="docType03"></label>
                    <h3>포스터</h3>
                  </li>
                  <li>
                    <input type="radio" name="docType" defaultChecked id="docType04" value="Leaflet" onChange={this.onSelectDocType.bind(this)} />
                    <label htmlFor="docType04"></label>
                    <h3>전단지</h3>
                  </li>
                  <li>
                    <input type="radio" name="docType" defaultChecked id="docType05" value="Invitation" onChange={this.onSelectDocType.bind(this)} />
                    <label htmlFor="docType05"></label>
                    <h3>초대장</h3>
                  </li>
                  <li>
                    <input type="radio" name="docType" defaultChecked id="docType06" value="Logo" onChange={this.onSelectDocType.bind(this)} />
                    <label htmlFor="docType06"></label>
                    <h3>로고</h3>
                  </li>
                  <li>
                    <input type="radio" name="docType" defaultChecked id="docType07" value="Instargarm" onChange={this.onSelectDocType.bind(this)} />
                    <label htmlFor="docType07"></label>
                    <h3>인스타</h3>
                  </li>
                  <li>
                    <input type="radio" name="docType" defaultChecked id="docType08" value="PPT" onChange={this.onSelectDocType.bind(this)} />
                    <label htmlFor="docType08"></label>
                    <h3>PPT</h3>
                  </li>
                </ul>
            </div>
        )
    }
}

CategoryList.contextTypes = {
    store: PropTypes.object
}
CategoryList.propTypes = {
    type: PropTypes.bool,
    ChangeMode: PropTypes.func
}

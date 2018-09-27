import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'masonry-layout/dist/masonry.pkgd.min';
import Masonry from 'masonry-layout';
const list = require('./../category.json');

export default class CategoryListItem extends React.Component {
	 constructor(){
    	super();
    };


    MoumentedImages(){
        var grid = document.querySelector('.category_list');
        document.querySelector('.category_select').className += " activing";
        var msnry = new Masonry( grid, {
          itemSelector: '.category_item',
          percentPosition: true
        });
        document.querySelector('.category_select').className = "category_select";     
    }

    render(){
        this.store = this.context;
        let index = this.props.idx;
        if (index == 0) {window.addEventListener("resize", this.MoumentedImages.bind(this))};
        return(
            <li className="category_item">
              {
                (()=>{
                  if(this.props.Checked){
                    return <input type="radio" name="docType" defaultChecked id={this.props.Id} value={this.props.Value} onChange={this.props.Change} />
                  }else{
                    return <input type="radio" name="docType" id={this.props.Id} value={this.props.Value} onChange={this.props.Change} />
                  }
                })()
              }
              <label htmlFor={this.props.Id}></label>
              <div>
                <span>
                {
                  (()=>{
                    if(index == 0){
                      return <img src={this.props.Image} alt={this.props.Id} title={this.props.Id} onLoad={this.MoumentedImages.bind(this)} />
                    }else{
                      return <img src={this.props.Image} alt={this.props.Id} title={this.props.Id} onLoad={this.MoumentedImages.bind(this)} />
                    }
                  })()
                }
                </span>
                <h3>{this.props.Name}</h3>
              </div>
            </li>
        )
    }
}

CategoryListItem.contextTypes = {
    store: PropTypes.object
}
CategoryListItem.propTypes = {
    Checked: PropTypes.bool,
    Name: PropTypes.string,
    Id: PropTypes.string,
    Image: PropTypes.string,
    Value: PropTypes.string,
    Change: PropTypes.func
}

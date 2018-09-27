import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategoryListItem from './../components/CategoryListItem';
import { selectDocType } from '../actions/actions';
const list = require('./../category.json');

export default class CategoryList extends React.Component {
	 constructor(){
    	super();
    };

    onSelectDocType(event){
        this.store.store.dispatch(selectDocType({docType: event.target.value}));
    };

    render(){
        this.store = this.context;
        let index = this.props.idx;
        let items = [];
        return(
            <div>
                <ul className="category_list">
                  <TempCategory idx={index} ChangeMode={this.onSelectDocType.bind(this)} />
                </ul>
            </div>
        )
    }
}

CategoryList.contextTypes = {
    store: PropTypes.object
}
CategoryList.propTypes = {
    idx: PropTypes.number,
    ChangeMode: PropTypes.func
}

class TempCategory extends React.Component {
  constructor(){
    super();
  };
  render(){
    this.store = this.context;
    let index = this.props.idx;
    let list_ = [];
    (() => {
        for(let i = 0; i < (index+1)*5; i++){
            if(list.categories[i]){
                let returnName = list.categories[i].name
                let returnImg = list.categories[i].thumbnail
                let returnId = list.categories[i].key
                let returnFun = this.props.ChangeMode
                let returnChecked;
                i == 0 && index == 0 ? returnChecked = true : returnChecked = false;
                console.log(list);
                list_.push(
                    <CategoryListItem Image={returnImg} Checked={returnChecked} Name={returnName} Id={returnId} Value={returnId} Change={returnFun} key={i} idx={i} />
                )  
            }
        
      }
    })()
    return list_;
  }
}
TempCategory.contextTypes = {
    store: PropTypes.object
}
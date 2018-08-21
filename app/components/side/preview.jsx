import React from 'react';
import { connect } from 'react-redux';
import { showEditorView, findEditor } from '../../actions/actions';

export default class SideComponentPreview extends React.Component{
	previewOpen() {
		console.log("state====================");
		console.log(store.getState());//this.props.maincontainer.querySelector(".fr-view").className= "fr-view active";
	}
    render(){
        return(
            <li>
    			<button onClick={this.previewOpen.bind(this)}>미리보기</button>
    		</li>
        )
    }
}
import React from 'react';
import { connect } from 'react-redux';
import { showEditorView, setEditorView } from '../../actions/actions';
import { SampleConsumer } from '../../context';

export default class SideComponentPreview extends React.Component{
	constructor(){
		super();
		this.state = {
			store: {}
		}
	};

	previewOpen() {
		let editor_view = this.store.getState().default.editor_view;
		console.log("==================")
		console.log(editor_view);
		if(editor_view.className.indexOf("active") != -1){
			editor_view.className = editor_view.className.replace(" active", "");
		}else{
			editor_view.className += " active";
		}
		//console.log(this.store.getState());//this.props.maincontainer.querySelector(".fr-view").className= "fr-view active";
	}

	componentDidMount(){
		this.setState({
    		store: this.store
    	})
	}

    render(){
        return(
	        <li>
	        	<SampleConsumer>
			      {
			        (sample) => (
			          <div>
			            {
			            	((sample)=> {this.store = sample})(sample)
			            }
			          </div>
			        )
			      }
			    </SampleConsumer>
    			<button onClick={this.previewOpen.bind(this)}>미리보기</button>
    		</li>
    	)
    }
}
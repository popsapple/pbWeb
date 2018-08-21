import React from 'react';
import { connect } from 'react-redux';
import { showEditorView, findEditor } from '../../actions/actions';
import { SampleConsumer } from '../../context';

export default class SideComponentPreview extends React.Component{
	constructor(){
		super();
		this.state = {
			store: {}
		}
	};

	previewOpen() {
		console.log(this.store.getState());
		//console.log(this.store.getState());//this.props.maincontainer.querySelector(".fr-view").className= "fr-view active";
	}

	componentDidMount(){
		this.setState({
    		store: this.store
    	})
	}
    render(){
        return(
        	<div>
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
	            <li>
	    			<button onClick={this.previewOpen.bind(this)}>미리보기</button>
	    		</li>
    		</div>
    	)
    }
}
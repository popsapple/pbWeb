import React from 'react';

export default class CompomentInfo extends React.Component{
    render(){
        return(
            <div style={this.props.DataStyle}>
            	<ul>
            		<li>
            			<label for="background">배경색(기본)</label>
            			<input type="text" id="background" />
            		</li>
            		<li>
            			<label for="border">테두리색</label>
            			<input type="text" id="background" />
            		</li>
            		<li>
            			<label for="mouseover_background">배경색(마우스오버)</label>
            			<input type="text" id="mouseover_background" />
            		</li>
            	</ul>
            </div>
        )
    }
}
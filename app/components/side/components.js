import React from 'react';
import fs from 'fs';
import { connect } from 'react-redux';

const {ipcRenderer} = require('electron');


export default class SideComponentList {
	constructor() {
		this.state = {
			layout_input_xs: "layout_input_xs",
			layout_input_sm: "layout_input_sm",
			layout_input_md: "layout_input_md",
			layout_input_lg: "layout_input_lg",
			layout_submit_btn: "layout_submit_btn",
			layout_val: {
				xs: "6 6",
				sm: "4 4 4",
				md: "6 6",
				lg: "3 3 3 3"
			}
		}

		this.layoutDivied;

	    this.list = [
			{
				"type": "layout",
				"id": 'other11',
				"iconhml": `<li style="display:none;">
					<input type="text" id="${this.state.layout_input_xs}" value="6 6" />
					<input type="text" id="${this.state.layout_input_sm}" value="4 4 4" />
					<input type="text" id="${this.state.layout_input_md}" value="6 6" />
					<input type="text" id="${this.state.layout_input_lg}" value="3 3 3 3" />
					<button draggable="true" id="${this.state.layout_submit_btn}">확인</button>
				</li>`,
				"html": `<div></div>`
			},
			{
				"type": "dropdown",
				"id": 'other01',
				"iconhml": `<li><button draggable="true" id="ComponentButton1">드롭다운</button></li>`,
				"html": `<div class="dropdown">
				  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
				    Dropdown
				    <span class="caret"></span>
				  </button>
				  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
				    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
				    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
				    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
				    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
				  </ul>
				</div>`
			}
		]
	}

	set ChangeState(elem) {
		this.state = Object.assign({...this.state}, elem);
	}


	LayoutContainerSetting(xs = "6 6", sm = "1 4 4", md = "2 4 4", lg = "3 3 3 3"){ // 만약 없애고 싶으면 0, 새 줄로 떨구고 싶으면 12
		var grid = [xs,sm,md,lg];
		var grid_devied = ["","","","","","","","","","","",""];
		var grid_devied_ = [];
		var grid_class = ["","","","","","","","","","","",""];
		var is_current_grid = true;
		var max_divied = 0;
		var count_list = 0;
		var err_ele = "";
		grid.map((ele,ele_idx)=>{
			var sum = 0;
			if(!(/^\d+(\s|\d)+\d$/g.test(ele) || /^\d+$/g.test(ele))){//숫자로 시작하고 중간에 공백이 있으며 숫자로 끝나는 경우
				err_ele = "isnum";
				is_current_grid = false;
			}else {
				var myRegexp = /(\d{1,})/g;
				var match = ele.match(myRegexp);
				if(max_divied < match.length){
					max_divied = match.length;
				}
				var type;
					switch(count_list){
						case 0:
							type = "xs"
							break;
						case 1:
							type = "sm"
							break;
						case 2:
							type = "md"
							break;
						case 3:
							type = "lg"
						break;			
				}
				for(var i = 0; i < max_divied; i++){

					grid_class[i] += " col-"+type+"-"+0; // 안쓰면 자동으로 0이 들어가도록
					match[i] ? sum+=parseInt(match[i]) : '';
					match.map((grid_num, idx)=>{
						if(i == idx){
							grid_class[i] += " col-"+type+"-"+grid_num;
						}
					});

				}
			}
			if(sum > 12 || sum < 12){
				err_ele = "over";
				console.log("열두개가 아닌게 있음 :: "+sum);
			};
			count_list++;
		});

		grid_devied.map((ele, idx)=>{
			if(grid_class[idx]){
				ele = "<div class='layout_box"+grid_class[idx]+"'><p><br/></p></div>";
				grid_devied_.push(ele);
			}
		})

		if(err_ele != ""){
			this.layoutDivied.html = "layoutnone";
			if(err_ele == "over"){
				alert("그리드의 총 합이 12개여야 합니다");
			}else{
				alert("그리드는 숫자와 공백으로만 입력해 주세요");
			}
		}else{
			this.layoutDivied.html = "<div class='container'>"+grid_devied_.join("")+"</div>";
		}
		
	}

	InsertCompomentEditor(idx){
		if(this.list[idx].html.indexOf("layoutnone") == -1){
			ipcRenderer.send('editor-drag', this.list[idx].html);
		}
	}

	ready(){
		document.getElementById(this.state.layout_input_xs).addEventListener("keyup",(event)=>{
			this.ChangeState = {layout_val: Object.assign({...this.state.layout_val},{xs: event.target.value})};
		},false);
		document.getElementById(this.state.layout_input_sm).addEventListener("keyup",(event)=>{
			this.ChangeState = {layout_val: Object.assign({...this.state.layout_val},{sm: event.target.value})};
		},false);
		document.getElementById(this.state.layout_input_md).addEventListener("keyup",(event)=>{
			this.ChangeState = {layout_val: Object.assign({...this.state.layout_val},{md: event.target.value})};
		},false);
		document.getElementById(this.state.layout_input_lg).addEventListener("keyup",(event)=>{
			this.ChangeState = {layout_val: Object.assign({...this.state.layout_val},{lg: event.target.value})};
		},false);

		document.getElementById(this.state.layout_submit_btn).addEventListener("dragstart",(event)=>{
			this.LayoutContainerSetting(this.state.layout_val.xs,this.state.layout_val.sm,this.state.layout_val.md,this.state.layout_val.lg);
		    if(this.layoutDivied.html.indexOf("layoutnone") == -1){
				ipcRenderer.send('editor-drag', this.layoutDivied.html);
			}
		},false);

		for(var index = 0; index < this.list.length; index++){
			if(index == 0){
				continue;
			}
			((index)=>{
				document.getElementById("ComponentButton"+index).removeEventListener("dragstart",()=>{});
				document.getElementById("ComponentButton"+index).addEventListener("dragstart",(event)=>{
					console.log("dragstart");
					this.InsertCompomentEditor(index);
					var img = document.createElement("img");
				    img.src = "";
				    event.dataTransfer.setDragImage(img, 0, 0);
				},false);
				document.getElementById("ComponentButton"+index).addEventListener("dragend",(event)=>{
					event.preventDefault();
              		event.stopPropagation();
				},false);
			})(index)
		}

		this.layoutDivied = this.list.find(function(element) {
		  return element.id.indexOf("other11") != -1;
		});
	}
}
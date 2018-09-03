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
				"iconhml": `<li>
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
			},
			{
				"type": "buttongroup",
				"id": 'other02',
				"iconhml": `<li><button draggable="true" id="ComponentButton2">버튼</button></li>`,
				"html": `<button type="button" class="btn btn-default">Left</button>`
			},
			{
				"type": "droupup",
				"id": 'other03',
				"iconhml": `<li><button draggable="true" id="ComponentButton3">드롭업</button></li>`,
				"html": `<div class="btn-group dropup">
				  <button type="button" class="btn btn-default">Dropup</button>
				  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				    <span class="caret"></span>
				    <span class="sr-only">Toggle Dropdown</span>
				  </button>
				  <ul class="dropdown-menu" role="menu">
				    <!-- Dropdown menu links -->
				  </ul>
				</div>`
			},
			{
				"type": "inputstyle",
				"id": 'other04',
				"iconhml": `<li><button draggable="true" id="ComponentButton4">인풋</button></li>`,
				"html": `<div class="input-group">
				  <span class="input-group-addon" id="basic-addon1">@</span>
				  <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
				</div>`
			},
			{
				"type": "tabstyle",
				"id": 'other05',
				"iconhml": `<li><button draggable="true" id="ComponentButton5">탭</button></li>`,
				"html": `<ul class="nav nav-tabs">
				  <li role="presentation" class="active"><a href="#">Home</a></li>
				  <li role="presentation"><a href="#">Profile</a></li>
				  <li role="presentation"><a href="#">Messages</a></li>
				</ul>`
			},
			{
				"type": "tabstyle02",
				"id": 'other06',
				"iconhml": `<li><button draggable="true" id="ComponentButton6">탭(알약형)</button></li>`,
				"html": `<ul class="nav nav-pills">
				  <li role="presentation" class="active"><a href="#">Home</a></li>
				  <li role="presentation"><a href="#">Profile</a></li>
				  <li role="presentation"><a href="#">Messages</a></li>
				</ul>`
			},
			{
				"type": "navigation",
				"id": 'other07',
				"iconhml": `<li><button draggable="true" id="ComponentButton7">네비게이션</button></li>`,
				"html": `<nav class="navbar navbar-default">
				  <div class="container-fluid">
				    <!-- Brand and toggle get grouped for better mobile display -->
				    <div class="navbar-header">
				      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
				        <span class="sr-only">Toggle navigation</span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				      </button>
				      <a class="navbar-brand" href="#">Brand</a>
				    </div>
				    <!-- Collect the nav links, forms, and other content for toggling -->
				    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				      <ul class="nav navbar-nav">
				        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
				        <li><a href="#">Link</a></li>
				        <li class="dropdown">
				          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
				          <ul class="dropdown-menu" role="menu">
				            <li><a href="#">Action</a></li>
				            <li><a href="#">Another action</a></li>
				            <li><a href="#">Something else here</a></li>
				            <li class="divider"></li>
				            <li><a href="#">Separated link</a></li>
				            <li class="divider"></li>
				            <li><a href="#">One more separated link</a></li>
				          </ul>
				        </li>
				      </ul>
				      <form class="navbar-form navbar-left" role="search">
				        <div class="form-group">
				          <input type="text" class="form-control" placeholder="Search">
				        </div>
				        <button type="submit" class="btn btn-default">Submit</button>
				      </form>
				      <ul class="nav navbar-nav navbar-right">
				        <li><a href="#">Link</a></li>
				        <li class="dropdown">
				          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
				          <ul class="dropdown-menu" role="menu">
				            <li><a href="#">Action</a></li>
				            <li><a href="#">Another action</a></li>
				            <li><a href="#">Something else here</a></li>
				            <li class="divider"></li>
				            <li><a href="#">Separated link</a></li>
				          </ul>
				        </li>
				      </ul>
				    </div><!-- /.navbar-collapse -->
				  </div><!-- /.container-fluid -->
				</nav>`
			},
			{
				"type": "pagination",
				"id": 'other07',
				"iconhml": `<li><button draggable="true" id="ComponentButton8">페이지네이션</button></li>`,
				"html": `<nav>
				  <ul class="pagination">
				    <li>
				      <a href="#" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				      </a>
				    </li>
				    <li><a href="#">1</a></li>
				    <li><a href="#">2</a></li>
				    <li><a href="#">3</a></li>
				    <li><a href="#">4</a></li>
				    <li><a href="#">5</a></li>
				    <li>
				      <a href="#" aria-label="Next">
				        <span aria-hidden="true">&raquo;</span>
				      </a>
				    </li>
				  </ul>
				</nav>`
			},
			{
				"type": "label",
				"id": 'other08',
				"iconhml": `<li><button draggable="true" id="ComponentButton9">라벨</button></li>`,
				"html": `<span class="label label-default">Default</span>
				<span class="label label-primary">Primary</span>
				<span class="label label-success">Success</span>
				<span class="label label-info">Info</span>
				<span class="label label-warning">Warning</span>
				<span class="label label-danger">Danger</span>`
			},
			{
				"type": "jumbotron",
				"id": 'other09',
				"iconhml": `<li><button draggable="true" id="ComponentButton10">점보트론</button></li>`,
				"html": `<div class="jumbotron">
				  <h1>Hello, world!</h1>
				  <p>...</p>
				  <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
				</div>`
			},
			{
				"type": "progress",
				"id": 'other10',
				"iconhml": `<li><button draggable="true" id="ComponentButton11">진행바</button></li>`,
				"html": `<div class="progress">
				  <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
				    60%
				  </div>
				</div>`
			},{
				"type": "progress",
				"id": 'other12',
				"iconhml": `<li><button draggable="true" id="ComponentButton12">레이어팝업</button></li>`,
				"html": `<!-- Button trigger modal -->
				<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
				  Launch demo modal
				</button>

				<!-- Modal -->
				<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
				      </div>
				      <div class="modal-body">
				        ...
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				        <button type="button" class="btn btn-primary">Save changes</button>
				      </div>
				    </div>
				  </div>
				</div>`
			},{
				"type": "progress",
				"id": 'other13',
				"iconhml": `<li><button draggable="true" id="ComponentButton13">슬라이더</button></li>`,
				"html": `<!-- Button trigger modal -->
				<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
				  Launch demo modal
				</button>

				<!-- Modal -->
				<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
				      </div>
				      <div class="modal-body">
				        ...
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				        <button type="button" class="btn btn-primary">Save changes</button>
				      </div>
				    </div>
				  </div>
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
		console.log("evented!!! "+this.list[idx].html.indexOf("layoutnone"));
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
				},false);
			})(index)
		}

		this.layoutDivied = this.list.find(function(element) {
		  return element.id.indexOf("other11") != -1;
		});
	}
}
export default class SideComponentList {
	constructor() {
	    this.list = [
			{
				"type": "dropdown",
				"id": 'other01',
				"iconhml": `<li><button>드롭다운</button></li>`,
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
				"iconhml": `<li><button>버튼그룹</button></li>`,
				"html": `<div class="btn-group" role="group" aria-label="...">
				  <button type="button" class="btn btn-default">Left</button>
				  <button type="button" class="btn btn-default">Middle</button>
				  <button type="button" class="btn btn-default">Right</button>
				</div>`
			},
			{
				"type": "droupup",
				"id": 'other03',
				"iconhml": `<li><button>드롭업</button></li>`,
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
				"iconhml": `<li><button>인풋</button></li>`,
				"html": `<div class="input-group">
				  <span class="input-group-addon" id="basic-addon1">@</span>
				  <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
				</div>`
			}
		]
	}
}
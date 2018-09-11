import { DROPEDITORHTML } from '../actions/actions';
import { DRAGEDITORHTML } from '../actions/actions';
import { combineReducers } from "redux"//findEdito

let editor = {
	dragitem: ""
}
const counter = (state = {}, action) => {
	console.log("countercountercountercounter");
    switch(action.type) {
        case DROPEDITORHTML:
		console.log("=========DROPEDITORHTML============");
		console.log(editor);
        	editor.dragitem = action.html;
	        return {
		      html: editor.dragitem
		    };
		case DRAGEDITORHTML:
		console.log("=========DRAGEDITORHTMLDRAGEDITORHTML============");
		console.log(editor);
	        return {
		      html: editor.dragitem
		    };
        default:
            return state;
    }
};

const counterApp = combineReducers({
    default: counter
});

export default counterApp;
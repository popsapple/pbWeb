import { SHOWEDITORVIEW } from '../actions/actions';
import { SETEDITORVIEW } from '../actions/actions';
import { combineReducers } from "redux"//findEdito

const counter = (state = {}, action) => {
    switch(action.type) {
        case SHOWEDITORVIEW:
	        return {
		      text: "SHOWEDITORVIEW",
		      completed: false
		    };
		case SETEDITORVIEW:
			return Object.assign({}, state, {
	        editor_view: action.ele
	      })  
        default:
            return state;
    }
};

const counterApp = combineReducers({
    default: counter
});

export default counterApp;
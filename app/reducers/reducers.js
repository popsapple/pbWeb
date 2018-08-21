import { SHOWEDITORVIEW } from '../actions/actions';
import { FINDEDITOR } from '../actions/actions';
import { combineReducers } from "redux"

const counter = (state = {}, action) => {
    switch(action.type) {
        case SHOWEDITORVIEW:
	        return {
		      text: "SHOWEDITORVIEW",
		      completed: false
		    };
		case FINDEDITOR:
			return Object.assign({}, state, {
	        testing: "findEditor02"
	      })  
        default:
            return state;
    }
};

const counterApp = combineReducers({
    counter
});

export default counterApp;
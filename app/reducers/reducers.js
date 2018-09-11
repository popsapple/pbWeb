import { DROPEDITORHTML } from '../actions/actions';
import { DRAGEDITORHTML } from '../actions/actions';
import { combineReducers } from "redux"//findEdito

const counter = (state = {}, action) => {
    switch(action.type) {
        case DROPEDITORHTML:
	        return {
		      html: action.html
		    };
		case DRAGEDITORHTML:
	        return {
		      html: action.html
		    };
        default:
            return state;
    }
};

const counterApp = combineReducers({
    default: counter
});

export default counterApp;
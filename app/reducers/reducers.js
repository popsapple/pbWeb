import { DROPEDITORHTML } from '../actions/actions';
import { DRAGEDITORHTML } from '../actions/actions';
import { SELECTDOCTYPE } from '../actions/actions';
import { combineReducers } from "redux"//findEdito


let store_obj = {};
const counter = (state = {}, action) => {
    switch(action.type) {
        case DROPEDITORHTML:
	        return store_obj = Object.assign(store_obj,{
		      html: action.html
		    })
		case DRAGEDITORHTML:
	        return store_obj = Object.assign(store_obj,{
		      html: action.html
		    })
		case SELECTDOCTYPE:
			console.log("action.docType :: "+action);
			console.log(action);
	        return store_obj = Object.assign(store_obj,{
		      docType: action.docType
		    })
        default:
            return state;
};
    }

const counterApp = combineReducers({
    default: counter
});

export default counterApp;
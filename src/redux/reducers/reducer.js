import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const chatLog = (state, action) => {
	if (action.type !== 'chatLog') return ['123'];
	return state.concat(action.payload);
}

const reducer = combineReducers({
	chatLog
});
export default reducer;
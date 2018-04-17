import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

// const chatLog = (state, action) => {
// 	if (action.type !== 'chatLog') return ['123'];
// 	return state.concat(action.payload);
// }

// const reducer = combineReducers({
// 	chatLog
// });

// export default (state = {}, action) => {
// 	if(action.type === 'checkoutUserTable') return { ...state, isShowUserTable: !state.isShowUserTable };
// 	if(action.type === 'userTableState') return { ...state, isShowUserTable: action.value };
// 	return state;
// };

const isShowUserTable = handleActions({
	'checkoutUserTable'(state, action) {
		return !state;
	},
	'userTableState'(state, action) {
		return action.payload;
	},
}, false)

const fetchList = handleActions({
	'request list'(state, action) {
		return state;
	},
	'receive list'(state, action) {
		const { req, res } = action.payload;
		return { ...state, ...res.data }
	}
}, {});

export default combineReducers({
	config: (state = {}) => state,
	fetchList,
	isShowUserTable,
})
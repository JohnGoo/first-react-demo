import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

// 可独立出文件，此处仅作例子
// 1、纯函数的reducer写法：
// const chatReducer = (state = defaultState, action = {}) => {
//   const { type, payload } = action;
//   switch (type) {
//     case ADD_CHAT:
//       return Object.assign({}, state, {
//         chatLog: state.chatLog.concat(payload)
//       });
//     case CHANGE_STATUS:
//       return Object.assign({}, state, {
//         statusMessage: payload
//       });
//     case CHANGE_USERNAME:
//       return Object.assign({}, state, {
//         userName: payload
//       });
//     default: return state;
//   }
// };

// 2、使用combineReducers的写法：(为了清晰，state[*]表示形参)
// const chatLog ＝ (state.chatLog, action) => {
// 	if (action.type !== this.name) return state.chatLog;
// 	return state.chatLog.concat(action.payload);
// }
// const statusMessage ＝ (state.statusMessage, action) => {
// 	if (action.type !== this.name) return state.statusMessage;
// 	return action.payload;
// }
// const userName ＝ (state.userName, action) => {
// 	if (action.type !== this.name) return state.userName;
// 	return action.payload;
// }
// const chatReducer = combineReducers({
//   chatLog,
//   statusMessage,
//   userName
// })

// 3、使用combineReducers + handleActions的写法：(为了清晰，state[*]作为形参没有简写)
// const reducers ＝ handleActions({
// 	chatLog(state, action) {
// 		return state.chatLog.concat(action.payload);
// 	},
// 	statusMessage(state, action) {
// 		return action.payload;
// 	},
// 	userName(state, action) {
// 		return action.payload;
// 	},
// }, {})
// const chatReducer = combineReducers({
// 	reducers
// })

exports default chatReducer;

// combineReducers理解：
// const combineReducers = reducers => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce(
//       (nextState, key) => {
//         nextState[key] = reducers[key](state[key], action);
//         return nextState;
//       },
//       {} 
//     );
//   };
// };

// export default handleActions({
// 	checkoutUserTable(state, action) {
// 		return { ...state, isShowUserTable: !state.isShowUserTable };
// 	},
// 	userTableState(state, action) {
// 		return { ...state, isShowUserTable: action.value };
// 	},
// }, {})
// handleActions 理解：
// 首先取出形参对象的key，用作action的type；形参的值用做处理函数；
// 然后调用了handleAction，传人type和处理函数，判断type，执行处理函数，返回state
// 最后调用了reduceReducer，返回一个新的reducer
// redux-actions的理解 ＝> https://www.cnblogs.com/ZSG-DoBestMe/p/5375647.html

// combineReducer与handleActions完全不同！！！
// handleActions里面的reduce会处理同一个state，combineReducer只做合并用；
let reducerADefault = {}, reducerBDefault = {};
const reducerA = handleActions({
	'abc'(state, action) {
		//...
	},
	'123'(state, action) {
		//...
	},
}, reducerADefault);
const reducerB = handleActions({
	'bcd'(state, action) {
		//...
	},
	'234'(state, action) {
		//...
	},
}, reducerBDefault);

combineReducers({
	reducerA,
	reducerB
});

// reducerA、reducerB是存储于store的state的值，通过connect进行映射为props使用。
// reducerADefault、reducerBDefault等同于state.reducerA、state.reducerB的初始值；
// 'abc'、'123'、'bcd'、'234'是action的type；
// 'abc'和'123'、'bcd'和'234'中的state和返回值分别是state.reducerA、state.reducerB的值；
// 'abc'和'123'同时作用于state.reducerA；'bcd'和'234'同时作用于state.reducerB；

// handleActions    =====> 原理是reduce()依次迭代state的值，state本身会被修改;
// combineReducer   =====> 原理是reduce()依次修改state[key]的值，只会修改state对象的属性值;

// combineReducer中state[key]的值等于handleActions的state！！！
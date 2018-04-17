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
// 	chatLog(state.chatLog, action) {
// 		return state.chatLog.concat(action.payload);
// 	},
// 	statusMessage(state.statusMessage, action) {
// 		return action.payload;
// 	},
// 	userName(state.userName, action) {
// 		return action.payload;
// 	},
// })
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
// 最后调用了reduceReducers，用于将handleActions进行combineReducers类似操作一次，返回一个新的reducer
// redux-actions的理解 ＝> https://www.cnblogs.com/ZSG-DoBestMe/p/5375647.html
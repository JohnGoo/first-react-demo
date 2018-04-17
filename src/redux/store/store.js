import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'middleware/logger';
import reducer from 'reducers/reducer';

const nextReducer = require('reducers/reducer');

export default function configure(initialState) {
  // console.log('initialState', initialState)
  const create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore;

  // 创建带有中间件的createStore
  const createStoreWithMiddleware = applyMiddleware(
    thunk,
    logger,
  )(create);

  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers/reducer', () => {
      store.replaceReducer(nextReducer)
    })
  }

  return store;
}
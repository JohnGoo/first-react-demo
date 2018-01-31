import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../pages/base/index'

// 登录
const Login = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/login').default)
  }, 'login')
}

/* 进入路由的判断 */
function isLogin(nextState, replaceState) {
  const token = sessionStorage.getItem('token')
  if (!token) {
    // replaceState('/login')
    // hashHistory.push('/login')
  }
}

const routes = (
  <Route>
    <Route path="/" component={App} onEnter={isLogin}>
      {/*<IndexRoute component={Welcome} />
         <Route path="/table" getComponent={table} />*/}
    </Route>
    <Route path="/login" getComponent={Login} />
    {/*<Route path="/register" getComponent={Register} />*/}
  </Route>
);

export default routes;
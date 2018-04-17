import React from 'react';
import { Route, IndexRoute, hashHistory } from 'react-router';

import App from '../pages/base/index';
import Welcome from '../pages/welcome'

// 登录
const Login = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/login').default)
    }, 'login')
}

// 列表
const List = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/list').default)
    }, 'list')
}

// 图表
const Table = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/table').default)
    }, 'list')
}

// 编辑器
const Edit = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/edit').default)
    }, 'list')
}

/* 进入路由的判断 */
function isLogin(nextState, replaceState) {
    const token = sessionStorage.getItem('token')
    if (!token) {
        // replaceState('/login')
        hashHistory.push('/login')
    }
}

const routes = (
    <Route>
	    <Route path="/" component={App} onEnter={isLogin}>
	      	<IndexRoute component={Welcome}/>
	        <Route path="/list" getComponent={List} />
            <Route path="/table" getComponent={Table} />
            <Route path="/edit" getComponent={Edit} />
	    </Route>
	    <Route path="/login" getComponent={Login} />
	    {/*<Route path="/register" getComponent={Register} />*/}
  	</Route>
);

export default routes;
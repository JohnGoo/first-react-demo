import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';

import routes from './route/route';
import configure from './redux/store/store';
import './config/config';

import './style/common.less';

const store = configure({ config: global.gconfig });

ReactDOM.render(
	<Provider store={store}>
    	<Router history={hashHistory} >
	      	{ routes }
	    </Router>
  	</Provider>,
    document.body.appendChild(document.createElement('div'))
);
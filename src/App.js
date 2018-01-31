import react from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import route from './route/route';
import configure from './redux/store/store';
import './config/config';

import './style/common.less';

const store = configure({});

ReactDOM.render(
	<Provider store={store}>
    	{ route }
  	</Provider>,
    document.body.appendChild(document.createElement('div'))
);
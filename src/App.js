import react from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import route from 'route/route';
import Store from 'store/store';
// import './config/config';

import 'style/common';

const store = Store()

ReactDOM.render(
	<Provider store={store}>
    	{ routes }
  	</Provider>,
    document.body.appendChild(document.createElement('div'))
);
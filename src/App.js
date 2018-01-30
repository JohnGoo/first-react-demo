import react from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';

import route from './route/route';
import store from './redux/store/store';
import './config/config';

import './style/common';

reactDom.render(
	<Provider store={store}>
		{route}
	<Provider>,
	document.body.appendChild(document.createElement('div'))
);
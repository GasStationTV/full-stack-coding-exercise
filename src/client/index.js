import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './redux/store';
import { syncHistoryWithStore} from 'react-router-redux';
import { Router, Route, browserHistory,Redirect,IndexRedirect  } from 'react-router';
const history = syncHistoryWithStore(browserHistory, store)

const routes = (
	<Provider store={store}>
		<App/>
	</Provider>
);

document.addEventListener('DOMContentLoaded', ()=> {
	ReactDOM.render(routes, document.getElementById('root'));
});

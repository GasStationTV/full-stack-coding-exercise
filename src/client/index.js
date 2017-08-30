import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './redux/store';

//String endsWith Polyfill
if (!String.prototype.endsWith)
  String.prototype.endsWith = function(searchStr, Position) {
      if (!(Position < this.length))
        Position = this.length;
      else
        Position |= 0; // round position
      return this.substr(Position - searchStr.length,
                         searchStr.length) === searchStr;
  };
const connectedApp = (
	<Provider store={store}>
		<App/>
	</Provider>
);

document.addEventListener('DOMContentLoaded', ()=> {
	ReactDOM.render(connectedApp, document.getElementById('root'));
});

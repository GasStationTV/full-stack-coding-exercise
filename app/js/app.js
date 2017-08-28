import React from 'react'
import ReactDOM from 'react-dom'
import Application from './components/Application.jsx'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import mainReducer from './reducers'
import logger from 'redux-logger'

let store = createStore(mainReducer, undefined, applyMiddleware(thunk, logger))

ReactDOM.render(<Application store={store} />, document.getElementById('app'));

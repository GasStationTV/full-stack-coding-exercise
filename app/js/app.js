import React from 'react'
import ReactDOM from 'react-dom'
import Application from './components/Application.jsx'
import { createStore } from 'redux'
import mainReducer from './reducers'

let store = createStore(mainReducer)

ReactDOM.render(<Application store={store} />, document.getElementById('app'));

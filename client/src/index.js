import React                            from 'react'
import ReactDom                         from 'react-dom'
import { Provider }                     from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools }          from 'redux-devtools-extension'
import Thunk                            from 'redux-thunk'

import App from './app'
import Reducers from './reducers'
import './style/main.scss'

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(Thunk))
)

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)

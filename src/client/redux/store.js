import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {routerMiddleware,routerReducer} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {sitesReducer} from './sitesReducer'
import {flagsListReducer} from './flagsListReducer'
const rootReducer = combineReducers({
  sitesReducer,
  flagsListReducer,
  routing: routerReducer
});
const middleware = applyMiddleware(
  routerMiddleware(hashHistory),
  thunk
);
const store = createStore(rootReducer,middleware);
export default store;

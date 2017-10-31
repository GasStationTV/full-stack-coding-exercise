import { applyMiddleware, createStore } from 'redux';
import sagaMiddleware from 'redux-saga';
import RootReducer from './rootReducer';
import RootSaga from './rootSaga';

export default function Store(initialState) {
  const store = createStore(
    RootReducer,
    initialState,
    applyMiddleware(sagaMiddleware(RootSaga))
  );
  return store;
}

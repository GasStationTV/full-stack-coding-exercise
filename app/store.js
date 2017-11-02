import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootReducer from './rootReducer';
import RootSaga from './rootSaga';
const sagaMiddleware = createSagaMiddleware();
export default function Store(initialState) {
  const store = createStore(
    RootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(RootSaga);
  return store;
}

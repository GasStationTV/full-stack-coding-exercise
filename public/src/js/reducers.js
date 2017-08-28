import { combineReducers } from 'redux';

import flagsReducer from './components/flags/reducer';
import flagCreateReducer from './components/flags/create/reducer';
import flagUpdateReducer from './components/flags/update/reducer';

const reducers = combineReducers({
  flagsReducer,
  flagCreateReducer,
  flagUpdateReducer
});

export default reducers;

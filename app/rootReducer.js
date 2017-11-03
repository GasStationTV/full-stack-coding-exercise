import { combineReducers } from 'redux';
import HomeReducer from './scenes/home/reducer';
import FlagFormReducer from './scenes/flagForm/reducer';


const RootReducer = combineReducers({
  HomeReducer,
  FlagFormReducer
});

export default RootReducer;

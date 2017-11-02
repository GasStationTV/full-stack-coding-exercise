import {
  NOW_LOADING,
  LOADING_COMPLETE,
  DELETE_FLAG_SUCCEEDED,
  DELETE_FLAG_FAILED,
  FETCH_ALL_FLAGS_SUCCEEDED,
  FETCH_ALL_FLAGS_FAILED
} from './constants';

const initialState = {
  flags: [],
  loading: false,
  error: null
};

const HomeReducer = (state = initialState, action) => {
  switch(action.type) {
    case NOW_LOADING:
      return Object.assign({}, state, {
        loading: true
      });

      case LOADING_COMPLETE:
        return Object.assign({}, state, {
          loading: false
        });

    case FETCH_ALL_FLAGS_SUCCEEDED:
      return Object.assign({}, state, {
        flags: action.flags
      });

    case FETCH_ALL_FLAGS_FAILED:
    case DELETE_FLAG_FAILED:
      return Object.assign({}, state, {
        error: action.error
      });

    case DELETE_FLAG_SUCCEEDED:
      return Object.assign({}, state, {
        flags: state.flags.filter(flag => {
          return flag._id !== action.id;
        })
      });

      default:
        return state;
  }
}

export default HomeReducer;

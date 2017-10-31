import {
  NOW_LOADING,
  LOADING_COMPLETE,
  DELETE_FLAG,
  DELETE_FLAG_FAILURE,
  FETCH_ALL_FLAGS,
  FETCH_ALL_FLAGS_FAILURE
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

    case FETCH_ALL_FLAGS:
      return Object.assign({}, state, {
        flags: action.flags
      });

    case FETCH_ALL_FLAGS_FAILURE:
    case DELETE_FLAG_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    case DELETE_FLAG:
      return Object.assign({}, state, {
        flags: state.flags.filter(flag =>
          flag.id !== action.id
        )
      });

      default:
        return state;
  }
}

export default HomeReducer;

import {
  FETCH_SINGLE_FLAG_REQUESTED,
  FETCH_SINGLE_FLAG_SUCEEEDED,
  FETCH_SINGLE_FLAG_FAILED,
  UPDATE_SINGLE_FLAG_REQUESTED,
  UPDATE_SINGLE_FLAG_SUCEEEDED,
  UPDATE_SINGLE_FLAG_FAILED,
  CREATE_FLAG_REQUESTED,
  CREATE_FLAG_SUCEEEDED,
  CREATE_FLAG_FAILED
} from './constants';

const initialState = {
  flagType: '',
  startDate: new Date(),
  endDate: new Date(),
  flagId: null,
  error: null
};

const flagFormReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_SINGLE_FLAG_SUCEEEDED:
      return Object.assign({}, state, {...action.flag});

    case FETCH_SINGLE_FLAG_FAILED:
    case UPDATE_SINGLE_FLAG_FAILED:
    case CREATE_FLAG_FAILED:
      return Object.assign({}, state, {
        error: action.error
      });

      default:
        return state;
  }
}

export default flagFormReducer;

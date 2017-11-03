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

export const fetchSingleFlagRequest = id => (
  {
    type: FETCH_SINGLE_FLAG_REQUESTED,
    id
  }
);

export const fetchSingleFlagSuccess = flag => (
  {
    type: FETCH_SINGLE_FLAG_SUCEEEDED,
    flag
  }
);

export const fetchSingleFlagFailure = error => (
  {
    type: FETCH_SINGLE_FLAG_FAILED,
    error
  }
);

export const updateSingleFlagRequest = (data, id) => (
  {
    type: UPDATE_SINGLE_FLAG_REQUESTED,
    data,
    id
  }
);

export const updateSingleFlagSuccess = () => (
  { type: UPDATE_SINGLE_FLAG_SUCEEEDED }
);

export const updateSingleFlagFailure = error => (
  {
    type: UPDATE_SINGLE_FLAG_FAILED,
    error
  }
);

export const createFlagRequest = data => (
  {
    type: CREATE_FLAG_REQUESTED,
    data
  }
);

export const createFlagSuccess = () => (
  { type: CREATE_FLAG_SUCEEEDED }
);

export const createFlagFailure = error => (
  {
    type: CREATE_FLAG_FAILED,
    error
  }
);

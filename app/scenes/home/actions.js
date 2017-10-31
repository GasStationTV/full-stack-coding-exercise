import {
  DELETE_FLAG_REQUESTED,
  DELETE_FLAG_SUCCEEDED,
  DELETE_FLAG_FAILED,
  FETCH_ALL_FLAGS_REQUESTED,
  FETCH_ALL_FLAGS_SUCCEEDED,
  FETCH_ALL_FLAGS_FAILED
} from './constants';

export const deleteFlagRequest = id => (
  {
    type: DELETE_FLAG_REQUESTED,
    id
  }
);

export const deleteFlagSuccess = id => (
  {
    type: DELETE_FLAG_SUCCEEDED,
    id
  }
);

export const deleteFlagFailure = error => (
  {
    type: DELETE_FLAG_FAILED,
    error
  }
);

export const fetchAllFlagsRequest = () => (
  { type: FETCH_ALL_FLAGS_REQUESTED }
);

export const fetchAllFlagsSuccess = flags => (
  {
    type: FETCH_ALL_FLAGS_SUCCEEDED,
    flags
  }
);

export const fetchAllFlagsFailure = error => (
  {
    type: FETCH_ALL_FLAGS,
    error
  }
);

import { createAction, createReducer } from 'redux-act';
import sitesService from '../../services/SitesService';

export const requestStart = createAction('SITES_REQUEST_START');
export const requestFail = createAction('SITES_REQUEST_FAIL');
export const requestSuccess = createAction('SITES_REQUEST_SUCCESS');

export const load = () => dispatch => {
  dispatch(requestStart());
  return sitesService
    .get('sites')
    .then(sites => {
      console.log('Sites retrieved successfully', sites);
      dispatch(requestSuccess(sites));
      return Promise.resolve(sites);
    })
    .catch(err => {
      console.error('Error retrieving sites', err);
      dispatch(requestFail(err));
      return Promise.reject(err);
    });
};

const initialState = {
  error: null,
  loading: false,
  list: []
};

export default createReducer(
  {
    [requestFail]: (state, payload) => ({
      ...initialState,
      error: payload
    }),
    [requestStart]: () => ({
      ...initialState,
      loading: true
    }),
    [requestSuccess]: (state, payload) => ({
      ...initialState,
      list: payload
    })
  },
  initialState
);

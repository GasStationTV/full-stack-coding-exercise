import { createAction, createReducer } from 'redux-act';
import sitesService from '../../services/SitesService';

export const loadStart = createAction('SITES_LOAD_START');
export const loadFail = createAction('SITES_LOAD_FAIL');
export const loadSuccess = createAction('SITES_LOAD_SUCCESS');

export const load = () => dispatch => {
  dispatch(loadStart());
  return sitesService
    .getSites()
    .then(sites => {
      console.log('Sites retrieved successfully', sites);
      dispatch(loadSuccess(sites));
      return Promise.resolve(sites);
    })
    .catch(err => {
      console.error('Error retrieving sites', err);
      dispatch(loadFail(err));
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
    [loadFail]: (state, payload) => ({
      ...initialState,
      error: payload
    }),
    [loadStart]: () => ({
      ...initialState,
      loading: true
    }),
    [loadSuccess]: (state, payload) => ({
      ...initialState,
      list: payload
    })
  },
  initialState
);

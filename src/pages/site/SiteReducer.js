import { createAction, createReducer } from 'redux-act';
import sitesService from '../../services/SitesService';

export const requestStart = createAction('SITE_REQUEST_START');
export const requestFail = createAction('SITE_REQUEST_FAIL');
export const requestSuccess = createAction('SITE_REQUEST_SUCCESS');

export const load = id => (dispatch, getState) => {
  // check state to see if it exists first
  const site =
    getState().sites && getState().sites.list.find(s => id === s._id);
  if (site) {
    dispatch(requestSuccess(site));
    return Promise.resolve(site);
  }
  dispatch(requestStart());
  return sitesService
    .getSite(id)
    .then(site => {
      console.log('Site retrieved successfully', site);
      dispatch(requestSuccess(site));
      return Promise.resolve(site);
    })
    .catch(err => {
      console.error('Error retrieving site', err);
      dispatch(requestFail(err));
      return Promise.reject(err);
    });
};

export const update = (id, site) => (dispatch, getState) => {
  return sitesService
    .updateSite(id, site)
    .then(newSite => {
      console.log('what is my res here?', newSite);
      dispatch(requestSuccess(newSite));
      return Promise.resolve(newSite);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const initialState = {
  error: null,
  loading: false,
  data: {
    flags: []
  }
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
      data: payload
    })
  },
  initialState
);

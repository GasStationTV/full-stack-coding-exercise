import { createAction, createReducer } from 'redux-act';
import sitesService from '../../services/SitesService';

export const loadStart = createAction('SITE_LOAD_START');
export const loadFail = createAction('SITE_LOAD_FAIL');
export const loadSuccess = createAction('SITE_LOAD_SUCCESS');

export const load = id => (dispatch, getState) => {
  // check state to see if it exists first
  const site =
    getState().sites && getState().sites.list.find(s => id === s._id);
  if (site) {
    dispatch(loadSuccess(site));
    return Promise.resolve(site);
  }
  dispatch(loadStart());
  return sitesService
    .getSite(id)
    .then(site => {
      console.log('Site retrieved successfully', site);
      dispatch(loadSuccess(site));
      return Promise.resolve(site);
    })
    .catch(err => {
      console.error('Error retrieving site', err);
      dispatch(loadFail(err));
      return Promise.reject(err);
    });
};

export const update = (id, site) => (dispatch, getState) => {
  return sitesService
    .updateSite(id, site)
    .then(newSite => {
      console.log('what is my res here?', newSite);
      dispatch(loadSuccess(newSite));
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
      data: payload
    })
  },
  initialState
);

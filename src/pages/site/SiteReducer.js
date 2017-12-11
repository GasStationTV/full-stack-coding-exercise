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
    .get(`site/${id}`)
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

export const update = newItem => (dispatch, getState) => {
  let { data } = getState().site;
  if (newItem._id) {
    data.flags = data.flags.map(
      item => (item._id === newItem._id ? newItem : item)
    );
  } else {
    data.flags = [...data.flags, newItem];
  }
  console.log('data after update????', data);
  return sitesService
    .update(data._id, data)
    .then(newData => {
      console.log('Site successfully updated', newData);
      dispatch(requestSuccess(newData));
      return Promise.resolve(newData);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

export const remove = id => (dispatch, getState) => {
  let { data } = getState().site;
  data.flags = data.flags.filter(item => item._id !== id);
  return sitesService
    .update(data._id, data)
    .then(newData => {
      console.log('Site successfully removed', newData);
      dispatch(requestSuccess(newData));
      return Promise.resolve(newData);
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

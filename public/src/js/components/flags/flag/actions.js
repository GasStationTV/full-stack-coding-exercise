import axios from 'axios';

import getFlags from '../actions';

const removeFlagStart = () => {
  return {
    type: 'FLAGS_REMOVE_START'
  };
};

const removeFlagDone = (payload) => {
  return {
    type: 'FLAGS_REMOVE_DONE',
    payload
  };
};

const removeFlagError = (payload) => {
  return {
    type: 'FLAGS_REMOVE_ERROR',
    payload
  };
};

const removeFlag = (flagId) => {
  return (dispatch) => {
    dispatch(removeFlagStart);

    axios.delete(`http://localhost:3001/api/v1/flags/${flagId}/`).then(() => {
      dispatch(removeFlagDone());
      dispatch(getFlags());
    }).catch((error) => {
      dispatch(removeFlagError({
        error: error.response.data.message
      }));
    });
  };
};

export default removeFlag;

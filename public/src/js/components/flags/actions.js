import axios from 'axios';

/**
 * Functions to handle retrieval of flags from API
 */

const getFlagsStart = () => {
  return {
    type: 'FLAGS_GET_START'
  };
};

const getFlagsDone = (payload) => {
  return {
    type: 'FLAGS_GET_DONE',
    payload
  };
};

const getFlagsError = (payload) => {
  return {
    type: 'FLAGS_GET_ERROR',
    payload
  };
};

const getFlags = () => {
  return (dispatch) => {
    dispatch(getFlagsStart());

    axios.get('http://localhost:3001/api/v1/flags/').then((response) => {
      dispatch(getFlagsDone({
        flags: response.data.flags
      }));
    }).catch((error) => {
      dispatch(getFlagsError({
        error: error.response.data.message
      }));
    });
  };
};

export default getFlags;

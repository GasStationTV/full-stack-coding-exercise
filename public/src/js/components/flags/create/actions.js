import axios from 'axios';

import getFlags from '../actions';

/**
 * Whether the component is visible or not
 * @param {Boolean} isVisible - True if visisble, false if not
 */
const updateIsVisible = (isVisible) => {
  return {
    type: 'FLAG_CREATE_IS_VISIBLE',
    payload: {
      isVisible
    }
  };
};

/**
 * Update type of flag
 * @param {String} type - Type of flag
 */
const updateFlagType = (type) => {
  return {
    type: 'FLAG_CREATE_UPDATE_TYPE',
    payload: {
      flag: {
        type
      }
    }
  };
};

/**
 * Update start date of flag
 * @param {Date} startDate - Start date for the flag
 */
const updateFlagStartDate = (startDate) => {
  return {
    type: 'FLAG_CREATE_UPDATE_START_DATE',
    payload: {
      flag: {
        start_date: startDate
      }
    }
  };
};

/**
 * Update end date of flag
 * @param {Date} endDate - End date for the flag
 */
const updateFlagEndDate = (endDate) => {
  return {
    type: 'FLAG_CREATE_UPDATE_END_DATE',
    payload: {
      flag: {
        end_date: endDate
      }
    }
  };
};

/**
 * Functions to handle creation of flag
 */
const createFlagStart = () => {
  return {
    type: 'FLAG_CREATE_START'
  };
};

const createFlagDone = () => {
  return {
    type: 'FLAG_CREATE_DONE'
  };
};

const createFlagError = (payload) => {
  return {
    type: 'FLAG_CREATE_ERROR',
    payload
  };
};

const createFlag = (flag) => {
  return (dispatch) => {
    dispatch(createFlagStart());

    axios.post('http://localhost:3001/api/v1/flags/', {
      flag: {
        ...flag
      }
    }).then(() => {
      dispatch(createFlagDone());
      dispatch(getFlags());
    }).catch((error) => {
      dispatch(createFlagError({
        error: error.response.data.message
      }));
    });
  };
};

export {
  updateIsVisible,
  updateFlagType,
  updateFlagStartDate,
  updateFlagEndDate,
  createFlag
};

import axios from 'axios';
import moment from 'moment';

import getFlags from '../actions';

/**
 * Whether the component is visible or not
 * @param {Boolean} isVisible - True if visisble, false if not
 */
const updateIsVisible = (isVisible) => {
  return {
    type: 'FLAG_UPDATE_IS_VISIBLE',
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
    type: 'FLAG_UPDATE_UPDATE_TYPE',
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
    type: 'FLAG_UPDATE_UPDATE_START_DATE',
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
    type: 'FLAG_UPDATE_UPDATE_END_DATE',
    payload: {
      flag: {
        end_date: endDate
      }
    }
  };
};

/**
 * Functions to handle updating of flag
 */
const updateFlagStart = () => {
  return {
    type: 'FLAG_UPDATE_START'
  };
};

const updateFlagDone = () => {
  return {
    type: 'FLAG_UPDATE_DONE'
  };
};

const updateFlagError = (payload) => {
  return {
    type: 'FLAG_UPDATE_ERROR',
    payload
  };
};

const updateFlag = (flag) => {
  return (dispatch) => {
    dispatch(updateFlagStart());

    axios.put(`http://localhost:3001/api/v1/flags/${flag._id}/`, {
      flag: {
        ...flag
      }
    }).then(() => {
      dispatch(updateFlagDone());
      dispatch(getFlags());
    }).catch((error) => {
      dispatch(updateFlagError({
        error: error.response.data.message
      }));
    });
  };
};

/**
 * Set entire state of flag (for when modal is initailly opened)
 */
const setFlagState = (flag) => {
  return {
    type: 'FLAG_UPDATE_SET_FLAG',
    payload: {
      flag: {
        ...flag,
        start_date: flag.start_date ? moment(flag.start_date) : null,
        end_date: flag.end_date ? moment(flag.end_date) : null
      }
    }
  };
};

export {
  updateIsVisible,
  updateFlagType,
  updateFlagStartDate,
  updateFlagEndDate,
  updateFlag,
  setFlagState
};

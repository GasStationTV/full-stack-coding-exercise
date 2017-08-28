const defaultState = {
  isVisible: false,
  flag: {}
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'FLAG_UPDATE_SET_FLAG': {
      console.log('---------------------');
      console.log(action.payload);
      console.log('---------------------');

      return {
        ...state,
        flag: {
          _id: action.payload.flag._id,
          type: action.payload.flag.type,
          start_date: action.payload.flag.start_date,
          end_date: action.payload.flag.end_date
        }
      };
    }
    case 'FLAG_UPDATE_IS_VISIBLE': {
      return {
        ...state,
        isVisible: action.payload.isVisible,
        flag: {}
      };
    }
    case 'FLAG_UPDATE_UPDATE_TYPE': {
      return {
        ...state,
        flag: {
          ...state.flag,
          type: action.payload.flag.type
        }
      };
    }
    case 'FLAG_UPDATE_UPDATE_START_DATE': {
      return {
        ...state,
        flag: {
          ...state.flag,
          start_date: action.payload.flag.start_date
        }
      };
    }
    case 'FLAG_UPDATE_UPDATE_END_DATE': {
      return {
        ...state,
        flag: {
          ...state.flag,
          end_date: action.payload.flag.end_date
        }
      };
    }
    case 'FLAG_UPDATE_DONE': {
      return {
        ...state,
        isVisible: false,
        flag: {}
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

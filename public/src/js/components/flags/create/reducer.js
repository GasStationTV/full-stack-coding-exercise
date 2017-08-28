const defaultState = {
  isVisible: false,
  flag: {}
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'FLAG_CREATE_IS_VISIBLE': {
      return {
        ...state,
        isVisible: action.payload.isVisible,
        flag: {}
      };
    }
    case 'FLAG_CREATE_UPDATE_TYPE': {
      return {
        ...state,
        flag: {
          ...state.flag,
          type: action.payload.flag.type
        }
      };
    }
    case 'FLAG_CREATE_UPDATE_START_DATE': {
      return {
        ...state,
        flag: {
          ...state.flag,
          start_date: action.payload.flag.start_date
        }
      };
    }
    case 'FLAG_CREATE_UPDATE_END_DATE': {
      return {
        ...state,
        flag: {
          ...state.flag,
          end_date: action.payload.flag.end_date
        }
      };
    }
    case 'FLAG_CREATE_DONE': {
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

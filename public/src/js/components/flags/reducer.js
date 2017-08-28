const defaultState = {
  flags: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'FLAGS_GET_DONE': {
      return {
        ...state,
        flags: action.payload.flags
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

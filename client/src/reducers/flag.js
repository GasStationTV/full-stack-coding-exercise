import Action from '../actions'

const { action_types } = Action
const DEFAULT_STATE = []

const reducers = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case action_types.RECEIVED_FLAGS: {
      return action.payload
    }

    default: return state
  }
}

export default reducers

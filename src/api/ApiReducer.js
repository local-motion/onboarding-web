import { SET_ACTIVE_STREAM } from "./ApiActions";


// State definition

const initialState = {
  activeStreams: {},        // Map on baseActionIdentifier to the active streamInstanceId
}

// Selectors
export const getActiveStreamForBaseAction = (state, baseActionIdentifier) => {
  console.log(state)
  return state.api.activeStreams[baseActionIdentifier]
}



// Reducer

export const apiReducer = (state = initialState, action, baseState) => {

  switch (action.type) {
    case SET_ACTIVE_STREAM:
      const newActiveStreams = {...state.activeStreams, [action.baseActionIdentifier]: action.streamInstanceId}
      return {
        ...state,
        activeStreams: newActiveStreams
      }
    default:
      return state
    }

}
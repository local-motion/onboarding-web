import { START_STREAM, STOP_STREAM, POLL_RESULT } from "./StreamActions";


// State definition

// stream object:
// {
//    streamIdentifier  : logical identifier of a stream (can span multiple stream instances). For example 'playground_b5795fc5-6c21-43ce-bce9-9ed382e050af'
//    instanceId:       : unique identifier of the technical stream (integer)
//    lastDigest        : digest of the result of the last fetch
// }

const initialState = {
  activeStreams: {},        // Map on streamIdentifier to the active streamInstanceId
}

// Selectors
export const getActiveStream = (state, streamIdentifier) => {
  console.log(state)
  return state.stream.activeStreams[streamIdentifier]
}



// Reducer

export const streamReducer = (state = initialState, action, baseState) => {

  switch (action.type) {
  case START_STREAM:
    // Note that this action is also used to restart/trigger streams
    {
      const newActiveStreams = {
        ...state.activeStreams, 
        [action.stream.streamIdentifier]: {...action.stream}
      }
      return {
        ...state,
        activeStreams: newActiveStreams
      }
    }
  case POLL_RESULT:
  {
    const newStream = {...state.activeStreams[action.streamIdentifier], lastDigest: action.digest}
    if (!newStream)
      return state

    const newActiveStreams = {
      ...state.activeStreams, 
      [action.streamIdentifier]: newStream
    }
    return {
      ...state,
      activeStreams: newActiveStreams
    }
  }
  case STOP_STREAM:
    {
      const newActiveStreams = {
        ...state.activeStreams, 
      }
      delete newActiveStreams[action.streamIdentifier]
      return {
        ...state,
        activeStreams: newActiveStreams
      }
    }
  default:
    return state
  }

}
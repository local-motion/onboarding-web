import { START_STREAM, STOP_STREAM, POLL_RESULT, POLL_TICK } from "./StreamActions";


// State definition

// stream object:
// {
//    streamIdentifier  : logical identifier of a stream (can span multiple stream instances). For example 'playground_b5795fc5-6c21-43ce-bce9-9ed382e050af'
//    instanceId        : unique identifier of the technical stream (integer)
//    lastDigest        : digest of the result of the last fetch
//    unmodifiedCount   : number of consecutive "not_modified" results from the last polls (will be reset to zero when an actual result comes in)
//    secondsCount      : number of seconds since the last poll
//    pollingInterval   : number of seconds between consecutive polls
// }

const initialState = {
  activeStreams: {},        // Map on streamIdentifier to the active streamInstanceId
}

// Selectors
export const getActiveStream = (state, streamIdentifier) => state.stream.activeStreams[streamIdentifier]
export const getActiveStreamsStartingWith = (state, streamIdentifierPrefix) => {
  const result = []
  for (let i in state.stream.activeStreams)
    if (i.startsWith(streamIdentifierPrefix))
      result.push(state.stream.activeStreams[i])
  return result
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
      
    case POLL_TICK:
    {
      const currentStream = state.activeStreams[action.streamIdentifier]
      const newStream = {
        ...currentStream, 
        secondsCount: currentStream.secondsCount !== undefined ? currentStream.secondsCount + 1 : 0
      }
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

    case POLL_RESULT:
    {
      const currentStream = state.activeStreams[action.streamIdentifier]
      const newStream = {
        ...currentStream,
        lastDigest: action.digest, 
        unmodifiedCount: action.modified ? 0 : currentStream.unmodifiedCount + 1,
        secondsCount: 0, 
        pollingInterval: action.pollingInterval
      }
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
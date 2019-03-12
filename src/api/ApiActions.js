import { executeQuery, GRAPHQL_QUERY } from "../GlobalActions";
import { getActiveStream } from "./ApiReducer";
import { isFunction } from "../utils/Generics";

export const CLEAR_ERROR = 'CLEAR_ERROR'

export const START_STREAM = 'START_STREAM'
export const STOP_STREAM = 'STOP_STREAM'
export const TRIGGER_STREAM = 'TRIGGER_STREAM'
export const POLL_RESULT = 'POLL_RESULT'


export const clearError = baseActionIdentifier => (
    {type: CLEAR_ERROR, baseActionIdentifier}
  )


const defaultStreamProperties = {
  variables: {},
  pollingInterval: 10000,
}

let streamCount = 0

// streamIdentifier : logical identifier of a stream (can span multiple stream instances). For example 'playground_b5795fc5-6c21-43ce-bce9-9ed382e050af'
// restart: set to true to restart another instance of the stream if the stream already exists, thereby guaranteeing an immediate fetch
export const startGraphQLStream = (streamIdentifier, baseActionIdentifier, graphQLQuery, variables, options, restart=false) => {
  const streamOptions = {...defaultStreamProperties, ...options, streamIdentifier, baseActionIdentifier, query: graphQLQuery, variables, type: GRAPHQL_QUERY}
  return startStream(streamOptions)
}

export const startStream = (streamOptions, restart=false) => (dispatch, getState) => {
  const stream = {...defaultStreamProperties, ...streamOptions}

  if (!stream.streamIdentifier)       throw new Error('No streamIdentifier set')
  if (!stream.type)                   throw new Error('No type set')
  if (!stream.baseActionIdentifier)   throw new Error('No baseActionIdentifier set')
  if (!stream.query)                  throw new Error('No query set')

  if (!restart && getActiveStream(getState(), stream.streamIdentifier))
    return  // stream already exists

  stream.instanceId = streamCount++

  dispatch( {type: START_STREAM, stream} )
  stream.interval = setInterval( () => poll(stream, dispatch, getState), stream.pollingInterval)

  // As setInterval first waits for the interval and then triggers the function, we trigger the function here for the first time for a swift response
  poll(stream, dispatch, getState, true)
}

export const stopStream = (streamIdentifier) => (dispatch, getState) => {
  const stream = getActiveStream(getState(), streamIdentifier)
  console.log('stopping stream ' + streamIdentifier + ': ', stream)
  if (stream) {
    dispatch( {type: STOP_STREAM, streamIdentifier} )
  }
}

export const triggerStream = (streamIdentifier) => (dispatch, getState) => {
  const activeStream = getActiveStream(getState(), streamIdentifier)
  if (activeStream)
    // dispatch(startGraphQLStream(activeStream.streamIdentifier, activeStream.baseActionIdentifier, activeStream.graphQLQuery, activeStream.variables, activeStream, true))
    dispatch(startStream(activeStream, true))
  else
    console.warn('Cannot trigger stream ' + streamIdentifier + ' as it is not active')
}

const poll = (stream, dispatch, getState, firstPoll=false) => {
  const activeStream = getActiveStream(getState(), stream.streamIdentifier)

  if (activeStream) {
    const variables = firstPoll && stream.initialVariables ? 
                        (activeStream ? {...stream.initialVariables, _lastDigest: activeStream.lastDigest} : stream.initialVariables)
                        :
                        (activeStream ? {...stream.variables, _lastDigest: activeStream.lastDigest} : stream.variables)


    const onSuccessPrepublish = (data, dispatch, getState, queryOptions, response) => {
      // cancel the result dispatching when this is no longer the active stream
      const activeStream = getActiveStream(getState(), stream.streamIdentifier)
      const cancel = !(activeStream && (activeStream.instanceId === stream.instanceId))
      return cancel
    }

    const onCompletionPrepublish = (data, dispatch, getState, queryOptions, response) => {
      const activeStream = getActiveStream(getState(), stream.streamIdentifier)
      if (activeStream && (activeStream.instanceId === stream.instanceId)) {
        // just continue
      }
      else
       clearInterval(stream.interval)
    }

    const onCompletion = (data, dispatch, getState, queryOptions, response) => {
      if (data && data.digest)  
        dispatch( {type: POLL_RESULT, streamIdentifier: stream.streamIdentifier, digest: data.digest} )
    }

    // The query can be both a function returning the query (string or document) or the query itself
    const queryToExecute = firstPoll && stream.initialQuery ? stream.initialQuery : stream.query
    const queryString = isFunction(queryToExecute) ? queryToExecute(stream, dispatch, getState) : queryToExecute
    const auxParameters = {
      firstPoll
    }
    dispatch(executeQuery( {
      type: stream.type,
      baseActionIdentifier: stream.baseActionIdentifier, 
      fetchId: stream.streamIdentifier,
      query: queryString,
      variables,
      auxParameters,
      onSuccessPrepublish,
      onCompletionPrepublish,
      onCompletion,
    }))
  }
}

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
export const startGraphQLStream = (streamIdentifier, baseActionIdentifier, graphQLQuery, variables) => {
  const streamOptions = {...defaultStreamProperties, streamIdentifier, baseActionIdentifier, query: graphQLQuery, variables, type: GRAPHQL_QUERY}
  return startStream(streamOptions)
}

export const startStream2 = (streamIdentifier, query, streamOptions, restart=false) => (dispatch, getState) => {
  const stream = {...defaultStreamProperties, ...streamOptions, streamIdentifier, query, originalOptions: streamOptions}

  if (!stream.streamIdentifier)       throw new Error('No streamIdentifier set')
  if (!stream.query)                  throw new Error('No query set')

  if (!restart && getActiveStream(getState(), stream.streamIdentifier))
    return  // stream already exists

  stream.instanceId = streamCount++

  dispatch( {type: START_STREAM, stream} )
  stream.interval = setInterval( () => poll2(stream, dispatch, getState), stream.pollingInterval, false)

  // As setInterval first waits for the interval and then triggers the function, we trigger the function here for the first time for a swift response
  poll2(stream, dispatch, getState, true)
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

export const triggerStream2 = (streamIdentifier) => (dispatch, getState) => {
  const activeStream = getActiveStream(getState(), streamIdentifier)
  if (activeStream)
    dispatch(startStream2(activeStream.streamIdentifier, activeStream.query, activeStream.originalOptions, true))
  else
    console.warn('Cannot trigger stream ' + streamIdentifier + ' as it is not active')
}

export const triggerStream = (streamIdentifier) => (dispatch, getState) => {
  const activeStream = getActiveStream(getState(), streamIdentifier)
  if (activeStream)
    dispatch(startStream(activeStream, true))
  else
    console.warn('Cannot trigger stream ' + streamIdentifier + ' as it is not active')
}

const poll2 = (stream, dispatch, getState, firstPoll=false) => {
  const activeStream = getActiveStream(getState(), stream.streamIdentifier)

  if (activeStream) {

    // Determine the query object for this poll. The stream.query property can contain this (static) object,
    // or a function that will return the query object for each poll
    const baseQuery = isFunction(stream.query) ? stream.query(stream, dispatch, getState, firstPoll) : stream.query


    // Create some interceptors to cancel the stream if necessary
    const onSuccessPrepublish = (data, dispatch, getState, queryOptions, response) => {
      // cancel the result dispatching when this is no longer the active stream, also do not invoke the query's ...prepublish methods anymore
      const activeStream = getActiveStream(getState(), stream.streamIdentifier)
      const cancel = !(activeStream && (activeStream.instanceId === stream.instanceId))
      if (!cancel && baseQuery.onSuccessPrepublish)
        baseQuery.onSuccessPrepublish(data, dispatch, getState, queryOptions, response)
      return cancel
    }

    const onFailPrepublish = (data, dispatch, getState, queryOptions, response) => {
      // cancel the result dispatching when this is no longer the active stream, also do not invoke the query's ...prepublish methods anymore
      const activeStream = getActiveStream(getState(), stream.streamIdentifier)
      const cancel = !(activeStream && (activeStream.instanceId === stream.instanceId))
      if (!cancel && baseQuery.onFailPrepublish)
        baseQuery.onFailPrepublish(data, dispatch, getState, queryOptions, response)
      return cancel
    }

    const onCompletionPrepublish = (data, dispatch, getState, queryOptions, response) => {
      const activeStream = getActiveStream(getState(), stream.streamIdentifier)
      const cancel = !(activeStream && (activeStream.instanceId === stream.instanceId))
      if (!cancel) {
        // just continue
        baseQuery.onCompletionPrepublish && baseQuery.onCompletionPrepublish(data, dispatch, getState, queryOptions, response)
      }
      else
       clearInterval(stream.interval)
    }

    const onCompletion = (data, dispatch, getState, queryOptions, response) => {
      if (data && data.digest)  
        dispatch( {type: POLL_RESULT, streamIdentifier: stream.streamIdentifier, digest: data.digest} )
        baseQuery.onCompletion && baseQuery.onCompletion(data, dispatch, getState, queryOptions, response)
    }


    // Compose the query to execute
    const query = {
      ...baseQuery,
      variables: {...baseQuery.variables, _lastDigest: activeStream.lastDigest},
      onSuccessPrepublish,
      onFailPrepublish,
      onCompletionPrepublish,
      onCompletion
    }

    // Execute the query
    dispatch(executeQuery(query))
  }
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

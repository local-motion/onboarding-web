import { executeQuery, GRAPHQL_QUERY } from "./QueryActions";
import { getActiveStream } from "./StreamReducer";
import { isFunction } from "../utils/Generics";
import { logdebug } from "utils/Logging";

export const CLEAR_ERROR = 'CLEAR_ERROR'

export const START_STREAM = 'START_STREAM'
export const STOP_STREAM = 'STOP_STREAM'
export const TRIGGER_STREAM = 'TRIGGER_STREAM'
export const POLL_RESULT = 'POLL_RESULT'
export const POLL_TICK = 'POLL_TICK'


export const clearError = baseActionIdentifier => (
    {type: CLEAR_ERROR, baseActionIdentifier}
  )

export const pollingIntervalSetterFactory = (minimumPollingInterval, maximumPollingInterval, intervalIncrement) => {
  const increment = intervalIncrement || Math.ceil((maximumPollingInterval - minimumPollingInterval) / 10)
  return unmodifiedCount => {
    return minimumPollingInterval + Math.min(unmodifiedCount * increment, maximumPollingInterval)
  }
}

const defaultStreamProperties = {
  pollingIntervalSetter: pollingIntervalSetterFactory(5, 60, 5)   // function that returns the interval length in seconds based on the number of consecutive "unmodified" poll results: unmodifiedCount => Integer
}

let streamCount = 0

// Convenience method for starting a stream of simple graphQL queries
export const startGraphQLStream = (streamIdentifier, baseActionIdentifier, graphQLQuery, variables) => {
  const queryOptions = {
    type: GRAPHQL_QUERY,      
    baseActionIdentifier,
    query: graphQLQuery,
    variables,
  }

  return startStream(streamIdentifier, queryOptions)
}


/**
 * Start a stream that will poll a query indefinitely 
 * 
 * @param {*} streamIdentifier logical identifier of a stream (can span multiple stream instances). For example 'playground_b5795fc5-6c21-43ce-bce9-9ed382e050af'
 * @param {*} queryOptions queryOptions object or function returning a queryOptions object (will be invoked for each poll)
 * @param {*} streamOptions additional settings for the stream, such as polling interval (optional)
 * @param {*} restart set to true in order to force a restart of the stream, if applicable (optional, default=false)
 */
export const startStream = (streamIdentifier, queryOptions, streamOptions, restart=false) => (dispatch, getState) => {
  const stream = {...defaultStreamProperties, ...streamOptions, streamIdentifier, queryOptions, originalOptions: streamOptions}

  if (!stream.streamIdentifier)                                       throw new Error('No streamIdentifier set')
  if (!stream.queryOptions)                                           throw new Error('No query set')
  if (stream.maximumPollingInterval < stream.minimumPollingInterval)  throw new Error('Maximum polling interval cannot be lower than minimum interval')

  if (!restart && getActiveStream(getState(), stream.streamIdentifier))
    return  // stream already exists

  stream.instanceId = streamCount++

  dispatch( {type: START_STREAM, stream} )
  stream.interval = setInterval( () => poll(stream, dispatch, getState), 1000)

  // As setInterval first waits for the interval and then triggers the function, we trigger the function here for the first time for a swift response
  poll(stream, dispatch, getState)
}

export const stopStream = (streamIdentifier) => (dispatch, getState) => {
  const stream = getActiveStream(getState(), streamIdentifier)
  logdebug('stopping stream ' + streamIdentifier + ': ', stream)
  if (stream) {
    dispatch( {type: STOP_STREAM, streamIdentifier} )
  }
}

export const triggerStream = (streamIdentifier) => (dispatch, getState) => {
  const activeStream = getActiveStream(getState(), streamIdentifier)
  logdebug('triggering stream ' + streamIdentifier + ' which is ' + (activeStream ? "active" : "not active"), activeStream)
  if (activeStream)
    dispatch(startStream(activeStream.streamIdentifier, activeStream.queryOptions, activeStream.originalOptions, true))
  else
    console.warn('Cannot trigger stream ' + streamIdentifier + ' as it is not active')
}


const poll = (stream, dispatch, getState) => {
  const activeStream = getActiveStream(getState(), stream.streamIdentifier)

  if (activeStream) {

    // Increase the second counter of this stream and check whether it is time to actually do another poll
    if (!(activeStream.secondsCount === undefined || activeStream.secondsCount >= activeStream.pollingInterval-1)) {
      dispatch( {type: POLL_TICK, streamIdentifier: stream.streamIdentifier} )
      return
    }

    // Determine the query object for this poll. The stream.query property can contain this (static) object,
    // or a function that will return the query object for each poll
    const baseQueryOptions = isFunction(stream.queryOptions) ? stream.queryOptions(stream, dispatch, getState) : stream.queryOptions


    // Create some interceptors to cancel the stream if necessary
    const onSuccessPrepublish = (data, dispatch, getState, queryOptions, response) => {
      // cancel the result dispatching when this is no longer the active stream, also do not invoke the query's ...prepublish methods anymore
      const activeStream = getActiveStream(getState(), stream.streamIdentifier)
      const cancel = !(activeStream && (activeStream.instanceId === stream.instanceId))
      if (!cancel && baseQueryOptions.onSuccessPrepublish)
        baseQueryOptions.onSuccessPrepublish(data, dispatch, getState, queryOptions, response)
      return cancel
    }

    const onFailPrepublish = (data, dispatch, getState, queryOptions, response) => {
      // cancel the result dispatching when this is no longer the active stream, also do not invoke the query's ...prepublish methods anymore
      const activeStream = getActiveStream(getState(), stream.streamIdentifier)
      const cancel = !(activeStream && (activeStream.instanceId === stream.instanceId))
      if (!cancel && baseQueryOptions.onFailPrepublish)
        baseQueryOptions.onFailPrepublish(data, dispatch, getState, queryOptions, response)
      return cancel
    }

    const onCompletionPrepublish = (data, dispatch, getState, queryOptions, response) => {
      const activeStream = getActiveStream(getState(), stream.streamIdentifier)
      const cancel = !(activeStream && (activeStream.instanceId === stream.instanceId))
      if (!cancel) {
        // just continue
        baseQueryOptions.onCompletionPrepublish && baseQueryOptions.onCompletionPrepublish(data, dispatch, getState, queryOptions, response)
      }
      else
       clearInterval(stream.interval)
    }

    const onCompletion = (data, dispatch, getState, queryOptions, response) => {
      if (data) {
        const modifiedResult = data.status !== 'not_modified' && data.code !== 'NETWORK'    // Also count network errors as an unmodified result
        const unmodifiedCount = modifiedResult ? 0 : activeStream.unmodifiedCount + 1
        const newPollingInterval = activeStream.pollingIntervalSetter(unmodifiedCount)
        dispatch( {type: POLL_RESULT, streamIdentifier: stream.streamIdentifier, digest: data.digest, modified: modifiedResult, pollingInterval: newPollingInterval} )
        baseQueryOptions.onCompletion && baseQueryOptions.onCompletion(data, dispatch, getState, queryOptions, response)
      }
    }


    // Compose the query to execute
    const queryOptions = {
      ...baseQueryOptions,
      variables: {...baseQueryOptions.variables, _lastDigest: activeStream.lastDigest},
      onSuccessPrepublish,
      onFailPrepublish,
      onCompletionPrepublish,
      onCompletion
    }

    // Execute the query
    dispatch(executeQuery(queryOptions))
  }
}

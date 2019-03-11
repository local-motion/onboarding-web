import { executeQuery } from "../GlobalActions";
import { getActiveStream } from "./ApiReducer";

export const CLEAR_ERROR = 'CLEAR_ERROR'

export const START_STREAM = 'START_STREAM'
export const STOP_STREAM = 'STOP_STREAM'
export const TRIGGER_STREAM = 'TRIGGER_STREAM'
export const POLL_RESULT = 'POLL_RESULT'

export const STREAM_TYPE_GRAPHQL = 'GRAPHQL'


export const clearError = baseActionIdentifier => (
    {type: CLEAR_ERROR, baseActionIdentifier}
  )


const defaultGraphQLStreamProperties = {
  variables: {},
  pollingInterval: 5000,
}

let streamCount = 0

// streamIdentifier : logical identifier of a stream (can span multiple stream instances). For example 'playground_b5795fc5-6c21-43ce-bce9-9ed382e050af'
// restart: set to true to restart another instance of the stream if the stream already exists, thereby guaranteeing an immediate fetch
export const startGraphQLStream = (streamIdentifier, baseActionIdentifier, graphQLQuery, variables, options, restart=false) => (dispatch, getState) => {

  if (!restart && getActiveStream(getState(), streamIdentifier))
    return  // stream already exists

  const stream = {...defaultGraphQLStreamProperties, ...options, streamIdentifier, baseActionIdentifier, graphQLQuery, variables, type: STREAM_TYPE_GRAPHQL}
   
  if (!stream.streamIdentifier)       throw new Error('No streamIdentifier set')
  if (!stream.baseActionIdentifier)   throw new Error('No baseActionIdentifier set')
  if (!stream.graphQLQuery)           throw new Error('No graphQLQuery set')

  stream.instanceId = streamCount++

  dispatch( {type: START_STREAM, stream} )
  stream.interval = setInterval( () => pollGraphQL(stream, dispatch, getState), stream.pollingInterval)

  // As setInterval first waits for the interval and then triggers the function, we trigger the function here for the first time for a swift response
  pollGraphQL(stream, dispatch, getState)
}

export const stopStream = (streamIdentifier) => (dispatch, getState) => {
  const stream = getActiveStream(getState(), streamIdentifier)
  if (stream) {
    dispatch( {type: STOP_STREAM, streamIdentifier} )
  }
}

export const triggerStream = (streamIdentifier) => (dispatch, getState) => {
  const activeStream = getActiveStream(getState(), streamIdentifier)
  if (activeStream)
    dispatch(startGraphQLStream(activeStream.streamIdentifier, activeStream.baseActionIdentifier, activeStream.graphQLQuery, activeStream.variables, activeStream, true))
  else
    console.warn('Cannot trigger stream ' + streamIdentifier + ' as it is not active')
}

const pollGraphQL = (stream, dispatch, getState) => {
  const activeStream = getActiveStream(getState(), stream.streamIdentifier)

  if (activeStream) {
    const variables = activeStream ? {...stream.variables, _lastDigest: activeStream.lastDigest} : stream.variables

    const onCompletionCallback = data => {

      if (data && data.digest)  
        dispatch( {type: POLL_RESULT, streamIdentifier: stream.streamIdentifier, digest: data.digest} )

      const activeStream = getActiveStream(getState(), stream.streamIdentifier)
      if (activeStream && (activeStream.instanceId === stream.instanceId)) {
        // just continue
      }
      else
       clearInterval(stream.interval)
    }

    dispatch(executeQuery( {
      type: 'GRAPHQL_QUERY',
      baseActionIdentifier: stream.baseActionIdentifier, 
      fetchId: stream.streamIdentifier,
      query: stream.graphQLQuery, 
      variables,
      onCompletion: onCompletionCallback
    }))
  }
}

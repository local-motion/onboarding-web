import { fetchGraphQL } from "../GlobalActions";
import { getActiveStreamForBaseAction } from "./ApiReducer";

export const CLEAR_ERROR = 'CLEAR_ERROR'
export const SET_ACTIVE_STREAM = 'SET_ACTIVE_STREAM'


export const clearError = baseActionIdentifier => (
    {type: CLEAR_ERROR, baseActionIdentifier}
  )


const defaultGraphQLOptions = {
  variables: {},
  pollingInterval: 5000,
}

let streamCount = 0

// const setNewActiveStream = streamIdentifier => ({
//   streamIdentifier,
//   streamInstanceId: streamCount++
// })

export const startGraphQLPolling = (baseActionIdentifier, graphQLQuery, variables, options) => (dispatch, getState) => {
  //  const query = graphQLQuery || options.graphQLQuery
  //  const queryVariables = variables || options.variables

  const settings = {...defaultGraphQLOptions, ...options, baseActionIdentifier, graphQLQuery, variables}
   
  if (!settings.baseActionIdentifier)   throw new Error('No baseActionIdentifier set')
  if (!settings.graphQLQuery)           throw new Error('No graphQLQuery set')

  const streamInstanceId = streamCount++

  dispatch( {type: SET_ACTIVE_STREAM, baseActionIdentifier, streamInstanceId} )

  pollGraphQL(streamInstanceId, settings, dispatch, getState)

  // repeat()

}

const pollGraphQL = (streamInstanceId, settings, dispatch, getState) => {
  dispatch(fetchGraphQL(settings.baseActionIdentifier, settings.graphQLQuery, settings.variables, streamInstanceId, true, data => {
    // alert('en we zijn terug!')

    console.log('settings ', settings)
    if (data && data.data && data.data.digest)
      settings.variables._lastDigest = data.data.digest
    console.log('settings ', settings)

    // const newVariables = {...settings.variables, _lastDigest:data.digest}
    // const newSettings = {...settings, variables: newVariables}
    // console.log('new settings ', newSettings)

    // console.log('data ', data)
    // console.log('digest ', data.digest)

    // TODO we need to prevent processing the result if we are no longer the active stream (reducer???)
    if (getActiveStreamForBaseAction(getState(), settings.baseActionIdentifier) === streamInstanceId) {
      // this is still an active stream, schedule the next poll
      setTimeout(() => pollGraphQL(streamInstanceId, settings, dispatch, getState), settings.pollingInterval)
    }
  }))
}

// const repeat = () => {
//   console.log('hi')
//   setTimeout(repeat, 500)
// }

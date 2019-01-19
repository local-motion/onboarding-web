import { CLEAR_ERROR } from "./ApiActions";
// credits to: https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

// This reducer will keep the detailed state for all fetch actions carrying the fetchId attribute

// State

const initialState = {}   // map with base action identifier as key

const initialEntryState = {
  lastSuccessfullFetch: null,
  error: null,
  fetchStart: null
}   

/* each entry (value) has this structure:

    {}  map with the fetchId as key

    value of the entries:
    {
      lastSuccessfullFetch [Datetime of receiving a successfull fetch]
      error [Object, null indicates there is no error. Cleared when another fetch is triggered]
      fetchStart [Datetime of a fetch that is still in progress. Null indicates that no fetch is in progress]
    }

    error object:
    {
      code    [String]
      message [String]
    }    

    Example state:
    {
      GET_PLAYGROUNDS: {
        Pc696a27e_8d12_4c23_ba7d_c7d809c8336b: {
          lastSuccessfullFetch: 1234567,
          error: {
            code: '1234',
            message: 'an error has occurred'
          },
          fetchStart: null
        },
        Pc696a27e_8d12_4c23_ba7d_xxxxxxxxxxxx: {
          ...
        },
      }
      GET_PLAYGROUND_DETAILS: {
        ...
      }
    }

*/

// Selectors

export const getLastSuccessfullFetch = (state, baseActionIdentifier,  fetchId) => getProperty(state, baseActionIdentifier, fetchId, 'lastSuccessfullFetch')
export const getFetchStart = (state, baseActionIdentifier,  fetchId) => getProperty(state, baseActionIdentifier, fetchId, 'fetchStart')
export const getFetchError = (state, baseActionIdentifier,  fetchId) => getProperty(state, baseActionIdentifier, fetchId, 'error')

export const isLoading = (state, baseActionIdentifier,  fetchId) => !!getFetchStart(state, baseActionIdentifier, fetchId)


// Helpers
export const getProperty = (state, baseActionIdentifier,  fetchId, property) => state.fetchDetails[baseActionIdentifier] && 
                                                                                state.fetchDetails[baseActionIdentifier][fetchId] &&
                                                                                state.fetchDetails[baseActionIdentifier][fetchId][property]

// Reducer

export const fetchDetailsReducer = (state = initialState, action) => {

    // Ignore actions that do not end with REQUEST, FAILURE or SUCCESS and action without a fetchId
    const matches = /(.*)_(REQUEST|FAILURE|SUCCESS|CLEAR_ERROR)/.exec(action.type);
    if (!matches || !action.fetchId) 
      return state;
  
    const [, requestName] = matches;

    return {
      ...state,
      [requestName]: { ...state[requestName], [action.fetchId]: entryReducer(state[requestName] && state[requestName][action.fetchId], action) }
    }
}


const entryReducer = (state = initialEntryState, action) => {
  const matches = /(.*)_(REQUEST|FAILURE|SUCCESS|CLEAR_ERROR)/.exec(action.type);
  const [, , requestState] = matches;

  switch (requestState) {
    case 'REQUEST':
      return {
        ...state,
        fetchStart: action.timestamp
      }
    case 'FAILURE':
      return {
        ...state,
        error: action.payload,
        fetchStart: null
      }
    case 'SUCCESS':
      return {
        lastSuccessfullFetch: action.timestamp,
        error: null,
        fetchStart: null
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
    }
}



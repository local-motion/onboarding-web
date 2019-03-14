import { openConfirmationDialog } from "../components/ConfirmationDialog/ConfirmationDialogActions";
import { createUser } from "../components/UserProfile/UserProfileActions";
import ErrorMessages, { ErrorCode } from "./ErrorMessages";
import { getJwtToken } from "../components/UserProfile/UserProfileReducer";
import { getGraphQLClient } from "../misc/ConfigReducer";

export const REQUEST_POSTFIX = '_REQUEST'
export const SUCCESS_POSTFIX = '_SUCCESS'
export const FAILURE_POSTFIX = '_FAILURE'

// Query types
export const GRAPHQL_QUERY = 'GRAPHQL_QUERY'
export const GRAPHQL_MUTATION = 'GRAPHQL_MUTATION'
export const REST_GET = 'REST_GET'
export const REST_POST = 'REST_POST'

const supportedQueryTypes = [GRAPHQL_QUERY, GRAPHQL_MUTATION, REST_GET, REST_POST]

/**
 *     Both grahpQL and REST queries are executed through this generic interface. Doing so results in a consistent handling of all kinds of queries.
 *     For now only queries that retrieve data are supported.
 * 
 * @param {*} queryOptions the queryOptions object is layed out as such:
 * 
    {
        type: GRAPHQL_QUERY | GRAPHQL_MUTATION | REST_GET | REST_POST
        baseActionIdentifer: start of the action types that will be spawned along with the execution of the query
        fetchId: identifier of the entity that is being fetched (may be left undefined)
        query: graphQL query or REST url
        variables: will be sent along with the graphQL query, for rest query the variables will be available for callback
        auxParameters: parameters that will be supplied to the dispatched actions and the callbacks (as part of the entire query object), but are not used in the query itself
        invokeErrorHandlers: whether to invoke the default error handlers (default: true)

        onCompletionPrepublish: function that will be invoked on any result before the result action is dispatched,
                                when this function returns true the query is cancelled and therefore the result is not dispatched and the onCompletion/onSuccess/OnFail handlers are not invoked
        onSuccessPrepublish: function that will be invoked when the result is successful before the result action is dispatched, 
                                when this function returns true the query is cancelled and therefore the result is not dispatched and the onCompletion/onSuccess/OnFail handlers are not invoked
        onFailPrepublish: function that will be invoked when the result is not successful before the result action is dispatched,
                                when this function returns true the error is cancelled and therefore the error is not dispatched and the onCompletion/onSuccess/OnFail handlers are not invoked

        onCompletion: function that will be invoked on any result after the result action is dispatched
        onSuccess: function that will be invoked when the result is successful after the result action is dispatched
        onFail: function that will be invoked when the result is not successful after the result action is dispatched
    }
 * 
    The callback functions are invoked with these parameters:
    - result: payload for onSuccess error handlers | error (see below) for onError handlers | complete result object for onCompletion handlers
    - dispatch function
    - getState function
    - query object as passed to fetch function
    - complete result object
 * 
 *  Errors are formatted as such:
 *
    {
        code: represents the type of error. Often provided by the server, but may be set client-side as well. This is the only mandatory field.
        serverMessage: error message provided by the server (always in English)
        httpResultCode: the usual response code obtained from the server
        exception: if the error was detected by catching an exception, this is where to store the exception object
        aux: object containing any error specific auxilary attributes
        response: protocol (and possibly error type) specific raw content
        queryOptions: the options describing the query that errored
        otherErrors: array of other errors that occurred (in case this error was the first in a list). Note that these other errors will not refer to each other as otherErrors.
    }
 * 
 */
export const executeQuery = (queryOptions) => {
  const { type } = queryOptions 

  if (!supportedQueryTypes.includes(type))
    throw new Error('Query type ' + type + ' is not supported, choose from: ' + supportedQueryTypes)

  return (type === GRAPHQL_QUERY || type === GRAPHQL_MUTATION) ? executeGraphQLQuery(queryOptions) : executeRestQuery(queryOptions)
}


const executeGraphQLQuery = (queryOptions) => {
  const { type, baseActionIdentifier, fetchId, query, variables, 
          invokeErrorHandlers=true,
          onCompletionPrepublish, onSuccessPrepublish, 
          onCompletion, onSuccess } = queryOptions 

  return (dispatch, getState) => {
      const graphQLClient = getGraphQLClient(getState())
      dispatch({type: baseActionIdentifier + REQUEST_POSTFIX, fetchId, timestamp: Date.now()})

      const promise = type === 'GRAPHQL_QUERY' ?
          graphQLClient.query({
            query,
            variables
          })
        :
        graphQLClient.mutate({
          mutation: query,
          variables
        })

      promise.then(response => {

          const error = extractErrorsFromGraphQLResponse(response, queryOptions)

          if (error) {
            let errorHandled = false
            if (invokeErrorHandlers) {
                for (var i = 0; i < errorHandlers.length && !errorHandled; i++) {
                  console.log("invoking error handler: ", errorHandlers[i])
                  errorHandled = errorHandlers[i](error, dispatch, getState, queryOptions)
                }
            }

            if (!errorHandled) {
              console.log("Unhandled error: ", error)
              handleError(error, dispatch, getState, queryOptions, error)
            }
          }
          else {
            // result -> call went ok
            let cancel = false
            if (onSuccessPrepublish) 
              cancel |= onSuccessPrepublish(response.data, dispatch, getState, queryOptions, response)
            if (onCompletionPrepublish)
              cancel |= onCompletionPrepublish(response.data, dispatch, getState, queryOptions, response)
        
            if (!cancel) {
              dispatch({ type: baseActionIdentifier + SUCCESS_POSTFIX, message: response, payload: response.data, fetchId, queryOptions, timestamp: Date.now() })

              onSuccess && onSuccess(response.data, dispatch, getState, queryOptions, response)
              onCompletion && onCompletion(response.data, dispatch, getState, queryOptions, response)
              }
          }
        })
        .catch(errorResponse => {
          // Network errors end up here
          console.log('graphQL query (network) error: ', errorResponse)

          const error = {
            code: errorResponse.message && errorResponse.message.startsWith('Network error') ? 'NETWORK' : 'GENERIC',
            serverMessage: errorResponse.message,
            response: errorResponse,
            queryOptions,
          }
          handleError(error, dispatch, getState, queryOptions, errorResponse)
        })
    }
  }

const executeRestQuery = (queryOptions) => {
  const { type, baseActionIdentifier, fetchId, query, variables, 
          onCompletionPrepublish, onSuccessPrepublish, 
          onCompletion, onSuccess } = queryOptions 

  return (dispatch, getState) => {
      // const graphQLClient = getState().graphQLClient;
      dispatch({type: baseActionIdentifier + REQUEST_POSTFIX, fetchId, timestamp: Date.now()})

      const promise = type === REST_GET ?
        fetch(query, {
        })
        :
        fetch(query, {
          method: 'POST',
          body: JSON.stringify(variables),
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + getJwtToken(getState())
          }
        })

      promise.then(

        response => {
          if (response.ok) {
            response.json().then(
              json => {
                let cancel = false
                if (onSuccessPrepublish) 
                  cancel |= onSuccessPrepublish(response.data, dispatch, getState, queryOptions, response)
                if (onCompletionPrepublish)
                  cancel |= onCompletionPrepublish(response.data, dispatch, getState, queryOptions, response)
            
                if (!cancel) {
                  dispatch({ type: baseActionIdentifier + SUCCESS_POSTFIX, message: response, payload: json, fetchId, queryOptions, timestamp: Date.now() })
    
                  onSuccess && onSuccess(response.data, dispatch, getState, queryOptions, response)
                  onCompletion && onCompletion(response.data, dispatch, getState, queryOptions, response)
                  }
              },
              jsonError => {
                console.warn('Error parsing json response: ', jsonError)
                const error = {
                  code: ErrorCode.JSON_PARSE,
                  response,
                  queryOptions,
                }
                handleError(error, dispatch, getState, queryOptions, response)
              }
            ).catch(exception => {
              console.warn('Exception while handling REST call: ', exception)
              const error = {
                code: ErrorCode.GENERIC,
                exception,
                response,
                queryOptions,
              }
              handleError(error, dispatch, getState, queryOptions, response)
              })
          }
          else {
            console.warn('Error result from REST call: ', response)
            const error = {
              code: response.status >= 500 ? ErrorCode.INTERNAL_SERVER_ERROR : response.status >= 400 ? ErrorCode.NOT_AUTHORISED : ErrorCode.GENERIC,
              httpResultCode: response.status,
              response,
              queryOptions,
            }
            handleError(error, dispatch, getState, queryOptions, response)
          }
        },

        errorResponse => {
          // Network errors end up here
          console.warn('Network error from REST call: ', errorResponse)
          const error = {
            code: ErrorCode.NETWORK,
            response: errorResponse,
            queryOptions,
          }
          handleError(error, dispatch, getState, queryOptions, errorResponse)
        }
      )
    }
  }


// Error handlers

const noUserProfileErrorHandler = (error, dispatch, getState, queryOptions) => {
  if (error.code === 'NO_PROFILE') {
    // try to create a user profile and then retry the original query
      console.log("Error: No user profile -> Trying to create one...")
      dispatch(createUser(
        () => {
          console.log("User profile created-> Retrying original query")

          // on success retry the original query, without invoking the errorHandlers this time to avoid infinite loops
          const options = {...queryOptions, invokeErrorHandlers: false}
          dispatch(executeQuery(options))
        }
      ))
    return true   // error handled
  }
  else
    return false  // error not handled
}

const errorHandlers = [noUserProfileErrorHandler]


// default error handler

const handleError = (error, dispatch, getState, queryOptions, message) => {
  const {baseActionIdentifier, onFailPrepublish, onCompletionPrepublish, onFail, onCompletion} = queryOptions
  let cancel = false

  if (onFailPrepublish)
    cancel |= onFailPrepublish(error, dispatch, getState, queryOptions, message)
  if (onCompletionPrepublish)
    cancel |= onCompletionPrepublish(error, dispatch, getState, queryOptions, message)

  if (!cancel) {
    dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, payload: message, error: error})

    onFail && onFail(error, dispatch, getState, queryOptions, message)
    onCompletion && onCompletion(error, dispatch, getState, queryOptions, message)

    dispatch(openErrorMessageDialog(error))
  }
}


// Helper functions

const openErrorMessageDialog = (error) => (dispatch, getState) => {
  const developerMessage = ErrorMessages[error.code] ? ErrorMessages[error.code].developerMessage : ErrorMessages[error.code].serverMessage
  // const consumerMessage = ErrorMessages[error.code] ? ErrorMessages[error.code].message : 'Onbekende fout'

  // TODO switch between developer mode and consumer mode
  dispatch(openConfirmationDialog('Er is helaas iets fout gegaan', developerMessage, 'Sluiten', () => {window.location.reload()}))
}



/**
 * This methods extracts and return the errors from a graphQL response message.
 * The first error is returned as a standard error object. The subsequent errors
 * are contained in the otherErrors property of the error object.
 * 
 * If the response does not contain any errors, null is returned.
 * 
 * The graphQL response contains an errors property which is an array that holds zero or more errors, 
 * each with these attributes:
 * - code: translated to error.code
 * - niceMessage: translated to error.serverMessage
 * 
 */
const extractErrorsFromGraphQLResponse = (response, queryOptions) => {
  if (response.errors && response.errors.length) {
    const error = {
      code: response.errors[0].code,
      serverMessage: response.errors[0].niceMessage,
      response,
      queryOptions,
      otherErrors: []
    }
    for (let i = 1; i < response.errors.length; i++)
      error.otherErrors.push({
          code: response.errors[i].code,
          serverMessage: response.errors[i].niceMessage,
          response,
          queryOptions,
        })
    return error
  }
  else
    return null
}

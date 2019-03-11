import { openConfirmationDialog } from "./components/ConfirmationDialog/ConfirmationDialogActions";
import { createUser } from "./components/UserProfile/UserProfileActions";
import ErrorMessages from "./api/ErrorMessages";

export const PUBLISH_ENVIRONMENT = 'PUBLISH_ENVIRONMENT'
export const PUBLISH_GRAPHQLCLIENT = 'PUBLISH_GRAPHQLCLIENT'
export const NULL_ACTION = 'NULL_ACTION'

export const nullAction = {type: NULL_ACTION}

export const REQUEST_POSTFIX = '_REQUEST'
export const SUCCESS_POSTFIX = '_SUCCESS'
export const FAILURE_POSTFIX = '_FAILURE'

const allowedQueryTypes = ['GRAPHQL_QUERY' , 'GRAPHQL_MUTATION', 'REST_GET', 'REST_POST']

export const publishEnvironment = environmentProperties => (
    {type: PUBLISH_ENVIRONMENT, environmentProperties}
  )

export const publishGraphQLClient = client => (
    {type: PUBLISH_GRAPHQLCLIENT, client}
  )




export const executeQuery = (queryOptions) => {
  const { type, baseActionIdentifier, fetchId, query, variables, 
          invokeErrorHandlers=true,
          onCompletionPrepublish, onSuccessPrepublish, 
          onCompletion, onSuccess } = queryOptions 

        console.log("fetching " + baseActionIdentifier + " for " + fetchId)

  if (!allowedQueryTypes.includes(type))
    throw new Error('Query type ' + type + ' is not supported, choose from: ' + allowedQueryTypes)

  return (dispatch, getState) => {
      const graphQLClient = getState().graphQLClient;
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
                // const context = {baseActionIdentifier, query, variables, fetchId, dispatch, getState, invokeErrorHandlers}
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
            onSuccessPrepublish && onSuccessPrepublish(response.data, dispatch, getState, queryOptions, response)
            onCompletionPrepublish && onCompletionPrepublish(response.data, dispatch, getState, queryOptions, response)
        
            dispatch({ type: baseActionIdentifier + SUCCESS_POSTFIX, message: response, payload: response.data, fetchId, timestamp: Date.now() })

            onSuccess && onSuccess(response.data, dispatch, getState, queryOptions, response)
            onCompletion && onCompletion(response.data, dispatch, getState, queryOptions, response)
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
          dispatch(fetch(options, false))
        }
      ))
    return true 
  }
  else
    return false
}

const errorHandlers = [noUserProfileErrorHandler]


// default error handler

const handleError = (error, dispatch, getState, queryOptions, message) => {
  const {baseActionIdentifier, onFailPrepublish, onCompletionPrepublish, onFail, onCompletion} = queryOptions

  onFailPrepublish && onFailPrepublish(error, dispatch, getState, queryOptions, message)
  onCompletionPrepublish && onCompletionPrepublish(error, dispatch, getState, queryOptions, message)

  dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, payload: message, error: error})

  onFail && onFail(error, dispatch, getState, queryOptions, message)
  onCompletion && onCompletion(error, dispatch, getState, queryOptions, message)

  dispatch(openErrorMessageDialog(error))
}


// Helper functions

const openErrorMessageDialog = (error) => (dispatch, getState) => {
  const developerMessage = ErrorMessages[error.code] ? ErrorMessages[error.code].developerMessage : 'Error message not defined'
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

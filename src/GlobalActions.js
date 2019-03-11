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


export const publishEnvironment = environmentProperties => (
    {type: PUBLISH_ENVIRONMENT, environmentProperties}
  )

export const publishGraphQLClient = client => (
    {type: PUBLISH_GRAPHQLCLIENT, client}
  )




export const fetch = (queryOptions) => {
  const { type, baseActionIdentifier, fetchId, query, variables, 
          auxParameters, invokeErrorHandlers=true,
          onCompletionPrepublish, onSuccessPrepublish, onFailPrepublish, 
          onCompletion, onSuccess, onFail } = queryOptions 

        console.log("fetching " + baseActionIdentifier + " for " + fetchId)



  return (dispatch, getState) => {
      const graphQLClient = getState().graphQLClient;
      dispatch({type: baseActionIdentifier + REQUEST_POSTFIX, fetchId, timestamp: Date.now()})

      console.log('submitting a query')
      graphQLClient.query({
        query,
        variables
      })
        .then(response => {

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

              // dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, message: data, payload: error, fetchId,  timestamp: Date.now() })
              // dispatch(openSimpleErrorMessageDialog(error.niceMessage))
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


          // if (data.data)
          //     // result -> call went ok
          //   dispatch({ type: baseActionIdentifier + SUCCESS_POSTFIX, message: data, payload: data.data, fetchId, timestamp: Date.now() })
          // else {
          //     // no result -> an error must have occurred
          //   console.log('No data received: ', data)

          //   if (data.errors && data.errors[0]) {
          //     // error info is available -> handle
          //     let errorHandled = false
          //     const error = data.errors[0]

          //     if (invokeErrorHandlers) {
          //       // const context = {baseActionIdentifier, query, variables, fetchId, dispatch, getState, invokeErrorHandlers}
          //       for (var i = 0; i < FETCHerrorHandlers.length && !errorHandled; i++) {
          //         console.log("invoking error handler: ", FETCHerrorHandlers[i])
          //         errorHandled = FETCHerrorHandlers[i](error, dispatch, getState, queryOptions)
          //       }
          //     }

          //     if (!errorHandled) {
          //       console.log("Unhandled error: ", error)
          //       dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, message: data, payload: error, fetchId,  timestamp: Date.now() })
          //       dispatch(openSimpleErrorMessageDialog(error.niceMessage))
          //     }
          //   }
          //   else {
          //     // Unknown error: No data received but also no errors present
          //     console.log("Unknown error: ", data)
          //     dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, fetchId,  timestamp: Date.now() })
          //     dispatch(openSimpleErrorMessageDialog("Er is een technische fout opgetreden."))
          //   }
          // }

          // onCompletion && onCompletion(data)
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

          // onFailPrepublish && onFailPrepublish(standardError, dispatch, getState, options, error)
          // onCompletionPrepublish && onCompletionPrepublish(standardError, dispatch, getState, options, error)
       
          // dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, payload: error, error: standardError})
       
          // onFail && onFail(standardError, dispatch, getState, options, error)
          // onCompletion && onCompletion(standardError, dispatch, getState, options, error)

          // dispatch(openErrorMessageDialog(standardError))
        })
    }
  }

  const handleError = (error, dispatch, getState, queryOptions, message) => {
    const {baseActionIdentifier, onFailPrepublish, onCompletionPrepublish, onFail, onCompletion} = queryOptions

    onFailPrepublish && onFailPrepublish(error, dispatch, getState, queryOptions, message)
    onCompletionPrepublish && onCompletionPrepublish(error, dispatch, getState, queryOptions, message)
 
    dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, payload: message, error: error})
 
    onFail && onFail(error, dispatch, getState, queryOptions, message)
    onCompletion && onCompletion(error, dispatch, getState, queryOptions, message)

    dispatch(openErrorMessageDialog(error))
}








// export const fetchGraphQL = (baseActionIdentifier, graphQLQuery, variables={}, fetchId, invokeErrorHandlers=true, onCompletionCallback) => {

// console.log("fetching " + baseActionIdentifier + " for " + fetchId)

//   return (dispatch, getState) => {
//       const graphQLClient = getState().graphQLClient;
//       dispatch({type: baseActionIdentifier + REQUEST_POSTFIX, fetchId, timestamp: Date.now()})

//       // return graphQLClient.query({
//       graphQLClient.query({
//         query: graphQLQuery,
//         variables
//       })
//         .then(data => {
//           if (data.data)
//               // result -> call went ok
//             dispatch({ type: baseActionIdentifier + SUCCESS_POSTFIX, message: data, payload: data.data, fetchId, timestamp: Date.now() })
//           else {
//               // no result -> an error must have occurred
//             console.log('No data received: ', data)

//             if (data.errors && data.errors[0]) {
//               // error info is available -> handle
//               let errorHandled = false
//               const error = data.errors[0]

//               if (invokeErrorHandlers) {
//                 const context = {baseActionIdentifier, graphQLQuery, variables, fetchId, dispatch, getState, invokeErrorHandlers}
//                 for (var i = 0; i < errorHandlers.length && !errorHandled; i++) {
//                   console.log("invoking error handler: ", errorHandlers[i])
//                   errorHandled = errorHandlers[i](error, context)
//                 }
//               }

//               if (!errorHandled) {
//                 console.log("Unhandled error: ", error)
//                 dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, message: data, payload: error, fetchId,  timestamp: Date.now() })
//                 dispatch(openSimpleErrorMessageDialog(error.niceMessage))
//               }
//             }
//             else {
//               // Unknown error
//               console.log("Unknown error: ", data)
//               dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, fetchId,  timestamp: Date.now() })
//               dispatch(openSimpleErrorMessageDialog("Er is een technische fout opgetreden."))
//             }
//           }

//           if (onCompletionCallback)
//             onCompletionCallback(data)
//         })
//         .catch(error => {
//           // Network errors end up here
//           console.log('graphQL query (network) error: ', error)

//           dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, payload: error})
//           dispatch(openGraphQLErrorMessageDialog( error))
//         })
//     }
//   }



// const noUserProfileErrorHandler = (error, context) => {
//   if (error.code === 'NO_PROFILE') {
//     // try to create a user profile and then retry the original query

//       console.log("Error: No user profile -> Trying to create one...")

//       const { dispatch } = context
//       dispatch(createUser(
//         () => {

//           console.log("User profile created-> Retrying original query")


//           // on success retry the original query, without invoking the errorHandlers this time to avoid infinite loops
//           dispatch(fetchGraphQL(context.baseActionIdentifier, context.graphQLQuery, context.variables={}, context.fetchId, false))
//         }
//       ))
//     return true 
//   }
//   else
//     return false
// }

// const errorHandlers = [noUserProfileErrorHandler]

export const mutationGraphQL = (queryOptions) => {

  const { type, baseActionIdentifier, fetchId, query, variables, 
    auxParameters, invokeErrorHandlers=true,
    onCompletionPrepublish, onSuccessPrepublish, onFailPrepublish, 
    onCompletion, onSuccess, onFail } = queryOptions 

    console.log("mutation " + baseActionIdentifier)

    return (dispatch, getState) => {
        const graphQLClient = getState().graphQLClient;
        dispatch({type: baseActionIdentifier + REQUEST_POSTFIX, fetchId, timestamp: Date.now()})

        graphQLClient.mutate({
          mutation: query,
          variables
        })
          .then(response => {
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

    
// export const mutationGraphQL = (baseActionIdentifier, graphQLMutation, variables={}, onSuccessCallback, miscAttributes) => {
//   return (dispatch, getState) => {
//       const graphQLClient = getState().graphQLClient;
//       dispatch({type: baseActionIdentifier + REQUEST_POSTFIX})

//       graphQLClient.mutate({
//         mutation: graphQLMutation,
//         variables
//       })
//         .then(data => {
//           if (data.errors && data.errors[0]) {
//             console.log('graphQL mutation success with error: ', data)
//             const error = {code: data.errors[0].code, message: data.errors[0].niceMessage, miscAttributes}
//               dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, message: data, payload: error})
//               dispatch(openSimpleErrorMessageDialog(error.message))
//           }
//           else {
//             console.log('graphQL mutation success: ', data)
//               dispatch({ type: baseActionIdentifier + SUCCESS_POSTFIX, message: data, payload: data.data, variables, miscAttributes })
//               if (onSuccessCallback)
//                 onSuccessCallback(data.data, dispatch, getState)
//           }
//         })
//         .catch(error => {
//           // Network errors end up here
//           console.log('graphQL mutation (network) error: ', error)
//           dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, payload: error, miscAttributes})
//           dispatch(openGraphQLErrorMessageDialog( error))
//         })
      
//     }
//   }


// Error handlers

  const noUserProfileErrorHandler = (error, dispatch, getState, queryOptions) => {
    if (error.code === 'NO_PROFILE') {
      // try to create a user profile and then retry the original query
  
        console.log("Error: No user profile -> Trying to create one...")
  
        // const { dispatch } = context
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



  // Helper functions

  const openSimpleErrorMessageDialog = (errorMessage) => (dispatch, getState) => {
    dispatch(openConfirmationDialog('Er is helaas iets fout gegaan (simple)', errorMessage, 'Sluiten', () => {window.location.reload()}))
  }

  const openGraphQLErrorMessageDialog = (graphQLError) => (dispatch, getState) => {
    dispatch(openConfirmationDialog('Er is helaas iets fout gegaan', extractMessageFromApolloError(graphQLError), 'Sluiten', () => {window.location.reload()}))
  }


  const openErrorMessageDialog = (error) => (dispatch, getState) => {
    const developerMessage = ErrorMessages[error.code] ? ErrorMessages[error.code].developerMessage : 'Error message not defined'
    const consumerMessage = ErrorMessages[error.code] ? ErrorMessages[error.code].message : 'Onbekende fout'

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


/**
 * Handles parsing the 'error' portion of the payload. Local-Motion makes use
 * of error extensions to provide user friendly messages and allowing
 * functional decisions based on errors[x].extensions.code
 *
 * Example error response in case of graphQL errors:

 {
    graphQLErrors: 
        [
            {
                "code" : "UNAUTHORIZED",
                "niceMessage" : "You are not a manager of this playground"
            }
        ]

 }

  /**
   * Finds the GraphQLError and returns the 'niceMessage' of the error's extensions.
   */
const extractMessageFromApolloError = (apolloError) => {
  const graphQLErrors = apolloError.graphQLErrors;
  const networkError = apolloError.networkError;

  if (networkError)   // Note that this includes various errors such as no response and 500 internal server error
      return "Er is een technische fout opgetreden.";
  else if (graphQLErrors)
      return graphQLErrors.map(({ code, niceMessage }) => niceMessage + " (" + code + ")").join('/n')
  else
      return apolloError.toString();
}



import { openConfirmationDialog } from "./components/ConfirmationDialog/ConfirmationDialogActions";
import { createUser } from "./components/UserProfile/UserProfileActions";

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


export const fetchGraphQL = (baseActionIdentifier, graphQLQuery, variables={}, fetchId, invokeErrorHandlers=true) => {

console.log("fetching " + baseActionIdentifier + " for " + fetchId)

  return (dispatch, getState) => {
      const graphQLClient = getState().graphQLClient;
      dispatch({type: baseActionIdentifier + REQUEST_POSTFIX, fetchId, timestamp: Date.now()})

      return graphQLClient.query({
        query: graphQLQuery,
        variables
      })
        .then(data => {
          if (data.data)
              // result -> call went ok
            dispatch({ type: baseActionIdentifier + SUCCESS_POSTFIX, payload: data, fetchId, timestamp: Date.now() })
          else {
              // no result -> an error must have occurred
            console.log('No data received: ', data)

            if (data.errors && data.errors[0]) {
              // error info is available -> handle
              let errorHandled = false
              const error = data.errors[0]

              if (invokeErrorHandlers) {
                const context = {baseActionIdentifier, graphQLQuery, variables, fetchId, dispatch, getState, invokeErrorHandlers}
                for (var i = 0; i < errorHandlers.length && !errorHandled; i++) {
                  console.log("invoking error handler: ", errorHandlers[i])
                  errorHandled = errorHandlers[i](error, context)
                }
              }

              if (!errorHandled) {
                console.log("Unhandled error: ", error)
                dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, payload: error, fetchId,  timestamp: Date.now() })
                dispatch(openGraphQLErrorMessageDialog(error))
              }
            }
            else {
              // Unknown error
              console.log("Unknown error: ", data)
              dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, fetchId,  timestamp: Date.now() })
              dispatch(openGraphQLErrorMessageDialog("Unknown error"))
          }
          }
        })
    }
  }



const noUserProfileErrorHandler = (error, context) => {
  if (error.code === 'NO_PROFILE') {
    // try to create a user profile and then retry the original query

      console.log("Error: No user profile -> Trying to create one...")

      const { dispatch } = context
      dispatch(createUser(
        () => {

          console.log("User profile created-> Retrying original query")


          // on success retry the original query, without invoking the errorHandlers this time to avoid infinite loops
          dispatch(fetchGraphQL(context.baseActionIdentifier, context.graphQLQuery, context.variables={}, context.fetchId, false))
        }
      ))
    return true 
  }
  else
    return false
}

const errorHandlers = [noUserProfileErrorHandler]

export const mutationGraphQL = (baseActionIdentifier, graphQLMutation, variables={}, onSuccessCallback, miscAttributes) => {
  return (dispatch, getState) => {
      const graphQLClient = getState().graphQLClient;
      dispatch({type: baseActionIdentifier + REQUEST_POSTFIX})

      return graphQLClient.mutate({
        mutation: graphQLMutation,
        variables
      })
        .then(data => {
          if (data.errors && data.errors[0]) {
            console.log('graphQL mutation success with error: ', data)
            const error = {code: data.errors[0].code, message: data.errors[0].niceMessage, miscAttributes}
              dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, payload: error})
              dispatch(openSimpleErrorMessageDialog(error.message))
          }
          else {
            console.log('graphQL mutation success: ', data)
              dispatch({ type: baseActionIdentifier + SUCCESS_POSTFIX, payload: data, variables, miscAttributes })
              if (onSuccessCallback)
                onSuccessCallback(data.data, dispatch, getState)
          }
        })
        .catch(error => {
          console.log('graphQL mutation error: ', error)
          dispatch({ type: baseActionIdentifier + FAILURE_POSTFIX, payload: error, miscAttributes})
          dispatch(openGraphQLErrorMessageDialog( error))
        });
      
    }
  }




  // Helper functions

  const openSimpleErrorMessageDialog = (graphQLError) => (dispatch, getState) => {
    dispatch(openConfirmationDialog('Er is helaas iets fout gegaan', extractMessageFromApolloError(graphQLError), 'Sluiten'))
  }

  const openGraphQLErrorMessageDialog = (graphQLError) => (dispatch, getState) => {
    dispatch(openConfirmationDialog('Er is helaas iets fout gegaan', extractMessageFromApolloError(graphQLError), 'Sluiten'))
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

  if (networkError)
      return "Er is een netwerkfout opgetreden.";
  else if (graphQLErrors)
      return graphQLErrors.map(({ code, niceMessage }) => niceMessage + " (" + code + ")").join('/n')
  else
      return apolloError.toString();
}



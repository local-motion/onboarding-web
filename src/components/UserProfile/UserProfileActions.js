import gql from 'graphql-tag';
import { Auth } from 'aws-amplify';
import { executeQuery } from '../../api/QueryActions';
import { openConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialogActions';

export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const CHECK_EMAIL_EXISTS = 'CHECK_EMAIL_EXISTS'
export const CREATE_USER_PROFILE = 'CREATE_USER_PROFILE'
export const DELETE_USER_PROFILE = 'DELETE_USER_PROFILE'
export const USER_SIGNED_IN = 'USER_SIGNED_IN'
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'


export const fetchUserProfile = () => executeQuery( {
    type: 'GRAPHQL_QUERY',
    baseActionIdentifier: GET_USER_PROFILE, 
    query: gql`
      {
          profile {
              id
              username
          }
      }
    `, 
    onSuccessPrepublish: (result, dispatch) => {
      console.log( 'onSuccessPrepublish', result)
      if (!result.profile) {
        dispatch(openConfirmationDialog(
          'Gebruikersprofiel niet aanwezig', 
          'Er heeft zich een probleem voorgedaan met uw gebruikersprofiel. Probeer opnieuw in te loggen.', 
          'OK', 
          () => dispatch(signOutUser()))
        )
        return true   // terminate event execution
      }
    }
  })



export const checkEmailExists = (emailAddress, onSuccessCallback, onFailCallback, onCompletionCallback) => executeQuery( {
    type: 'GRAPHQL_QUERY',
    baseActionIdentifier: CHECK_EMAIL_EXISTS, 
    query: gql`
    query Query($emailAddress: String!) {
      emailExists(emailAddress: $emailAddress)
    }
  `, 
    variables: {
      emailAddress
    },
    onSuccessPrepublish: onSuccessCallback,
    onFailPrepublish: onFailCallback,
    onCompletionPrepublish: onCompletionCallback
  })

export const createUser = (onSuccessCallback) => executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: CREATE_USER_PROFILE, 

// Passing in 'irrelevant' to the input parameter as GraphQL apparantly does not support mutations without input parameters
    query: gql`
      mutation CreateUser {
        createUser(doesNotMatter: "irrelevant") {
          id
        }
      }
    `, 
    onSuccess: (data, dispatch, getState) => onSuccessCallback(data, dispatch, getState)
  })

export const deleteUser = () => executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: DELETE_USER_PROFILE, 

// Passing in 'irrelevant' to the input parameter as GraphQL apparantly does not support mutations without input parameters
    query: gql`
      mutation DeleteUser {
        deleteUser(doesNotMatter: "irrelevant") {
          id
        }
      }
    `, 
    onSuccess: (data, dispatch, getState) => dispatch(signOutUser())
  })

export const userSignedIn = cognitoUser => (dispatch, getState) =>{
    dispatch({ type: USER_SIGNED_IN, cognitoUser })
    dispatch(fetchUserProfile())
}

export const signOutUser = () => (dispatch) => {
    Auth.signOut()
        .then(() => {
            console.log('sign out success')
            dispatch({ type: USER_SIGNED_OUT })
        })
        .catch(error => {
            console.log('sign out error', error)
            dispatch(openConfirmationDialog('Er heeft zich een probleem voorgedaan met het uitloggen, de pagina wordt opnieuw geladen', 
                                            'Sign out error: ' + error, 
                                            'Sluiten', () => {window.location.reload()}))
        })
}
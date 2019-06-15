import gql from 'graphql-tag';
import { Auth } from 'aws-amplify';
import { executeQuery, GRAPHQL_QUERY, GRAPHQL_MUTATION } from '../../api/QueryActions';
import { openErrorDialog, openInformationDialog } from '../SimpleDialog/SimpleDialogActions';
import { stopStream, triggerStream, startStream, pollingIntervalSetterFactory } from 'api/StreamActions';
import { startUserDataStream, USER_DATA_STREAM } from 'components/UserData/UserDataActions';

export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const CHECK_EMAIL_EXISTS = 'CHECK_EMAIL_EXISTS'
export const CREATE_USER_PROFILE = 'CREATE_USER_PROFILE'
export const DELETE_USER_PROFILE = 'DELETE_USER_PROFILE'
export const SET_NOTIFICATION_LEVEL = 'SET_NOTIFICATION_LEVEL'
export const USER_SIGNED_IN = 'USER_SIGNED_IN'
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

export const USER_PROFILE_STREAM = 'USERPROFILE'



const startUserProfileStream = () => {
  return startStream(
    USER_PROFILE_STREAM, 
    {
      type: GRAPHQL_QUERY,
      baseActionIdentifier: GET_USER_PROFILE,
      query: gql`
      {
          profile {
              id
              username
              emailAddress
              notificationLevel
              initiativeMemberships
          }
      }
    `, 
      onSuccessPrepublish: (result, dispatch) => {

        console.log('result from profile stream:', result)

        if (!result.profile && result.status !== 'not_modified') {
          dispatch(openErrorDialog(
            'Gebruikersprofiel niet aanwezig', 
            'Er heeft zich een probleem voorgedaan met uw gebruikersprofiel. Probeer opnieuw in te loggen.', 
            'OK', 
            () => dispatch(signOutUser()))
          )
          return true   // terminate event execution
        }
      }
    }
    ,
    {
      pollingIntervalSetter: pollingIntervalSetterFactory(60, 120, 10)
    }
  )
}

export const checkEmailExists = (emailAddress, onSuccessCallback, onFailCallback, onCompletionCallback) => executeQuery( {
    type: GRAPHQL_QUERY,
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
    type: GRAPHQL_MUTATION,
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
    type: GRAPHQL_MUTATION,
    baseActionIdentifier: DELETE_USER_PROFILE, 

// Passing in 'irrelevant' to the input parameter as GraphQL apparantly does not support mutations without input parameters
    query: gql`
      mutation DeleteUser {
        deleteUser(doesNotMatter: "irrelevant") {
          id
        }
      }
    `, 
    onSuccess: (data, dispatch, getState) => {
      Auth.currentAuthenticatedUser().then( user => {
        user.deleteUser( (error, data) => {
          if (data !== 'SUCCESS') {
            console.log('delete user error', error)
            dispatch(openErrorDialog('Uitschrijven mislukt',
            'Er heeft zich een probleem voorgedaan met het verwijderen van je gegevens. Log opnieuw in en probeer het opnieuw.', 
            'OK', () => dispatch(signOutUser()) ))
          }
          else {
            console.log('delete user success', error)
            dispatch(openInformationDialog('Uitgeschreven', 'Je bent uitgeschreven van rookvrijspelen.nl', 'OK', () => {
              dispatch({ type: USER_SIGNED_OUT })
              window.location.replace('/')
            }))
          }
        })
      })
      .catch(error => {
        console.log('delete user error', error)
        dispatch(openErrorDialog('Uitschrijven mislukt',
                                        'Er heeft zich een probleem voorgedaan met het verwijderen van je gegevens. Log opnieuw in en probeer het opnieuw.', 
                                        'OK', () => dispatch(signOutUser()) ))
    })
    }
  })

export const setNotificationLevel = (user, level) => executeQuery( {
  type: GRAPHQL_MUTATION,
  baseActionIdentifier: SET_NOTIFICATION_LEVEL, 
  fetchId: user.id,
  query: gql`
    mutation setNotificationPreferences($input: SetNotificationPreferencesCommand!) {
      setNotificationPreferences(input: $input) {
          id
        }
    }
  `, 
  variables: {
    input: {
      userId: user.id,
      notificationLevel: level
    }
  },
  onSuccess: (result, dispatch) => dispatch(triggerStream(USER_PROFILE_STREAM))
})
 

  export const userSignedIn = cognitoUser => (dispatch, getState) =>{
    dispatch({ type: USER_SIGNED_IN, cognitoUser })
    dispatch(startUserProfileStream())
    dispatch(startUserDataStream())
}

export const signOutUser = () => (dispatch) => {
    dispatch(stopStream(USER_PROFILE_STREAM))
    dispatch(stopStream(USER_DATA_STREAM))
    Auth.signOut({global: true})
        .then(() => {
            console.log('sign out success')
            dispatch({ type: USER_SIGNED_OUT })
            window.location.replace('/')
        })
        .catch(error => {
            console.log('sign out error', error)

            // Global signout failed (possibly the user was already signed out or expired), remove the cognito related items from local storage for a local signout
            for(let i in localStorage)
              if (i.startsWith('amplify') || i.startsWith('CognitoIdentityServiceProvider'))
                localStorage.removeItem(i)

            dispatch(openErrorDialog('Er heeft zich een probleem voorgedaan met het uitloggen', 
                                            'De startpagina wordt opnieuw geladen',
                                            'Sluiten', () => {window.location.replace('/')}))
        })
}
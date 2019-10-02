import gql from 'graphql-tag';
import { Auth } from 'aws-amplify';
import { executeQuery, GRAPHQL_QUERY, GRAPHQL_MUTATION } from '../../api/QueryActions';
import { openErrorDialog, openInformationDialog, openConfirmationDialog } from '../SimpleDialog/SimpleDialogActions';
import { stopStream, triggerStream, startStream, pollingIntervalSetterFactory } from 'api/StreamActions';
import { startUserDataStream, USER_DATA_STREAM } from 'components/UserData/UserDataActions';
import { getRefreshInterval } from './UserProfileReducer';
import { logwarn, logdebug, loginfo } from 'utils/Logging';

export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const CHECK_EMAIL_EXISTS = 'CHECK_EMAIL_EXISTS'
export const CREATE_USER_PROFILE = 'CREATE_USER_PROFILE'
export const REVIVE_USER_PROFILE = 'REVIVE_USER_PROFILE'
export const DELETE_USER_PROFILE = 'DELETE_USER_PROFILE'
export const CHANGE_USER_NAME = 'CHANGE_USER_NAME'
export const SET_NOTIFICATION_LEVEL = 'SET_NOTIFICATION_LEVEL'
export const USER_SIGNED_IN = 'USER_SIGNED_IN'
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'
export const USER_REFRESHED = 'USER_REFRESHED'

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
            profileStatus
            profile {
                id
                username
                emailAddress
                notificationLevel
                initiativeMemberships
            }
            newUserName
          }
      }
    `, 
      onSuccessPrepublish: (result, dispatch) => {
        if (result.status === 'not_modified')
          return false; // continue normally
        
        switch (result.profile.profileStatus) {
          case 'ACTIVE':
            return false; // continue normally

          case 'UNDETERMINED':
            return true; // terminate event execution, the next poll should deliver a determined profile

            case 'NEW':
              dispatch(createUser(triggerUserProfileStream))
              return true   // terminate event execution
  
          case 'ACTIVE_USER_NAME_CHANGED':
            dispatch(openConfirmationDialog(
              'Gebruikersnaam is veranderd', 
              'Jouw gebruikersnaam was ' + result.profile.profile.username + ' en wordt nu veranderd in ' + result.profile.newUserName + '. ' +
              'Wil je doorgaan? ' +
              '(Zo nee dan word je uitgelogd.)', 
              'Ja',
              'Nee', 
              () => dispatch(renameUser(result.profile.newUserName, triggerUserProfileStream)),
              () => dispatch(signOutUser()),
            ))
            return true   // terminate event execution

          case 'DELETED':
          dispatch(openConfirmationDialog(
            'Gebruikersprofiel is verwijderd', 
            'Wil je dit profiel opnieuw activeren? (Zo nee dan word je uitgelogd. Maak indien gewenst een ander profiel aan met een ander emailadres)', 
            'Ja',
            'Nee', 
            () => dispatch(reviveUser(triggerUserProfileStream)),
            () => dispatch(signOutUser()),
          ))
          return true   // terminate event execution

          case 'DELETED_USER_NAME_CHANGED':
            dispatch(openConfirmationDialog(
              'Gebruikersprofiel is verwijderd', 
              'Wil je dit profiel opnieuw activeren? ' + 
              'Jouw gebruikersnaam was ' + result.profile.profile.username + ' en wordt dan veranderd in ' + result.profile.newUserName + '. ' +
              '(Zo nee dan word je uitgelogd. Maak indien gewenst een ander profiel aan met een ander emailadres)', 
              'Ja',
              'Nee', 
              () => dispatch(reviveUser(triggerUserProfileStream)),
              () => dispatch(signOutUser()),
            ))
            return true   // terminate event execution

          default:          
            console.warn('User profile in unknown state: ' + result.profile.profileStatus)
            dispatch(openErrorDialog(
              'Gebruikersprofiel niet actief', 
              'Er heeft zich een probleem voorgedaan met je gebruikersprofiel. Probeer opnieuw in te loggen.', 
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
    onSuccess: (data, dispatch, getState) => {
      onSuccessCallback && onSuccessCallback(data, dispatch, getState)
    },
    auxParameters: {
      ignoreProfileAlreadyExists: true
    }
  })

export const reviveUser = (onSuccessCallback) => executeQuery( {
    type: GRAPHQL_MUTATION,
    baseActionIdentifier: REVIVE_USER_PROFILE, 

// Passing in 'irrelevant' to the input parameter as GraphQL apparantly does not support mutations without input parameters
    query: gql`
      mutation ReviveUser {
        reviveUser(doesNotMatter: "irrelevant") {
          id
        }
      }
    `, 
    onSuccess: (data, dispatch, getState) => onSuccessCallback && onSuccessCallback(data, dispatch, getState)
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
            logwarn('delete user error', error)
            dispatch(openErrorDialog('Uitschrijven mislukt',
            'Er heeft zich een probleem voorgedaan met het verwijderen van je gegevens. Log opnieuw in en probeer het opnieuw.', 
            'OK', () => dispatch(signOutUser()) ))
          }
          else {
            logdebug('delete user success', error)
            dispatch(openInformationDialog('Uitgeschreven', 'Je bent uitgeschreven van rookvrijspelen.nl', 'OK', () => {
              dispatch({ type: USER_SIGNED_OUT })
              window.location.replace('/')
            }))
          }
        })
      })
      .catch(error => {
        logwarn('delete user error', error)
        dispatch(openErrorDialog('Uitschrijven mislukt',
                                        'Er heeft zich een probleem voorgedaan met het verwijderen van je gegevens. Log opnieuw in en probeer het opnieuw.', 
                                        'OK', () => dispatch(signOutUser()) ))
    })
    }
  })

export const renameUser = (newName, onSuccessCallback) => executeQuery( {
  type: GRAPHQL_MUTATION,
  baseActionIdentifier: CHANGE_USER_NAME, 

// Passing in 'irrelevant' to the input parameter as GraphQL apparantly does not support mutations without input parameters
  query: gql`
    mutation ChangeUserName($newName: String!) {
      changeUserName(newName: $newName) {
        id
      }
    }
  `, 
  variables: {
    newName
  },  
  onSuccess: (data, dispatch, getState) => onSuccessCallback && onSuccessCallback(data, dispatch, getState)
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
  onSuccess: triggerUserProfileStream
})
 

export const userSignedIn = cognitoUser => (dispatch, getState) =>{
  const refreshInterval = setInterval(() => refreshTokens(dispatch), 20*60*1000)     // refresh each 20 minutes

  dispatch({ type: USER_SIGNED_IN, cognitoUser, refreshInterval })
  dispatch(startUserProfileStream())
  dispatch(startUserDataStream())
}

export const signOutUser = (onSignOut) => (dispatch, getState) => {
  clearInterval(getRefreshInterval(getState()))

  dispatch(stopStream(USER_PROFILE_STREAM))
  dispatch(stopStream(USER_DATA_STREAM))
  Auth.signOut({global: true})
      .then(() => {
          logdebug('sign out success')
          dispatch({ type: USER_SIGNED_OUT })
          if (onSignOut)
            onSignOut(dispatch, getState)
          else
            window.location.replace('/')
      })
      .catch(error => {
          loginfo('sign out error', error)

          // Global signout failed (possibly the user was already signed out or expired), remove the cognito related items from local storage for a local signout
          for(let i in localStorage)
            if (i.startsWith('amplify') || i.startsWith('CognitoIdentityServiceProvider'))
              localStorage.removeItem(i)

          dispatch(openErrorDialog('Er heeft zich een probleem voorgedaan met het uitloggen', 
                                          'De startpagina wordt opnieuw geladen',
                                          'Sluiten', () => {window.location.replace('/')}))
      })
}

const refreshTokens = async dispatch => {
   try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession = await Auth.currentSession();
    cognitoUser.refreshSession(currentSession.refreshToken, (error, session) => {
      logdebug('session tokens refreshed (error, session):', error, session)
      dispatch({ type: USER_REFRESHED, cognitoUser})
    })
  } catch (e) {
    loginfo('Unable to refresh tokens', e);
    dispatch(openErrorDialog('Sessie verlopen', 'Je sessie is verlopen. Log opnieuw in.', 'Sluiten', () => dispatch(signOutUser())))
  }
}

const triggerUserProfileStream = (data, dispatch, getState) => {
  dispatch(triggerStream(USER_PROFILE_STREAM))
  dispatch(triggerStream(USER_DATA_STREAM))
}
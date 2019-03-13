import gql from 'graphql-tag';
import { Auth } from 'aws-amplify';
import { executeQuery } from '../../api/QueryActions';

export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const CREATE_USER_PROFILE = 'CREATE_USER_PROFILE'
export const DELETE_USER_PROFILE = 'DELETE_USER_PROFILE'
export const USER_SIGNED_IN = 'USER_SIGNED_IN'
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'


const getUserProfileQuery = gql`
    {
        profile {
            id
            username
        }
    }
`

// Passing in 'irrelevant' to the input parameter as GraphQL apparantly doe snot support mutations without input parameters
const createUserProfileQuery = gql`
  mutation CreateUser {
    createUser(doesNotMatter: "irrelevant") {
      id
      username
    }
  }
`

// Passing in 'irrelevant' to the input parameter as GraphQL apparantly doe snot support mutations without input parameters
const deleteUserProfileQuery = gql`
  mutation DeleteUser {
    deleteUser(doesNotMatter: "irrelevant") {
      id
    }
  }
`

export const fetchUserProfile = () => {
  return executeQuery( {
    type: 'GRAPHQL_QUERY',
    baseActionIdentifier: GET_USER_PROFILE, 
    query: getUserProfileQuery, 
  })
}

   
export const createUser = (onSuccessCallback) => {
  return executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: CREATE_USER_PROFILE, 
    query: createUserProfileQuery, 
    onSuccess: (data, dispatch, getState) => onSuccessCallback(data, dispatch, getState)
  })
}

export const deleteUser = () => {
  return executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: DELETE_USER_PROFILE, 
    query: deleteUserProfileQuery, 
    onSuccess: (data, dispatch, getState) => dispatch(signOutUser())
  })
}

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
        .catch(err => {
            console.log('sign out error', err)
            alert("Er heeft zich een probleem voorgedaan met het uitloggen, de pagina wordt opnieuw geladen")
            window.location.href('/')
        });
}
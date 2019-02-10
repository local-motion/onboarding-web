import gql from 'graphql-tag';
import { fetchGraphQL, mutationGraphQL } from '../../GlobalActions';
import { Auth } from 'aws-amplify';

export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const CREATE_USER_PROFILE = 'CREATE_USER_PROFILE'
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

const createUserProfileQuery = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`


export const fetchUserProfile = () => {
  return fetchGraphQL(GET_USER_PROFILE, getUserProfileQuery)
}

   
export const createUser = (onSuccessCallback) => {
    return mutationGraphQL(CREATE_USER_PROFILE, createUserProfileQuery, {
      input: {
        id: 'irrelevant'
      }
    }, 
    onSuccessCallback)
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
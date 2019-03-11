import gql from 'graphql-tag';
import { fetchGraphQL, mutationGraphQL, fetch } from '../../GlobalActions';
import { Auth } from 'aws-amplify';

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
  // return fetchGraphQL(GET_USER_PROFILE, getUserProfileQuery)
  return fetch( {
    type: 'GRAPHQL',
    baseActionIdentifier: GET_USER_PROFILE, 
    query: getUserProfileQuery, 
  })
}

   
export const createUser = (onSuccessCallback) => {
  return mutationGraphQL ( {
    type: 'GRAPHQL',
    baseActionIdentifier: CREATE_USER_PROFILE, 
    query: createUserProfileQuery, 
    onSuccess: (data, dispatch, getState) => onSuccessCallback(data, dispatch, getState)
  })
}
// export const createUser = (onSuccessCallback) => {
//     return mutationGraphQL(CREATE_USER_PROFILE, createUserProfileQuery, {}, onSuccessCallback)
//   }

export const deleteUser = () => {
  return mutationGraphQL ( {
    type: 'GRAPHQL',
    baseActionIdentifier: DELETE_USER_PROFILE, 
    query: deleteUserProfileQuery, 
    onSuccess: (data, dispatch, getState) => dispatch(signOutUser())
  })
}

// export const deleteUser = () => {
//     return mutationGraphQL(DELETE_USER_PROFILE, deleteUserProfileQuery, {}, (data, dispatch) => {
//         dispatch(signOutUser())
//     })
//   }



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
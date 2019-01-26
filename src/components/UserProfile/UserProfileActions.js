import gql from 'graphql-tag';
import { fetchGraphQL } from '../../GlobalActions';
import { getUserProfile } from './UserProfileReducer';
import { Auth } from 'aws-amplify';

export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const USER_SIGNED_IN = 'USER_SIGNED_IN'
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'


const getUserProfileQuery = gql`
    {
        profile {
            id
            username
        }
    }
`;

export const ensureUserProfile = () => (dispatch, getState) => !getUserProfile(getState()).id ? 
                                                                dispatch(fetchUserProfile()) : null

export const fetchUserProfile = () => {
  return fetchGraphQL(GET_USER_PROFILE, getUserProfileQuery)
}

    
export const userSignedIn = cognitoUser => ({
    type: USER_SIGNED_IN,
    cognitoUser
})


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
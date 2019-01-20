import gql from 'graphql-tag';
import { fetchGraphQL } from '../../GlobalActions';
import { getUserProfile } from './UserProfileReducer';

export const GET_USER_PROFILE = 'GET_USER_PROFILE'


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

    


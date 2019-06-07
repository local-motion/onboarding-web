import { GET_USER_PROFILE, USER_SIGNED_IN, USER_SIGNED_OUT, DELETE_USER_PROFILE } from "./UserProfileActions";
import { SUCCESS_POSTFIX } from "../../api/QueryActions";


// State definition

const initialState = {
  // user: {
  //   id:                    id of the user, not for display
  //   name:                  self-chosen name of the user
  //   emailAddress:          email address of user
  //   notificationLevel:     NONE | FULL, whether the user wants to be notified of updates in his initiatives
  //   initiativeMemberships: array of initiativeIds where the user is a member of
  // }
  // cognitoUser:     object returned by the AWS cognito signin
}

// constants
export const NOTIFICATION_LEVEL_NONE = 'NONE'
export const NOTIFICATION_LEVEL_FULL = 'FULL'


// Selectors

export const getUser = (state) => state.userprofile.user
export const getJwtToken = (state) => state.userprofile.cognitoUser ? state.userprofile.cognitoUser.signInUserSession.idToken.jwtToken : ''


// Reducer

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE + SUCCESS_POSTFIX:
        console.log("reducer received fetched user profile:", action.payload)

        if (action.payload.status === 'not_modified')
        return state

        return {
          ...state,
          user: {
            id: action.payload.profile.id,
            name: action.payload.profile.username,
            emailAddress: action.payload.profile.emailAddress,
            notificationLevel: action.payload.profile.notificationLevel,
            initiativeMemberships: action.payload.profile.initiativeMemberships
          }
        }
    
    case DELETE_USER_PROFILE + SUCCESS_POSTFIX:
      return initialState
    
    case USER_SIGNED_IN:
      return {
        ...state,
        cognitoUser: action.cognitoUser
      }

    case USER_SIGNED_OUT:
      return initialState

    default:
      return state
  }
}

export default userProfileReducer

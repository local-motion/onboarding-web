import { SUCCESS_POSTFIX } from "../../GlobalActions";
import { GET_USER_PROFILE, USER_SIGNED_IN, USER_SIGNED_OUT } from "./UserProfileActions";


// State definition

const initialState = {
  // id:            id of the user, not for display
  // name:          self-chosen name of the user
  // cognitoUser:   object returned by the AWS cognito signin
}


// Selectors

export const getUserProfile = (state) => state.userprofile
export const getUserName = (state) => state.userprofile.cognitoUser ? state.userprofile.cognitoUser.username : ''
export const getJwtToken = (state) => state.userprofile.cognitoUser ? state.userprofile.cognitoUser.signInUserSession.idToken.jwtToken : ''


// Reducer

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE + SUCCESS_POSTFIX:
      return {
        ...state,
        id: action.payload.data.profile.id,
        name: action.payload.data.profile.username,
      }
    
    case USER_SIGNED_IN:
      console.log("reducer received user signin:", action.cognitoUser)
      return {
        ...state,
        cognitoUser: action.cognitoUser
      }

    case USER_SIGNED_OUT:
      console.log("reducer received user signout:")
      return {
        ...state,
        cognitoUser: null
      }

    default:
      return state
  }
}

export default userProfileReducer

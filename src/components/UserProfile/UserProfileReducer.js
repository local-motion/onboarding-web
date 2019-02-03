import { SUCCESS_POSTFIX } from "../../GlobalActions";
import { GET_USER_PROFILE, USER_SIGNED_IN, USER_SIGNED_OUT } from "./UserProfileActions";


// State definition

const initialState = {
  // user: {
  //   id:            id of the user, not for display
  //   name:          self-chosen name of the user
  // }
  // cognitoUser:     object returned by the AWS cognito signin
}


// Selectors

// export const getUser = (state) => state.userprofile.user
export const getUser = (state) => {
  return state.userprofile.user
}
export const getJwtToken = (state) => state.userprofile.cognitoUser ? state.userprofile.cognitoUser.signInUserSession.idToken.jwtToken : ''


// Reducer

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE + SUCCESS_POSTFIX:
    console.log("reducer received user profile:", action.payload.data.profile)
      return {
          ...state,
          user: {
            id: action.payload.data.profile.id,
            name: action.payload.data.profile.username,
          }
        }
    
    case USER_SIGNED_IN:
      console.log("reducer received user signin:", action.cognitoUser)
      return {
        ...state,
        cognitoUser: action.cognitoUser
      }

    case USER_SIGNED_OUT:
      console.log("reducer received user signout:")
      return initialState

    default:
      return state
  }
}

export default userProfileReducer

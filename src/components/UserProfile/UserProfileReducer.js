import { SUCCESS_POSTFIX } from "../../GlobalActions";
import { GET_USER_PROFILE } from "./UserProfileActions";


// State definition

const initialState = {
  // id:            id of the user, not for display
  // name:          self-chosen name of the user
}


// Selectors

export const getUserProfile = (state) => state.userprofile


// Reducer

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE + SUCCESS_POSTFIX:
      return {
        id: action.payload.data.profile.id,
        name: action.payload.data.profile.username,
      }
    default:
      return state
  }
}

export default userProfileReducer

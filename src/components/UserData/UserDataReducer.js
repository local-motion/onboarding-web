import { SUCCESS_POSTFIX } from "../../api/QueryActions";
import { GET_USER_DATA } from "./UserDataActions";


// State definition

const initialState = {
  // lastAuditTrailView:      (optional) timestamp of the last view item of the audit trail
}


// Selectors

export const getUserData = (state) => state.userdata
export const getLastAuditTrailView = (state) => state.userdata && state.userdata.lastAuditTrailView


// Reducer

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA + SUCCESS_POSTFIX:
        console.log("reducer received fetched user data:", action.payload)

        if (action.payload.status === 'not_modified')
        return state

        const {__typename, ...trueUserData} = action.payload.userData
        return trueUserData
    
    default:
      return state
  }
}

export default userDataReducer

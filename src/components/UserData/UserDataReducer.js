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

        if (action.payload.status === 'not_modified' || !action.payload.userData)
        return state

        const {__typename, ...trueUserData} = action.payload.userData
        return trueUserData
    
    default:
      return state
  }
}

export default userDataReducer

import { GET_USER_PROFILE, USER_SIGNED_IN, USER_SIGNED_OUT, DELETE_USER_PROFILE, USER_REFRESHED } from "./UserProfileActions";
import { SUCCESS_POSTFIX } from "../../api/QueryActions";


// State definition

const initialState = {
  // commandRecord: {
  //     jobIdentifier;
  //     description;
  //     operatorEmail;
  //     inputParameters;
  // }
  // lastExecutionResult: {

  // }
}

// constants
export const NOTIFICATION_LEVEL_NONE = 'NONE'
export const NOTIFICATION_LEVEL_FULL = 'FULL'


// Selectors

export const getCommandRecord = (state) => state.adminjob.commandRecord


// Reducer

const adminJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_JOB + SUCCESS_POSTFIX:
        console.log("reducer received fetched adminjob", action.payload)

        if (action.payload.status === 'not_modified')
        return state

        return {
          ...state,
          commandRecord: {
            jobIdentifier: action.payload.adminjob.jobIdentifier,
            description: action.payload.adminjob.description,
            operatorEmail: action.payload.adminjob.operatorEmail,
            inputParameters: action.payload.adminjob.inputParameters,
          }
        }
    
    default:
      return state
  }
}

export default adminJobReducer

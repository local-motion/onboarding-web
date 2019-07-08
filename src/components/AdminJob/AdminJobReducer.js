import { SUCCESS_POSTFIX } from "../../api/QueryActions";
import { GET_ADMIN_JOB } from "./AdminJobActions";


// State definition

const initialState = {
  // adminCommand: {
  //     commandIdentifier;
  //     comment;
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

export const getAdminCommand = (state) => state.adminjob.adminCommand


// Reducer

const adminJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_JOB + SUCCESS_POSTFIX:
        console.log("reducer received fetched adminjob", action.payload)

        if (action.payload.status === 'not_modified')
        return state

        if (!action.payload.adminCommand) {
          let newState = { ...state }
          delete newState.adminCommand
          return newState
        }

        return {
          ...state,
          adminCommand: {
            commandIdentifier: action.payload.adminCommand.commandIdentifier,
            comment: action.payload.adminCommand.comment,
            operatorEmail: action.payload.adminCommand.operatorEmail,
            inputParameters: JSON.parse(action.payload.adminCommand.inputParameters),
          }
        }
    
    default:
      return state
  }
}

export default adminJobReducer

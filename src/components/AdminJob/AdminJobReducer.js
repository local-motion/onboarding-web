import { SUCCESS_POSTFIX } from "../../api/QueryActions";
import { GET_ADMIN_JOB, RUN_ADMIN_JOB } from "./AdminJobActions";


// State definition

const initialState = {
  // adminCommand: {
  //     commandIdentifier;
  //     comment;
  //     operatorEmail;
  //     inputParameters;
  // }
  // lastJobResult: {
  //     resultCode:  SUCCESS | FAIL
  //     message:     string to display to user
  //     result:      result object, contents depend on job
  // }
}

// constants
export const NOTIFICATION_LEVEL_NONE = 'NONE'
export const NOTIFICATION_LEVEL_FULL = 'FULL'


// Selectors

export const getAdminCommand = (state) => state.adminjob.adminCommand
export const getLastJobResult = (state) => state.adminjob.lastJobResult


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
    
    case RUN_ADMIN_JOB + SUCCESS_POSTFIX:
        console.log("reducer received run adminjob results", action.payload)

        return {
          ...state,
          lastJobResult: {
            resultCode: action.payload.runAdminJob.resultCode,
            message: action.payload.runAdminJob.message,
            result: JSON.parse(action.payload.runAdminJob.result),
          }
        }
    

    default:
      return state
  }
}

export default adminJobReducer

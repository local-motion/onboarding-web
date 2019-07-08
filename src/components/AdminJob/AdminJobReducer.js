import { SUCCESS_POSTFIX } from "../../api/QueryActions";
import { GET_ADMIN_COMMAND, RUN_ADMIN_JOB } from "./AdminJobActions";


// State definition

const initialState = {
  // adminCommand: {
  //     commandIdentifier;
  //     comment;
  //     operatorEmail;
  //     inputParameters;
  // }
  // jobResult: {                       // cleared after refreshing the command
  //     resultCode:  SUCCESS | FAIL
  //     message:     string to display to user
  //     result:      result object, contents depend on job
  // }
  // lastJobResult: {                   // same as jobResult, but retained after refreshing the command
  // }  
  }

// constants
export const NOTIFICATION_LEVEL_NONE = 'NONE'
export const NOTIFICATION_LEVEL_FULL = 'FULL'


// Selectors

export const getAdminCommand = (state) => state.adminjob.adminCommand
export const getJobResult = (state) => state.adminjob.jobResult
export const getLastJobResult = (state) => state.adminjob.lastJobResult


// Reducer

const adminJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_COMMAND + SUCCESS_POSTFIX:
        console.log("reducer received fetched adminjob", action.payload)

        if (action.payload.status === 'not_modified')
        return state

        if (!action.payload.adminCommand)
          return {
            ...state,
            jobResult: null,
            adminCommand: null,
          }
        else
          return {
            ...state,
            jobResult: null,
            adminCommand: {
              commandIdentifier: action.payload.adminCommand.commandIdentifier,
              comment: action.payload.adminCommand.comment,
              operatorEmail: action.payload.adminCommand.operatorEmail,
              inputParameters: JSON.parse(action.payload.adminCommand.inputParameters),
              validationCode: action.payload.adminCommand.validationCode,
            }
          }
    
    case RUN_ADMIN_JOB + SUCCESS_POSTFIX:
        console.log("reducer received run adminjob results", action.payload)

        const jobResult = {
          resultCode: action.payload.runAdminJob.resultCode,
          message: action.payload.runAdminJob.message,
          result: JSON.parse(action.payload.runAdminJob.result),
        }

        return {
          ...state,
          jobResult,
          lastJobResult: jobResult
        }
    

    default:
      return state
  }
}

export default adminJobReducer

import { OPEN_WARNING_NOTIFICATION, CLOSE_STATUS_NOTIFICATION } from "./StatusNotificationActions";

// State definition

const initialState = null

  /* 
    Currently only one type of notification is supported:
    - warning: displays a non-blocking warning message to the user

    Properties:
    - type:     WARNING_NOTIFICATION
    - message

  */

// Constants

export const WARNING_NOTIFICATION = 'WARNING_NOTIFICATION'


// Selectors

export const getStatusNotification = state => state.statusNotification



// Reducer

const StatusNotificationReducer = (state = initialState, action) => {
  switch (action.type) {

    case OPEN_WARNING_NOTIFICATION:
      return {
        type: WARNING_NOTIFICATION,
        message: action.message,
      }

    case CLOSE_STATUS_NOTIFICATION:
      return initialState

    default:
      return state
  }
}

export default StatusNotificationReducer

import { POSTED_MESSAGE, SET_ACTIVE_CHATBOX, SET_UNACTIVE_CHATBOX, FETCHING_MESSAGES, RECEIVE_CHAT_MESSAGES, SUBMIT_CHAT_MESSAGE, EDIT_CHAT_MESSAGE, SUBMIT_BOT_MESSAGE, GET_CHAT_MESSAGES } from "../actions/chatActions";
import { SUCCESS_POSTFIX } from "../../../GlobalActions";

/* 
Chat item definition:
  - messageId
  - author (set by server)
  - creationTime (set by server)
  - text
*/


const initialState = {
  chatboxId: null,
  messages: [],
  fetching: false,
  editText: '',
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    // case FETCHING_MESSAGES:
    //   return {
    //     ...state,
    //     fetching: true
    //   }
    case POSTED_MESSAGE:
      return {
        ...state,
        editText: ''
      }
    case SET_ACTIVE_CHATBOX:
      console.log("activating chatbox: " + action.chatboxId)
      return {
        ...state,
        chatboxId: action.chatboxId,
        messages: [],
        fetching: false,
        editText: '',
      }
    case SET_UNACTIVE_CHATBOX:
      const newActiveChatebox = action.chatboxId === state.chatboxId ? null : state.chatboxId
      return {
        ...state,
        chatboxId: newActiveChatebox
      }
    // case RECEIVE_CHAT_MESSAGES:
    //   if (action.chatboxId === state.chatboxId)
    //     if (action.append && action.messages.length === 0)
    //       return state// no new messages
    //     else
    //       return {
    //         ...state,
    //         messages: action.append ? state.messages.concat(action.messages) : action.messages,
    //         fetching: false
    //       }
    //   else
    //     return state        // Active chatbox has changed since these messages were fetched

    case GET_CHAT_MESSAGES + SUCCESS_POSTFIX:
      const append = !(action.queryOptions.auxParameters && action.queryOptions.auxParameters.firstPoll)
      if (append && action.payload.length === 0)
        return state// no new messages
      else
        return {
          ...state,
          messages: append ? state.messages.concat(action.payload) : action.payload,
          fetching: false
        }

    // case SUBMIT_CHAT_MESSAGE:
    //   return {
    //     ...state,
    //     messages: [
    //       ...state.messages,
    //       {
    //         author: 'John',
    //         timestamp: new Date().getTime(),
    //         text: state.editText
    //       }
    //     ],
    //     editText: ''
    //   }
    // case SUBMIT_BOT_MESSAGE:
    //   return {
    //     ...state,
    //     messages: [
    //       ...state.messages,
    //       {
    //         author: 'Bot',
    //         timestamp: new Date().getTime(),
    //         text: action.message
    //       }
    //     ],
    //   }
    case EDIT_CHAT_MESSAGE:
      return {
        ...state,
        editText: action.text
      }
    default:
      return state
  }
}

export default chatReducer
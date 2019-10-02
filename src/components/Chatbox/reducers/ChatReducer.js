import { SET_ACTIVE_CHATBOX, SET_UNACTIVE_CHATBOX, EDIT_CHAT_MESSAGE, GET_CHAT_MESSAGES, POST_CHAT_MESSAGE } from "../actions/chatActions";
import { SUCCESS_POSTFIX } from "../../../api/QueryActions";
import { logdebug } from "utils/Logging";

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
  editText: '',
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_ACTIVE_CHATBOX:
      logdebug("activating chatbox: " + action.chatboxId)
      return {
        ...state,
        chatboxId: action.chatboxId,
        messages: [],
        editText: '',
      }

    case SET_UNACTIVE_CHATBOX:
      const newActiveChatebox = action.chatboxId === state.chatboxId ? null : state.chatboxId
      return {
        ...state,
        chatboxId: newActiveChatebox
      }

    case GET_CHAT_MESSAGES + SUCCESS_POSTFIX:
      if (action.payload.length === 0)
        return state// no new messages
      else
        return {
          ...state,
          messages: state.messages.concat(action.payload),
        }

    case EDIT_CHAT_MESSAGE:
      return {
        ...state,
        editText: action.text
      }

    // case POSTED_MESSAGE:
    case POST_CHAT_MESSAGE + SUCCESS_POSTFIX:
      return {
        ...state,
        editText: ''
      }

    default:
      return state
  }
}

export default chatReducer
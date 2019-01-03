import { POSTED_MESSAGE, SET_ACTIVE_CHATBOX, FETCHING_MESSAGES, RECEIVE_CHAT_MESSAGES, SUBMIT_CHAT_MESSAGE, EDIT_CHAT_MESSAGE, SUBMIT_BOT_MESSAGE } from "../actions/chatActions";

/* 
Chat item definition:
  - messageId
  - author (set by server)
  - creationTime (set by server)
  - text
*/


const initialState = {
  chatboxId: null,
  jwtToken: null,
  messages: [],
  fetching: false,
  editText: '',
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_MESSAGES:
      return {
        ...state,
        fetching: true
      }
    case POSTED_MESSAGE:
      return {
        ...state,
        editText: ''
      }
    case SET_ACTIVE_CHATBOX:
      return {
        ...state,
        chatboxId: action.chatboxId,
        jwtToken: action.jwtToken
      }
    case RECEIVE_CHAT_MESSAGES:
      return {
        ...state,
        messages: action.messages,
        fetching: false
      }
    case SUBMIT_CHAT_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            author: 'John',
            timestamp: new Date().getTime(),
            text: state.editText
          }
        ],
        editText: ''
      }
    case SUBMIT_BOT_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            author: 'Bot',
            timestamp: new Date().getTime(),
            text: action.message
          }
        ],
      }
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
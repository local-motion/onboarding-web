import { RECEIVE_CHAT_MESSAGES, RETRIEVE_CHAT_MESSAGES, SUBMIT_CHAT_MESSAGE, EDIT_CHAT_MESSAGE, SUBMIT_BOT_MESSAGE } from "../actions/chatActions";

/* 
Chat item definition:
  - author
  - timestamp
  - text
*/


const initialState = {
  messages: [],
  editText: '',
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_CHAT_MESSAGES:
      return {
        ...state,
        messages: [
          {
            author: 'John',
            timestamp: new Date().getTime(),
            text: 'Hi'
          },
          {
            author: 'John',
            timestamp: new Date().getTime(),
            text: "I'm John"
          },
          {
            author: 'John',
            timestamp: new Date().getTime(),
            text: 'How are you?'
          },
        ],
      }
    case RECEIVE_CHAT_MESSAGES:
      return {
        ...state,
        // messages: action.messages.map(message => ({author: 'Jaap', timestamp: new Date().getTime(), text: message}))
        messages: action.messages
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
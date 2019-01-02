import { uuid } from "../scripts/Generics";


// Action type definitions
export const RETRIEVE_CHAT_MESSAGES = 'RETRIEVE_CHAT_MESSAGES'
export const RECEIVE_CHAT_MESSAGES = 'RECEIVE_CHAT_MESSAGES'
export const EDIT_CHAT_MESSAGE = 'EDIT_CHAT_MESSAGE'
export const SUBMIT_CHAT_MESSAGE = 'SUBMIT_CHAT_MESSAGE'
export const SUBMIT_BOT_MESSAGE = 'SUBMIT_BOT_MESSAGE'
export const POST_CHAT_MESSAGE = 'POST_CHAT_MESSAGE'
export const SIGNAL_ERROR = 'SIGNAL_ERROR'

// Actions
export const retrieveChatMessages = () => {
  return function (dispatch) {
    return fetch('http://localhost:8086/api/chatbox').then(
      response => response.json().then(json => dispatch(receiveChatMessage(json), error => alert('oh no error!' + error))),
      error => dispatch(signalError(error))
    );
  };
}

export const receiveChatMessage = messages => {
  console.log('receiving...' + JSON.stringify(messages))

  return ({
  type: RECEIVE_CHAT_MESSAGES,
  messages
  })
}

export function postChatMessage(text) {
  return function (dispatch, getState) {
    
    const chatMessage = {
      messageId: uuid(),
      name: 'Dimitri',
      message: getState().chat.editText
    }
    
    return fetch('http://localhost:8086/api/chatbox', {
        method: 'POST',
        body: JSON.stringify(chatMessage),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .catch(error => dispatch(signalError(error)))
      .then(json => dispatch(retrieveChatMessages()));
  };
}

export const signalError = error => ({
  type: SIGNAL_ERROR,
  error
})


export const editChatMessage = text => ({
  type: EDIT_CHAT_MESSAGE,
  text
})

export const submitChatMessage = () => ({
  type: SUBMIT_CHAT_MESSAGE,
})

export const submitBotMessage = message => ({
  type: SUBMIT_BOT_MESSAGE,
  message
})


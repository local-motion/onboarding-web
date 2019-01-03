import { uuid } from "../scripts/Generics";
import {Auth} from "aws-amplify";


// Action type definitions
export const RECEIVE_CHAT_MESSAGES = 'RECEIVE_CHAT_MESSAGES'
export const EDIT_CHAT_MESSAGE = 'EDIT_CHAT_MESSAGE'
export const SUBMIT_CHAT_MESSAGE = 'SUBMIT_CHAT_MESSAGE'
export const SUBMIT_BOT_MESSAGE = 'SUBMIT_BOT_MESSAGE'
export const POST_CHAT_MESSAGE = 'POST_CHAT_MESSAGE'
export const SIGNAL_ERROR = 'SIGNAL_ERROR'

export const SET_ACTIVE_CHATBOX = 'SET_ACTIVE_CHATBOX'
export const FETCHING_MESSAGES = 'FETCHING_MESSAGES'
export const POSTED_MESSAGE = 'POSTED_MESSAGE'


// Actions
export const activateChatbox = chatboxId => {
  return dispatch => {

  
    Auth.currentAuthenticatedUser().then(user => {
      const jwtToken = user.signInUserSession.idToken.jwtToken
      console.log('active chatbox: ' + chatboxId)
      console.log("JWT token: " + jwtToken)
      dispatch({type: SET_ACTIVE_CHATBOX, chatboxId, jwtToken})
      dispatch(fetchChatMessages(chatboxId))
      });

  }
}

export const fetchChatMessages = () => {
  return (dispatch, getState) => {
    const chatboxId = getState().chat.chatboxId
    console.log('fetching chat messages for ' + chatboxId)
    dispatch({type: FETCHING_MESSAGES})
    return fetch('http://localhost:8086/api/chatbox/' + chatboxId, {
      headers: {
        Authorization: "Bearer " + getState().chat.jwtToken
      }
    }).then(
      response => response.json().then(json => dispatch(receiveChatMessage(json), error => alert('oh no error!' + error))),
      error => dispatch(signalError(error))
    )
  }
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
    
    const chatboxId = getState().chat.chatboxId

    const chatMessage = {
      messageId: uuid(),
      author: 'Dimitri',
      text: getState().chat.editText
    }

    dispatch({type: POSTED_MESSAGE})

    return fetch('http://localhost:8086/api/chatbox/' + chatboxId, {
        method: 'POST',
        body: JSON.stringify(chatMessage),
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + getState().chat.jwtToken
        }
      })
      .then(response => response.json())
      .catch(error => dispatch(signalError(error)))
      .then(json => dispatch(fetchChatMessages()));
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


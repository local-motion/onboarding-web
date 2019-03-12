import { uuid } from "../scripts/Generics";
import { getJwtToken } from "../../UserProfile/UserProfileReducer";
import { startGraphQLStream, stopStream } from "../../../api/ApiActions";


// Action type definitions
export const RECEIVE_CHAT_MESSAGES = 'RECEIVE_CHAT_MESSAGES'
export const EDIT_CHAT_MESSAGE = 'EDIT_CHAT_MESSAGE'
export const SUBMIT_CHAT_MESSAGE = 'SUBMIT_CHAT_MESSAGE'
export const SUBMIT_BOT_MESSAGE = 'SUBMIT_BOT_MESSAGE'
export const POST_CHAT_MESSAGE = 'POST_CHAT_MESSAGE'
export const SIGNAL_ERROR = 'SIGNAL_ERROR'

export const SET_ACTIVE_CHATBOX = 'SET_ACTIVE_CHATBOX'
export const SET_UNACTIVE_CHATBOX = 'SET_UNACTIVE_CHATBOX'
export const FETCHING_MESSAGES = 'FETCHING_MESSAGES'
export const POSTED_MESSAGE = 'POSTED_MESSAGE'

export const GET_CHAT_MESSAGES = 'GET_CHAT_MESSAGES'
export const CHAT_STREAM = 'CHAT'


// Actions
export const activateChatbox = chatboxId => dispatch => {
      dispatch({type: SET_ACTIVE_CHATBOX, chatboxId})
      dispatch(fetchChatMessages(true))
}

export const deactivateChatbox = chatboxId => (
  {type: SET_UNACTIVE_CHATBOX, chatboxId}
)

export const startChatStream = chatboxId => (dispatch, getState) => {
  const query = (getState().environmentProperties.api.chatbox + "/") + chatboxId
  dispatch(startGraphQLStream(CHAT_STREAM + chatboxId, GET_CHAT_MESSAGES, query, {}))
}

export const stopChatStream = chatboxId => {
  return stopStream(CHAT_STREAM + chatboxId)
}


export const fetchChatMessages = (reload=false) => {
  return (dispatch, getState) => {
    const chatState = getState().chat
    const chatboxId = chatState.chatboxId

    if (chatboxId !== null) {
      const lastMessageId = (!reload && chatState.messages.length > 0) ? chatState.messages[chatState.messages.length-1].messageId : null;
      var url;
      if (lastMessageId === null) {
        url = (getState().environmentProperties.api.chatbox + "/") + chatboxId
      }
      else {
        url = (getState().environmentProperties.api.chatbox  + "/") + chatboxId + "?since=" + lastMessageId
      }

      dispatch({type: FETCHING_MESSAGES})

      fetch(url, {
        }).then(
          response => {
            if (lastMessageId === null) {
              response.json().then(json => dispatch(receiveChatMessage(chatboxId, json), error => alert('oh no error!' + error)))
            }
            else {
              response.json().then(json => dispatch(receiveChatMessage(chatboxId, json, true), error => alert('oh no error!' + error)))
            }
            // Keep polling if this is still the active chatbox
            if (chatboxId === getState().chat.chatboxId) {
                setTimeout(() => dispatch(fetchChatMessages()), 3000)
            }
          },
          error => dispatch(signalError(error))
        )
    }
  }
}


export const receiveChatMessage = (chatboxId, messages, append=false) => {

  return ({
  type: RECEIVE_CHAT_MESSAGES,
  chatboxId,
  messages,
  append
  })
}

export function postChatMessage(text) {
  return function (dispatch, getState) {
    
    const chatboxId = getState().chat.chatboxId

    const chatMessage = {
      messageId: uuid(),
      text: getState().chat.editText
    }
    console.log("POSTING: ", chatMessage)

    dispatch({type: POSTED_MESSAGE})

    const url = getState().environmentProperties.api.chatbox + '/' + chatboxId
    console.log("to url: " + url)
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(chatMessage),
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + getJwtToken(getState())
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


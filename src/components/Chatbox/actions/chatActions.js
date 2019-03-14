import { uuid } from "../scripts/Generics";
import { stopStream, triggerStream, startStream } from "../../../api/StreamActions";
import { REST_GET, executeQuery, REST_POST } from "../../../api/QueryActions";
import { getEnvironmentProperties } from "../../../misc/ConfigReducer";


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


export const activateChatbox = chatboxId => (dispatch, getState) => {
  console.log('activating chatbox ' + chatboxId)
  dispatch({type: SET_ACTIVE_CHATBOX, chatboxId})

  const chatEndpoint = getEnvironmentProperties(getState()).api.chatbox
  let firstPoll = true
  const queryFunction = (stream, dispatch, getState) => {
    let url
    if (firstPoll)
      url = (chatEndpoint + "/") + chatboxId
    else {
      const chatState = getState().chat
      const lastMessageId = (chatState.messages.length > 0) ? chatState.messages[chatState.messages.length-1].messageId : null;
      url = chatEndpoint  + "/" + chatboxId + (lastMessageId ? "?since=" + lastMessageId : '')
    }
    firstPoll = false

    const query = {
      type: REST_GET,      
      baseActionIdentifier: GET_CHAT_MESSAGES,
      fetchId: chatboxId,
      query: url,
    }
    return query
  }

  dispatch(startStream(CHAT_STREAM, queryFunction, {pollingInterval: 3000}))
}

export const deactivateChatbox = chatboxId => dispatch => {
  console.log('deactivating chatbox ' + chatboxId)

  dispatch({type: SET_UNACTIVE_CHATBOX, chatboxId})
  dispatch(stopStream(CHAT_STREAM))
}

export const editChatMessage = text => ({
  type: EDIT_CHAT_MESSAGE,
  text
})

export const postChatMessage = text => (dispatch, getState) => {
  const chatboxId = getState().chat.chatboxId

  const chatMessage = {
    messageId: uuid(),
    text: getState().chat.editText
  }
  const query = getEnvironmentProperties(getState()).api.chatbox + '/' + chatboxId

  const onSuccess = (data, dispatch, getState, queryOptions, response) => {
    dispatch({type: POSTED_MESSAGE})
    dispatch(triggerStream(CHAT_STREAM))
  }

  dispatch(executeQuery( {
    type: REST_POST,
    baseActionIdentifier: POST_CHAT_MESSAGE, 
    fetchId: chatMessage.messageId,
    query,
    variables: chatMessage,
    onSuccess,
  }))

  dispatch({type: POSTED_MESSAGE})
}

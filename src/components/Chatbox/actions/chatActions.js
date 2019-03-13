import { uuid } from "../scripts/Generics";
import { stopStream, triggerStream, startStream } from "../../../api/StreamActions";
import { REST_GET, executeQuery, REST_POST } from "../../../api/QueryActions";


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
// export const activateChatbox = chatboxId => dispatch => {
//       dispatch({type: SET_ACTIVE_CHATBOX, chatboxId})
//       dispatch(fetchChatMessages(true))
// }
export const activateChatbox = chatboxId => {
      return startChatStream2(chatboxId)
}

export const deactivateChatbox = chatboxId => {
  // return {type: SET_UNACTIVE_CHATBOX, chatboxId}
  return stopChatStream(chatboxId)
}

export const startChatStream2 = chatboxId => (dispatch, getState) => {
  console.log('activating chatbox ' + chatboxId)
  dispatch({type: SET_ACTIVE_CHATBOX, chatboxId})

  const chatEndpoint = getState().environmentProperties.api.chatbox
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

    console.log ('returning query: ' + query)
    return query
  }

  dispatch(startStream(CHAT_STREAM, queryFunction))
}

export const stopChatStream = chatboxId => dispatch => {
  console.log('deactivating chatbox ' + chatboxId)

  dispatch({type: SET_UNACTIVE_CHATBOX, chatboxId})
  dispatch(stopStream(CHAT_STREAM))
}

export const postChatMessage = text => (dispatch, getState) => {
  const chatboxId = getState().chat.chatboxId

  const chatMessage = {
    messageId: uuid(),
    text: getState().chat.editText
  }
  const query = getState().environmentProperties.api.chatbox + '/' + chatboxId

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

// export function postChatMessage(text) {
//   return function (dispatch, getState) {
    
//     const chatboxId = getState().chat.chatboxId

//     const chatMessage = {
//       messageId: uuid(),
//       text: getState().chat.editText
//     }
//     console.log("POSTING: ", chatMessage)

//     dispatch({type: POSTED_MESSAGE})

//     const url = getState().environmentProperties.api.chatbox + '/' + chatboxId
//     return fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(chatMessage),
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: "Bearer " + getJwtToken(getState())
//         }
//       })
//       .then(response => response.json())
//       .catch(error => dispatch(signalError(error)))
//       .then(json => dispatch(fetchChatMessages()));
//   };
// }

// export const signalError = error => ({
//   type: SIGNAL_ERROR,
//   error
// })


export const editChatMessage = text => ({
  type: EDIT_CHAT_MESSAGE,
  text
})

// export const submitChatMessage = () => ({
//   type: SUBMIT_CHAT_MESSAGE,
// })

// export const submitBotMessage = message => ({
//   type: SUBMIT_BOT_MESSAGE,
//   message
// })


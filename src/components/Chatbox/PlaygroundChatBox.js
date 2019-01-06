import React from 'react'
import { connect } from 'react-redux'
import ChatBox from './views/ChatBox';
import { deactivateChatbox, activateChatbox, postChatMessage, submitChatMessage, editChatMessage, submitBotMessage } from './actions/chatActions';

const chatBox = (props) => (<ChatBox {...props}/>)

const mapStateToProps = state => {
    return {
        chatMessages: state.chat.messages,
        messageText: state.chat.editText,
      }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitHandler:    () =>     dispatch(postChatMessage()),
        onChangeHandler:    event => dispatch(editChatMessage(event.target.value)),
        onTextKeyPress:     event => event.key === 'Enter' && dispatch(submitChatMessage()),
        submitBotMessage:   message => dispatch(submitBotMessage(message)),
        setActiveChatbox:   chatboxId => dispatch(activateChatbox(chatboxId)),
        deactivateChatbox:   chatboxId => dispatch(deactivateChatbox(chatboxId))
      }
}

const PlaygroundChatBox = connect(mapStateToProps, mapDispatchToProps)(chatBox)

export default PlaygroundChatBox

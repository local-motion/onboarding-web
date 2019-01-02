import React from 'react'
import { connect } from 'react-redux'
import ChatBox from './views/ChatBox';
import { postChatMessage, retrieveChatMessages, submitChatMessage, editChatMessage, submitBotMessage } from './actions/chatActions';

const chatBox = ({postChatMessage, chatMessages, messageText, onChangeHandler, onSubmitHandler, submitBotMessage, getMessages}) => 
    (<ChatBox postChatMessage= {postChatMessage} chatMessages={chatMessages} messageText={messageText} onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} submitBotMessage={submitBotMessage} getMessages={getMessages}/>)

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
        getMessages:        () => dispatch(retrieveChatMessages()),
      }
}

const PlaygroundChatBox = connect(mapStateToProps, mapDispatchToProps)(chatBox)

export default PlaygroundChatBox

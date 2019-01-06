import React from 'react';
import ChatMessageList from './ChatMessageList';
import ChatMessageEntryBox from './ChatMessageEntryBox';
import { withStyles } from '@material-ui/core/styles';
import { greet, respond } from '../scripts/chatbot';


const styles = theme => ({
  pane: {
    backgroundColor: '#F0F0F0',
    height: '250px',
    overflow: 'auto',
  },
});

class ChatBox extends React.Component {

  chatboxId = null;

  onSubmitHandler = () => {
    if (this.props.messageText !== '') {
      // respond(message => this.props.submitBotMessage(message))
      this.props.onSubmitHandler()
    }
  }

  componentDidMount() {
    this.chatboxId = window.location.pathname.split("/").pop();
    this.props.setActiveChatbox(this.chatboxId)
    this.setScrollState()
  }

  componentDidUpdate() {
    this.setScrollState()
  }

  componentWillUnmount() {
    this.props.deactivateChatbox(this.chatboxId)
  }

  setScrollState() {
    var element = document.getElementById("chatPane");
    element.scrollTop = element.scrollHeight;
  }

  render() {
    const {chatMessages=[], messageText='', onChangeHandler, onTextKeyPress, submitBotMessage} = this.props

    // if (chatMessages.length === 0) {
    //   greet(message => submitBotMessage(message))
    // }

    return (
    <div>
      <div id="chatPane" className={this.props.classes.pane}>
        <ChatMessageList items={chatMessages}/>
      </div>
      <ChatMessageEntryBox onSubmitClick={this.onSubmitHandler} onTextChange={onChangeHandler} text={messageText} onTextKeyPress={onTextKeyPress}/>
    </div>
  );
  }
}

export default withStyles(styles)(ChatBox)
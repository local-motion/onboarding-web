import React from 'react';
import ChatMessageList from './ChatMessageList';
import ChatMessageEntryBox from './ChatMessageEntryBox';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { getUser } from '../../UserProfile/UserProfileReducer';

const styles = theme => ({
  pane: {
    backgroundColor: '#F0F0F0',
    height: '250px',
    overflow: 'auto',
  },
});

const mapStateToProps = state => ({
  user: getUser(state)
})

class ChatBox extends React.Component {

  chatboxId = null;

  onSubmitHandler = () => {
    if (this.props.messageText !== '') {
      this.props.onSubmitHandler()
    }
  }

  componentDidMount() {
    this.chatboxId = window.location.pathname.split("/").pop();
    // this.chatboxId = this.props.match.params.initiativeId
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
    const {chatMessages=[], messageText='', onChangeHandler, onTextKeyPress, user} = this.props

    return (
    <div>
      <div id="chatPane" className={this.props.classes.pane}>
        <ChatMessageList items={chatMessages}/>
      </div>
      {user &&
        <ChatMessageEntryBox onSubmitClick={this.onSubmitHandler} onTextChange={onChangeHandler} text={messageText} onTextKeyPress={onTextKeyPress}/>
      }
    </div>
  );
  }
}

export default withStyles(styles)(connect(mapStateToProps)(ChatBox));

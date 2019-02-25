import React from 'react';
import ChatMessageList from './ChatMessageList';
import ChatMessageEntryBox from './ChatMessageEntryBox';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { getUser } from '../../UserProfile/UserProfileReducer';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  chatBox: {
    display: "flex",
    flexFlow: "column",
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  list: {
    // backgroundColor: '#F0F0F0',
    // height: '250px',
    // height: '100%',
    flexGrow: "1",
    // height: 'fill',
    width: '100%',
    overflow: 'auto',
  },
  entryField: {
    // backgroundColor: '#F0F0F0',
    height: '100px',
    width: '100%',
  },
});

const mapStateToProps = state => ({
  user: getUser(state)
})

class ChatBox extends React.Component {

  onSubmitHandler = () => {
    if (this.props.messageText !== '') {
      this.props.onSubmitHandler()
    }
  }

  componentDidMount() {
    this.props.setActiveChatbox(this.props.chatboxId)
    this.setScrollState()
  }

  componentDidUpdate() {
    this.setScrollState()
  }

  componentWillUnmount() {
    this.props.deactivateChatbox(this.props.chatboxId)
  }

  setScrollState() {
    var element = document.getElementById("chatPane");
    element.scrollTop = element.scrollHeight;
  }

  render() {
    const {classes, chatMessages=[], messageText='', onChangeHandler, onTextKeyPress, user} = this.props

    return (
      // <Card>
      // <Paper className={classes.paper} elevation={1}>
      <Paper elevation={1}  className={classes.chatBox}>
        <div id="chatPane" className={classes.list}>
          <ChatMessageList items={chatMessages}/>
        </div>
        {user &&
          <ChatMessageEntryBox onSubmitClick={this.onSubmitHandler} onTextChange={onChangeHandler} text={messageText} onTextKeyPress={onTextKeyPress}  className={classes.entryField}/>
        }
      {/* </Card> */}
      </Paper>
  )
  }
}

export default withStyles(styles)(connect(mapStateToProps)(ChatBox));

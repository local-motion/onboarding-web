import React from 'react';
import ChatMessageList from './ChatMessageList';
import ChatMessageEntryBox from './ChatMessageEntryBox';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

const styles = theme => ({
  chatBox: {
    display: "flex",
    height: '100%',
  },
  list: {
    margin: '4px 0px 2px 0px',
    overflow: 'auto',
    scrollbarWidth: 'none',       // hide the scrollbar in firefox
    // WebkitScrollbar: {
    //   display: 'none'
    // }
  },
})


class ChatBox extends React.Component {

  state = {
    scrolledToBottom: true
  }

  onSubmitHandler = () => {
    if (this.props.messageText !== '') {
      this.props.onSubmitHandler()
      this.scrollToBottom()
    }
  }

  componentDidMount() {
    this.props.setActiveChatbox()
    this.scrollToBottom()
  }

  componentDidUpdate() {
    if (this.state.scrolledToBottom)
      this.scrollToBottom()
  }

  componentWillUnmount() {
    this.props.deactivateChatbox()
  }

  scrollToBottom() {
    var element = document.getElementById("chatPane")
    element.scrollTop = element.scrollHeight
  }

  onMessageListScroll() {
    var element = document.getElementById("chatPane")
    this.setState({scrolledToBottom: element.scrollHeight - element.scrollTop === element.offsetHeight})
  }

  render() {
    const {classes, chatMessages=[], messageText='', onChangeHandler, onTextKeyPress, chatDisabled, userName} = this.props

    return (
      <Paper elevation={1} className={classes.chatBox}>
        <Grid container direction="column" wrap="nowrap">
          <Grid item xs  id="chatPane" className={classes.list} onScroll={() => this.onMessageListScroll()}>
            <ChatMessageList items={chatMessages} userName={userName} />
          </Grid>
          <Grid item xs="auto">
            {!chatDisabled &&
              <ChatMessageEntryBox 
                disabled={chatDisabled}
                onTextKeyPress={onTextKeyPress}  
                onTextChange={onChangeHandler} 
                onSubmitClick={this.onSubmitHandler} 
                text={messageText} 
              />
            }
          </Grid>
        </Grid>
      </Paper>
  )
  }
}

export default withStyles(styles)(ChatBox)

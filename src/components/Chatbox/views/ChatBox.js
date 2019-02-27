import React from 'react';
import ChatMessageList from './ChatMessageList';
import ChatMessageEntryBox from './ChatMessageEntryBox';
import { withStyles } from '@material-ui/core/styles';
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
    // overflow: 'hidden',
    scrollbarWidth: 'none',       // hide the scrollbar in firefox
    // WebkitScrollbar: {
    //   display: 'none'
    // }
  },
  entryField: {
    // backgroundColor: '#F0F0F0',
    height: '100px',
    width: '100%',
  },
});


class ChatBox extends React.Component {

  onSubmitHandler = () => {
    if (this.props.messageText !== '') {
      this.props.onSubmitHandler()
    }
  }

  componentDidMount() {
    this.props.setActiveChatbox()
    this.setScrollState()
  }

  componentDidUpdate() {
    this.setScrollState()
  }

  componentWillUnmount() {
    this.props.deactivateChatbox()
  }

  setScrollState() {
    var element = document.getElementById("chatPane");
    element.scrollTop = element.scrollHeight;
  }

  render() {
    const {classes, chatMessages=[], messageText='', onChangeHandler, onTextKeyPress, chatDisabled, userName} = this.props

    return (
      <Paper elevation={1}  className={classes.chatBox}>
        <div id="chatPane" className={classes.list} >
          <ChatMessageList items={chatMessages} userName={userName} />
        </div>
        {/* {!chatDisabled && */}
        {
          <ChatMessageEntryBox 
            className={classes.entryField}
            disabled={chatDisabled}
            onTextKeyPress={onTextKeyPress}  
            onTextChange={onChangeHandler} 
            onSubmitClick={this.onSubmitHandler} 
            text={messageText} 
          />
        }
      </Paper>
  )
  }
}

export default withStyles(styles)(ChatBox)

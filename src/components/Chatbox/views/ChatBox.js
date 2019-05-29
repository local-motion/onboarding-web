import React from 'react';
import ChatMessageList from './ChatMessageList';
import ChatMessageEntryBox from './ChatMessageEntryBox';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import debounce from 'lodash/debounce';
import { titlePrefix } from "../../../misc/WorkspaceHelpers";
import { Helmet } from "react-helmet";

const styles = theme => ({
  chatTitleContainer: {
    padding: '20px 25px',
    borderBottom: '1px solid #e7e7e7',
  },
  chatTitle: {
    fontSize: '30px',
    fontFamily: '"dk_black_bamboo-webfont"',
    margin: '5px 0',
    textAlign: 'left',
    color: '#626262',
    textTransform: 'uppercase',
  },
  chatBox: {
    display: "flex",
    height: '100%',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: `1px 1px 5px 0px rgba(0,0,0,0.2)`
  },
  list: {
    background: '#fcfcfc',
    margin: '4px 0 0',
    overflow: 'auto',
    scrollbarWidth: 'none',       // hide the scrollbar in firefox
    flexBasis: '350px',
    // WebkitScrollbar: {
    //   display: 'none'
    // }
  },
  chatWrapper: {
    borderTop: '1px solid #e7e7e7',
    boxShadow: '0px 0px 10px 0px rgba(98,98,98,0.1)',
  },
})


class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.activateTyping = this.activateTyping.bind(this);
    this.deactivateTyping = debounce(this.deactivateTyping.bind(this), 1000);
    this.onTextChange = this.onTextChange.bind(this);
  }

  state = {
    scrolledToBottom: true,
    isTyping: false,
  }

  onSubmitHandler = () => {
    if (this.props.messageText !== '') {
      this.props.onSubmitHandler()
      this.setState({scrolledToBottom: true})
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
    const scrollDifferenceFromBottom = element.scrollHeight - element.scrollTop - element.offsetHeight    // Note that this value is a float and can be inexact
    const scrolledToBottom = Math.abs(scrollDifferenceFromBottom) < 2
    this.setState({scrolledToBottom})
  }

  deactivateTyping() {
    this.setState({ isTyping: false });
  }

  activateTyping() {
    this.setState({ isTyping: true });

    this.deactivateTyping();
  }

  onTextChange(text) {
    this.props.onChangeHandler(text);
    // this.activateTyping();
  }

  render() {
    const {classes, chatMessages=[], messageText='', chatDisabled, userName, playground} = this.props
    return (
      <Paper elevation={2} className={classes.chatBox}>
          <Helmet>
              <title>{titlePrefix} | Chat {playground.name}</title>
          </Helmet>
        <Grid container direction="column" wrap="nowrap">
          <div className={classes.chatTitleContainer}>
            <div className={classes.chatTitle}>Chat</div>
          </div>
          <Grid item xs  id="chatPane" className={classes.list} onScroll={() => this.onMessageListScroll()}>
            <ChatMessageList items={chatMessages} userName={userName} isTyping={this.state.isTyping} />
          </Grid>
          <Grid item xs="auto" className={classes.chatWrapper}>
            {!chatDisabled &&
              <ChatMessageEntryBox
                disabled={chatDisabled}
                onTextChange={this.onTextChange}
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

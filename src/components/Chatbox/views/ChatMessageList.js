import React from 'react';
import { List } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import ChatMessageItem from './ChatMessageItem';

const styles = theme => ({
    messageCountWrapper: {
        position: 'relative',
        display: 'block',
        '&:before': {
            content: '""',
            border: 0,
            borderTop: 'dotted 1px #a7a7a7',
            fontSize: '2px',
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            zIndex: 1,
        }
    },
    messageCountBox: {
        display: 'block',
        margin: '10px auto',
        background: '#fcfcfc',
        borderRadius: '40px',
        width: '150px',
        zIndex: 1,
        position: 'relative',
        padding: '10px',
    },
    messageCount: {
        display: 'block',
        margin: 0,
        border: '1px solid #e7e7e7',
        background: '#fcfcfc',
        borderRadius: '30px',
        padding: '4px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#626262',
        zIndex: 3,
        position: 'relative',
        width: '100%',
        fontWeight: 400,
    },
});

class ChatMessageList extends React.PureComponent /* using PureComponent to overcome the performance penalty when rendering large lists */ {

  renderItem = (item) => {
    const { userName } = this.props;

    return (<ChatMessageItem key={item.creationTime} userName={userName} {...item}/>);
  };

  renderUnreadMessages = (howManyUnread, items) => {
    const { classes } = this.props;
    return (
      <div>
        {items.slice(0, -2).map(this.renderItem)}

        {howManyUnread && (
          <div className={classes.messageCountWrapper}>
            <span className={classes.messageCountBox}>
              <span className={classes.messageCount}>{howManyUnread} message{howManyUnread > 1 ? 's' : ''}</span>
            </span>
          </div>
        )}

        {items.slice(-2).map(this.renderItem)}
      </div>
    )
  };

  render() {
    const { items=[], howManyUnread = 2, isTyping, userName } = this.props;

    const typingItem = {
        creationTime: Date.now(),
        author: userName,
        isTyping,
    };

    return (
      <List>
        {/*{*/}
          {/*items.length > 2*/}
            {/*? this.renderUnreadMessages(howManyUnread, items)*/}
            {/*: items.map(this.renderItem)*/}
        {/*}*/}
        {items.map(this.renderItem)}

        {/*{isTyping && this.renderItem(typingItem)}*/}
      </List>
    )
  }
}
  
export default withStyles(styles)(ChatMessageList)
import React from 'react'
import { List } from '@material-ui/core';
import ChatMessageItem from './ChatMessageItem';

class ChatMessageList extends React.PureComponent /* using PureComponent to overcome the performance penalty when rendering large lists */ {

  render() {
    const { userName, items=[] } = this.props
    return (
      <List>
        {items.map(item => <ChatMessageItem key={item.creationTime} userName={userName} {...item}/>)}
      </List>
    )
  }
}
  
export default ChatMessageList
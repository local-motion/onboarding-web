import React from 'react'
import { List } from '@material-ui/core';
import ChatMessageItem from './ChatMessageItem';

// class ChatMessageList extends React.Component {
class ChatMessageList extends React.PureComponent {

  /**
   * 
   * Apparently the PureComponent approach now work, so the shouldComponentUpdate is not required. Todo: verify
   * 
   * To prevent performance problems when rendering large lists of chat items (already occurring when over 50 items), we will only
   * update the list when the number of items change (and chatbox and user remain the same). This is based on the fact that chat items
   * are immutable and the list is append only. Note that a simple array compare of using React.PureComponent does not work. 
   * Alternative solutions may be using reselect to get caching into the redux handler and/or removing the editText from the redux state
   * as this will trigger rerendering on every entered character
   */
  // shouldComponentUpdate(nextProps) {
  //   return  this.props.chatboxId !== nextProps.chatboxId || 
  //           this.props.items.length !== nextProps.items.length || 
  //           this.props.userName !== nextProps.userName
  // }

  render() {
    const { userName, items=[] } = this.props
    console.log('ML rendering (' + items.length + ')')
    return (
      <List>
        {items.map(item => <ChatMessageItem key={item.creationTime} userName={userName} {...item}/>)}
      </List>
    )
  }
}
  
export default ChatMessageList
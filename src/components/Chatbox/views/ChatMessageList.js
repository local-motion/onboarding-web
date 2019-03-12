import React from 'react'
import { List } from '@material-ui/core';
import ChatMessageItem from './ChatMessageItem';
import PropTypes from 'prop-types';

// const ChatMessageList = ({ userName, items=[] }) => (
//     <List>
//         {items.map(item => <ChatMessageItem key={item.creationTime} userName={userName} {...item}/>)}
//     </List>

// )



class ChatMessageList extends React.Component {

  
    componentDidMount() {
    }
  
    shouldComponentUpdate(nextProps) {
        console.log('ML should update this.props: ', this.props)
        console.log('ML should update nextProps: ', nextProps)
        return this.props.items.length !== nextProps.items.length || this.props.userName !== nextProps.userName     // TODO we need to forceUpdate on chatbox changes
    }
    componentDidUpdate() {
    }
  
    componentWillUnmount() {
      console.log('ML unmounting')
    }
  
    render() {
        const { userName, items=[] } = this.props
      console.log('ML rendering')
      return (
        <List>
        {items.map(item => <ChatMessageItem key={item.creationTime} userName={userName} {...item}/>)}
    </List>

    )
    }
  }
  



ChatMessageList.propTypes = {
    items: PropTypes.array
}

export default ChatMessageList
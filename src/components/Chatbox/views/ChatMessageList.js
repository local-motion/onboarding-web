import React from 'react'
import { List } from '@material-ui/core';
import ChatMessageItem from './ChatMessageItem';
import PropTypes from 'prop-types';

const ChatMessageList = ({ userName, items=[] }) => (
    <List>
        {items.map(item => <ChatMessageItem key={item.creationTime} userName={userName} {...item}/>)}
    </List>

)

ChatMessageList.propTypes = {
    items: PropTypes.array
}

export default ChatMessageList
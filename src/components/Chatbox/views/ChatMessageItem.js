import React from 'react'
import { ListItem, Chip, Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

const ChatMessageItem = ({children, author, timestamp, message}) => (
    <ListItem>
        <Chip color={author === 'Bot' ? 'secondary' : 'primary'} avatar={<Avatar>{author === 'Bot' ? <FaceIcon/> :  'JS'}</Avatar>} label={message} />
    </ListItem>
)

export default ChatMessageItem
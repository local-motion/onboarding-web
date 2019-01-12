import React from 'react'
import { ListItem, Chip, Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

const ChatMessageItem = ({children, author, creationTime, text}) => {
    const iconText = (author || '??').substring(0, 2)
    return (
        <ListItem>
            <Chip color={author === 'Bot' ? 'secondary' : 'primary'} avatar={<Avatar>{author === 'Bot' ? <FaceIcon/> :  iconText}</Avatar>} label={text} />
        </ListItem>
    )
}

export default ChatMessageItem
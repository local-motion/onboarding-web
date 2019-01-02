import React from 'react'
import { Button, TextField } from '@material-ui/core';

const ChatMessageEntryBox = ({onSubmitClick, onTextChange, text}) => {
    const onKeyPress = event => event.key === 'Enter' && onSubmitClick();

    return (
        <div>
        <TextField value={text} onChange={onTextChange} onKeyPress={onKeyPress}></TextField>
        <Button variant="raised" color="primary" onClick={() => onSubmitClick()}>
        Send
        </Button>
        </div>
    )
}

export default ChatMessageEntryBox
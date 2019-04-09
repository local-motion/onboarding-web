import React from 'react'
import { Grid, FormControl, InputBase, IconButton } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


const styles = theme => ({
    entryBox: {
        alignItems: 'center',
        border: '1px solid #a1a1a1',
        borderRadius: '3px',
        display: 'flex',
        height: '60px',
        fontSize: '14px',
        lineHeight: '20px',
        margin: '20px 25px',
        padding: '20px',
    },
    textField: {
        marginRight: '5px',
    },
    sendButton: {
        padding: '2px',
    }
})

const ChatMessageEntryBox = ({classes, onSubmitClick, onTextChange, text, disabled}) => {
    const onKeyPress = event => event.key === 'Enter' && onSubmitClick();

    return (
        <div  className={classes.entryBox}>
            <Grid container direction="row">
                <Grid item xs>
                <FormControl fullWidth>
                    <InputBase
                        className={classes.textField} 
                        disabled={disabled} 
                        placeholder="Plaats een bericht" 
                        value={text} 
                        onChange={onTextChange} 
                        onKeyPress={onKeyPress}>
                    </InputBase>
                    </FormControl>
                    </Grid>
                {!!text.length && 
                    <Grid item xs="auto">
                        <IconButton 
                            className={classes.sendButton} 
                            variant="contained" 
                            color="primary" 
                            onClick={() => onSubmitClick()}
                        >
                            <PlayCircleFilledIcon/>
                        </IconButton>
                    </Grid>
                }
            </Grid>
        </div>
    )
}

export default withStyles(styles)(ChatMessageEntryBox)

import React from 'react'
import { Grid, FormControl, InputBase, IconButton } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


const styles = theme => ({
    entryBox: {
        margin: '2px 10px 10px 10px',
        border: '2px solid #CCC',
        borderRadius: '8px',
        padding: '5px',
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

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
        // flexGrow: '1'
        // flexFlow: "row",
    },
    textField: {
        marginRight: '5px',
        // width: '100%',
    // flexGrow: "1",
    },
    sendButton: {
        padding: '2px',
    }
})

const ChatMessageEntryBox = ({classes, onSubmitClick, onTextChange, text, disabled}) => {
    const onKeyPress = event => event.key === 'Enter' && onSubmitClick();

    return (
        <div  className={classes.entryBox}>
        {/* <Grid container direction="row" spacing={60}> */}
        <Grid container direction="row">
            <Grid item xs>
            <FormControl fullWidth>
                {/* <TextField  */}
                <InputBase
                    className={classes.textField} 
                    disabled={disabled} 
                    placeholder="Plaats een bericht" 
                    value={text} 
                    onChange={onTextChange} 
                    onKeyPress={onKeyPress}>
                {/* </TextField> */}
                </InputBase>
                </FormControl>
                </Grid>
            {/* <Grid item xs={6}> */}
            {!!text.length && 
                <Grid item xs="auto">
                    <IconButton 
                        className={classes.sendButton} 
                        variant="contained" 
                        color="primary" 
                        onClick={() => onSubmitClick()}
                    >
                        {/* Verstuur */}
                        <PlayCircleFilledIcon/>
                    </IconButton>
                </Grid>
            }
        </Grid>
        </div>
    )
}

export default withStyles(styles)(ChatMessageEntryBox)

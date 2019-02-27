import React from 'react'
import { ListItem, Avatar, Typography, ListItemAvatar, Grid } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import { deepPurple } from "@material-ui/core/colors";

const styles = theme => ({
    avatar: {
        margin: 10,
      },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
      },  
    authorText: {
        align: 'left',
        color: 'black',
        fontWeight: 'bold',
        gutterBottom: 'true',
        marginRight: '10px',
        noWrap: 'true',
    },
    dateText: {
        align: 'left',
        color: '#555',
        gutterBottom: 'true',
        marginRight: '10px',
        noWrap: 'true',
    },
})

const ChatMessageItem = ({children, userName, author, creationTime, text, classes}) => {
    const iconText = (author || '??').substring(0, 2)

    var displayDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const displayDate = new Date(creationTime).toLocaleDateString('nl-NL', displayDateOptions)

    return (
        <ListItem>
            {/* <Chip color={author === 'Bot' ? 'secondary' : 'primary'} avatar={<Avatar>{author === 'Bot' ? <FaceIcon/> :  iconText}</Avatar>} label={text} /> */}
            <ListItemAvatar>
                <Avatar className={author === userName ? classes.purpleAvatar : classes.avatar }>
                    {iconText}
                </Avatar>
            </ListItemAvatar>
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction="row">
                    <Grid item><Typography className={classes.authorText}>{author}</Typography></Grid>
                    <Grid item><Typography className={classes.dateText}>{displayDate}</Typography></Grid>
                </Grid>
                </Grid>
                <Grid item>
                    <Typography>{text}</Typography>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default withStyles(styles)(ChatMessageItem)
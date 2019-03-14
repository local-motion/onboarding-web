import React from 'react'
import { ListItem, Avatar, Typography, ListItemAvatar, Grid } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import { deepPurple } from "@material-ui/core/colors";

const styles = theme => ({
    avatar: {
        marginRight: 10,
      },
    purpleAvatar: {
        marginRight: 10,
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
    contentText: {
        align: 'left',
        color: 'black',
        fontSize: '100%'
    },
})

const isSameDate = (date1, date2) => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
const getTimeString = date => date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
const getPrettyMessageDatetime = messageDateString => {
    const displayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const displayOptionsThisWeek = { weekday: 'long'}

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today-1)
    const sixDaysAgo = new Date(today-6)

    const messageDate = new Date(messageDateString)

    if (isSameDate(messageDate, today))
        return getTimeString(messageDate)
    else if (isSameDate(messageDate, yesterday))
        return 'gisteren ' + getTimeString(messageDate)
    else if (messageDate > sixDaysAgo)
        return messageDate.toLocaleDateString('nl-NL', displayOptionsThisWeek) + ' ' + getTimeString(messageDate)
    else
        return messageDate.toLocaleDateString('nl-NL', displayOptions) + ' ' + getTimeString(messageDate)
}

const ChatMessageItem = ({userName, author, creationTime, text, classes}) => {
    const iconText = (author || '??').substring(0, 2)

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar className={author === userName ? classes.purpleAvatar : classes.avatar }>
                    {iconText}
                </Avatar>
            </ListItemAvatar>
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction="row">
                    <Grid item><Typography className={classes.authorText}>{author}</Typography></Grid>
                    <Grid item><Typography className={classes.dateText}>{getPrettyMessageDatetime(creationTime)}</Typography></Grid>
                </Grid>
                </Grid>
                <Grid item>
                    <Typography className={classes.contentText}>{text}</Typography>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default withStyles(styles)(ChatMessageItem)
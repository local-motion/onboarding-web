import React from 'react'
import { ListItem, Avatar, Typography, ListItemAvatar, Grid } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import { deepPurple } from "@material-ui/core/colors";
import { parseISO, formatDistance } from 'date-fns';
import { nl } from 'date-fns/locale';

import EditPencil from "assets/img/edit-pencil.svg";

const styles = theme => ({
    avatar: {
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    purpleAvatar: {
        marginRight: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
        alignSelf: 'flex-start',
    },
    userInfo: {
        marginBottom: '5px',
    },
    authorText: {
        align: 'left',
        gutterBottom: 'true',
        marginRight: '5px',
        noWrap: 'true',
        color: '#085ca6',
        fontSize: '13px',
        fontWeight: 700,
    },
    dateText: {
        align: 'left',
        gutterBottom: 'true',
        marginRight: '10px',
        noWrap: 'true',
        color: '#6f747e',
        fontSize: '13px',
        fontWeight: 500,
        margin: '0 30px',
        position: 'relative',
        '&:before': {
            content: '"●"',
            position: 'absolute',
            left: '-20px',
        },
    },
    contentText: {
        align: 'left',
        color: '#fff',
        fontSize: '13px',
        lineHeight: 1.3,
        position: 'relative',
        padding: '7px 10px',
        background: '#085ca6',
        fontWeight: 600,
        borderRadius: '15px',
        borderTopLeftRadius: '3px',
        width: 'fit-content',
    },
    typingDot: {
        display: 'inline-block',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        marginRight: '3px',
        background: '#6f747e',
        animation: 'wave 1.3s linear infinite',
    },
    typingDotSecond: {
        animationDelay: '-1.1s',
    },
    typingDotThird: {
        animationDelay: '-0.9s',
    },
    typingText: {
        marginLeft: '5px',
        marginRight: '5px',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#626262',
    },
    typingIcon: {
        display: 'inline-block',
        background: `url('${EditPencil}') no-repeat`,
        width: '16px',
        height: '14px',
        verticalAlign: 'middle',
    }
});

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

const getPrettyDate = messageDateString =>
  formatDistance(parseISO(messageDateString), new Date(), { locale: nl });


const ChatMessageItem = ({userName, author, creationTime, text, classes, isTyping}) => {
    const iconText = (author || '??').substring(0, 2)

    const TypingText = () => (
      <React.Fragment>
          <span className={classes.typingIcon} />
          <span className={classes.typingText}>Typing</span>
          <span className={classes.typingDot} />
          <span className={`${classes.typingDot} ${classes.typingDotSecond}`} />
          <span className={`${classes.typingDot} ${classes.typingDotThird}`} />
      </React.Fragment>
    );

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar className={author === userName ? classes.purpleAvatar : classes.avatar}>
                    {iconText}
                </Avatar>
            </ListItemAvatar>
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction="row" className={classes.userInfo}>
                        <Grid item><Typography className={classes.authorText}>{author}</Typography></Grid>
                        <Grid item><Typography
                          className={classes.dateText}>{getPrettyDate(creationTime)}</Typography></Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    {
                        isTyping
                          ? <TypingText />
                          : <Typography className={classes.contentText}>{text}</Typography>
                    }
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default withStyles(styles)(ChatMessageItem)
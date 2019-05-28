import React from 'react'
import { ListItem, Avatar, Typography, ListItemAvatar, Grid } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import { deepPurple } from "@material-ui/core/colors";

import { getPrettyHybridMessageDatetime } from './DateTimeUtils';

const styles = theme => ({
    avatar: {
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    ownerItem: {
        flexDirection: 'row-reverse',
    },
    purpleAvatar: {
        marginLeft: 10,
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
    ownerDateText: {
        marginRight: '30px',
        '&:before': {
            left: 'unset',
            right: '-20px',
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
    ownerContentText: {
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '3px',
    },
});

const getPrettyDate = messageDateString => getPrettyHybridMessageDatetime(messageDateString);

const ChatMessageItem = ({userName, author, creationTime, text, classes}) => {
    const iconText = (author || '??').substring(0, 2);

    const isMessageOwner = author === userName;

    return (
        <ListItem className={isMessageOwner ? classes.ownerItem : ''}>
            <ListItemAvatar>
                <Avatar className={isMessageOwner ? classes.purpleAvatar : classes.avatar}>
                    {iconText}
                </Avatar>
            </ListItemAvatar>
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction={isMessageOwner ? 'row-reverse' : 'row'} className={classes.userInfo}>
                        <Grid item><Typography className={classes.authorText}>{author}</Typography></Grid>
                        <Grid item>
                            <Typography className={`${classes.dateText} ${isMessageOwner ? classes.ownerDateText : ''}`}>
                                {getPrettyDate(creationTime)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction={isMessageOwner ? 'row-reverse' : 'row'}>
                        <Typography className={`${classes.contentText} ${isMessageOwner ? classes.ownerContentText : ''}`}>{text}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default withStyles(styles)(ChatMessageItem)
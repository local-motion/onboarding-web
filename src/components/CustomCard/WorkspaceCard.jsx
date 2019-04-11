import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import IconButton from '@material-ui/core/IconButton';
import { getUser } from '../UserProfile/UserProfileReducer';
import { connect } from 'react-redux'

const styles = theme => ({
    card: {
        maxWidth: '100%',
        marginTop: 0,
        alignSelf: 'baseline',
        // borderRadius: '0px 7px 7px 0px',
        height: '100%',
        flex: 1,
        width: '100%',
        borderRadius: 0,
        boxShadow: 'none',
        padding: 10,
    },
    media: {
        height: '200px',
        margin: '-10px',
    },
    customMedia: {
        height: '200px',
        margin: '-10px',
        [theme.breakpoints.down("sm")]: {
            backgroundPositionY: 'center !important'
        },
    },
    managerPassiveIcon: {
        color: 'red',
    },
    managerActiveIcon: {
        color: 'green',
    },
    cardTitle: {
        fontFamily: "'dk_black_bamboo-webfont'",
        color: 'red',
        marginTop: '18px',
    },
});

const mapStateToProps = state => ({
    user: getUser(state)
})

class WorkspaceCard extends React.Component {
    state = { expanded: false };
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const {classes, title, image, customStyle, content, primaryCta, MoreInformation, expandContent, enableActions, managerOnly, userIsManager, user} = this.props;

        return (
            <Card className={classes.card + " card"}>
                <CardMedia
                  className={customStyle ? classes.customMedia : classes.media}
                  image={image}
                  title={title}
                  style={customStyle || {}}
                />
                <CardContent className={"card-content"}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                        {title}
                    </Typography>
                    <Typography component="p">
                        {content}
                    </Typography>
                </CardContent>
                { enableActions &&
                    <CardActions className={"card-actions"}>
                        {primaryCta ? <Button disabled={!user} size="small" color="primary" href={primaryCta.action} onClick={primaryCta.click}>{primaryCta.text}</Button> : null}
                        {MoreInformation ? <Button size="small" color="primary" onClick={this.handleExpandClick}>{MoreInformation}</Button> : null}
                    </CardActions>
                }
                { managerOnly &&
                    <IconButton disabled={true} >
                        <FaceIcon  className={userIsManager ? classes.managerActiveIcon : classes.managerPassiveIcon}/>
                    </IconButton>
                }
                <CardContent>
                    {expandContent}
                </CardContent>
            </Card>
        );
    }
}

WorkspaceCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(WorkspaceCard))
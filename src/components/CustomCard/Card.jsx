import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getUser } from '../UserProfile/UserProfileReducer';
import { connect } from 'react-redux'

const styles = {
    card: {
        maxWidth: 345,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "baseline",
    },
    media: {
        height: 140,
    },
    cardActions: {
        paddingTop: 16,
        paddingRight: 12,
        paddingBottom: 16,
        paddingLeft: 12
    }
};

const mapStateToProps = state => ({
        user: getUser(state)
})


/*

        DEPRECATED: Use CustomCard/WorkspaceCard instead

*/

class MediaCard extends React.Component {
    render() {
        const {classes, title, image, content, primaryCta, secondaryCta, user} = this.props;
        return (
            <Card className={classes.card + " card"}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={title}
                    />
                    <CardContent className={"card-content"}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography component="p">
                            {content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions + " card-actions"}>
                    {primaryCta ? <Button disabled={!user} size="small" color="primary" href={primaryCta.action} onClick={primaryCta.click}>{primaryCta.text}</Button> : null}
                    {secondaryCta ? <Button size="small" color="primary">{secondaryCta}</Button> : null}
                </CardActions>
            </Card>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(MediaCard));
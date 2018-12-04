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
        paddingRight: 8,
        paddingBottom: 16,
        paddingLeft: 8
    }
};

class MediaCard extends React.Component {

    render() {
        const {classes, title, image, content, primaryCta, secondaryCta} = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography component="p">
                            {content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    {primaryCta ? <Button size="small" color="primary">{primaryCta}</Button> : null}
                    {secondaryCta ? <Button size="small" color="primary">{secondaryCta}</Button> : null}
                </CardActions>
            </Card>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
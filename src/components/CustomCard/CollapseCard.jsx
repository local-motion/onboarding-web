import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    card: {
        maxWidth: 345,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "baseline"
    },
    media: {
        height: 140,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    }
});

class CollapseMediaCard extends React.Component {
    state = { expanded: false };
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const {classes, title, image, content, primaryCta, MoreInformation, ExpandContent} = this.props;
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
                <CardActions className={"card-actions"}>
                    {primaryCta ? <Button size="small" color="primary">{primaryCta}</Button> : null}
                    {MoreInformation ? <Button size="small" color="primary" onClick={this.handleExpandClick}>{MoreInformation}</Button> : null}
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more">
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {ExpandContent}
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

CollapseMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CollapseMediaCard);
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const styles = themes => ({
    link: {
        display: "block",
        marginBottom: "10px",
        cursor: "pointer",
        "&:first-child": {
            marginTop: "10px"
        },
        "&:last-child": {
            marginBottom: 0,
            paddingBottom: 0
        }
    },
    name: {
        color: '#626262',
        textAlign: "center",
        margin: "10px",
        fontSize: "13px",
        fontFamily: '"montserrat-light-webfont"',
        fontWeight: 600,
    },
    cardContent: {
        border: '1px solid transparent',
        display: "flex",
        padding: 0,
        "&:last-child": {
            marginBottom: 0,
            paddingBottom: 0
        }
    },
    cardActive: {
        background: '#085ca6',
        '& $name': {
            color: '#fff',
        },
    },
});

const StepLink = ({ name, description, image, link, classes, match, disabled }) => (
    <Link to={link} className={classes.link} disabled={disabled}>
        <Card className={`${classes.card} ${match.url.includes(link) ? classes.cardActive : null}`}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom className={classes.name}>
                    {name}
                </Typography>
            </CardContent>
        </Card>
    </Link>
);

const StepButton = ({ name, description, image, onClick, classes }) => (
    <div onClick={onClick} className={classes.link}>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom className={classes.name}>
                    {name}
                </Typography>
            </CardContent>
        </Card>
    </div>
);

export const StyledStepLink = withRouter(withStyles(styles)(StepLink));
export const StyledStepButton = withStyles(styles)(StepButton);
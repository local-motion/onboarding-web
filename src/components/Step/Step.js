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
        fontFamily: '"Montserrat"',
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
        '& $number': {
            color: '#fff',
            borderRight: '1px solid rgba(166,207,250,0.2)',
        },
    },
    number: {
        color: '#2783be',
        borderRight: '1px solid #e7e7e7',
        fontFamily: '"Montserrat"',
        fontSize: '18px',
        fontWeight: 700,
        marginBottom: 0,
        width: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const StepLink = ({ name, description, image, link, classes, index, match, disabled }) => (
    <Link to={link} className={classes.link} disabled={disabled}>
        <Card className={`${classes.card} ${match.url.includes(link) ? classes.cardActive : null}`}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom className={classes.number}>
                    {index}
                </Typography>
                <Typography gutterBottom className={classes.name}>
                    {name}
                </Typography>
            </CardContent>
        </Card>
    </Link>
);

const StepButton = ({ name, description, image, onClick, classes, index }) => (
    <div onClick={onClick} className={classes.link}>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom className={classes.number}>
                    {index}
                </Typography>
                <Typography gutterBottom className={classes.name}>
                    {name}
                </Typography>
            </CardContent>
        </Card>
    </div>
);

export const StyledStepLink = withRouter(withStyles(styles)(StepLink));
export const StyledStepButton = withStyles(styles)(StepButton);
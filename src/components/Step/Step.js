import React from "react";
import { Link, withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Check from "@material-ui/icons/Check";
import { withStyles } from "@material-ui/core";

const styles = themes => ({
    link: {
        cursor: "pointer",
        display: "block",
        marginBottom: "15px",
        position: 'relative',
        "&:first-child": {
            marginTop: "15px"
        },
        "&:last-child": {
            marginBottom: 0,
            paddingBottom: 0
        },
    },
    card: {
        background: '#f5f5f5',
        border: 'none',
        boxShadow: 'none',
        transition: 'all .2s',
        paddingRight: 30,
        '&:hover $name': {
            color: '#f5f5f5',
        },
        '&:hover': {
           background: '#085ca6',
        },
    },
    done: {
        borderRadius: '50%',
        background: '#085ca6',
        width: 20,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: 'translateY(-50%)',
    },
    doneIcon: {
        fill: "#FFFFFF",
        width: 15,
    },
    name: {
        color: '#626262',
        margin: "15px",
        fontSize: "13px",
        fontFamily: '"montserrat-light-webfont"',
        fontWeight: 600,
        transition: 'all .2s',
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

const StepLink = ({ name, description, image, link, classes, location: { pathname }, startPathUrl, onClick, isDone }) => {
    return (
      <Link to={(startPathUrl || '') + link} className={classes.link} onClick={onClick}>
          <Card className={`${classes.card} ${pathname.includes(link) ? classes.cardActive : ''}`}>
              <CardContent className={classes.cardContent}>
                  <Typography gutterBottom className={classes.name}>
                      {name}
                  </Typography>
                  {isDone && (
                    <div className={classes.done}><Check className={classes.doneIcon} /></div>
                  )}
              </CardContent>
          </Card>
      </Link>
    );
};

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
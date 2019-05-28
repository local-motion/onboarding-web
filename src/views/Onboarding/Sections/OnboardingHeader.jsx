import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

import HeaderLinks from "../../../components/Header/HeaderLinks";
import { container } from "../../../assets/jss/material-kit-react";

const styles = theme => ({
    landingAppBar: {
        ...container,
        color: '#626262',
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 auto',
        padding: 0,
        borderRadius: 5,
        boxShadow: '0px 12px 19px 1px rgba(40, 40, 40, 0.12)',
        backgroundColor: '#fff !important',
        position: 'relative',

        [theme.breakpoints.down('md')]: {
            width: '100%',
            padding: 0,
        },
    },
    logo: {
        width: 300,
        padding: 25,
        fontSize: 30,
        color: 'rgb(8, 92, 166)',
        fontFamily: 'dk_black_bamboo-webfont',
        letterSpacing: '1px',
        lineHeight: 1.2,

        [theme.breakpoints.down('sm')]: {
            width: 200,
            margin: 20,
            padding: 0,
        },

        [theme.breakpoints.down('xs')]: {
            width: 160,
        },

        '& > span': {
            color: 'rgb(207, 26, 49)',
            letterSpacing: '0px',
            marginLeft: 5,
        },
    },
    menu: {
        padding: '10px 25px',

        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    },
    loginButton: {
        color: '#FFF',
        backgroundColor: '#ec2e52',
        boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        margin: '15px 25px',
        padding: '10px 25px',
        borderRadius: 22,
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 1.2,

        '&:hover': {
            backgroundColor: '#ee6a6f',
        },

        [theme.breakpoints.down('sm')]: {
            margin: 0,
            borderRadius: '0 5px 5px 0',
            padding: 20,
            boxShadow: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    loginText: {
        display: 'block',

        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    addUserIcon: {
        background: `url(${require('../../../assets/img/landing/add-user.png')}) no-repeat center`,
        width: 22,
        height: 22,
        display: 'none',
        backgroundSize: 'contain',

        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
});

const OnboardingHeader = ({ classes, history, location, user }) => {
    const signInClick = () => {
        history.push(`/actie/inloggen?target=${location.pathname}`)
    };

    return (
      <AppBar className={classes.landingAppBar}>
          <Link to={'/'}>
              <div className={classes.logo}>Rookvrij<span>spelen</span></div>
          </Link>

          <HeaderLinks className={classes.menu} />

          {
              !user && (
                <Button
                  onClick={signInClick}
                  className={classes.loginButton}
                >
                    <span className={classes.loginText}>Inloggen</span>
                    <div className={classes.addUserIcon} />
                </Button>
              )
          }
      </AppBar>
    );
};

export default withStyles(styles)(withRouter(OnboardingHeader));
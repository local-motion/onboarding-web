import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

import HeaderLinks from "../../../components/Header/HeaderLinks";

const styles = theme => ({
    landingAppBar: {
        color: '#626262',
        maxWidth: 1300,
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
    },
    logo: {
        width: 300,
        padding: 25,
    },
    menu: {
        padding: '10px 25px',
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
    },
});

const OnboardingHeader = ({ classes, history, location, user }) => {
    const signInClick = () => {
        history.push(`/login?target=${location.pathname}`)
    };

    return (
      <AppBar className={classes.landingAppBar}>
          <Link to={'/'}>
              <img
                src={require("../../../assets/img/landing/logo.png")}
                alt={"Rookvrije generatie logo"}
                className={classes.logo}
              />
          </Link>

          <HeaderLinks className={classes.menu} />

          {
              !user && (
                <Button
                  onClick={signInClick}
                  className={classes.loginButton}
                >
                    <span>Inloggen</span>
                </Button>
              )
          }
      </AppBar>
    );
};

export default withStyles(styles)(withRouter(OnboardingHeader));
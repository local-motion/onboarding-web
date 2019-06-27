import React, { useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
import HeaderLinks from "../../components/Header/HeaderLinks";
import { container } from "../../assets/jss/material-kit-react";
import { getUser } from "../../components/UserProfile/UserProfileReducer";
import Drawer from "@material-ui/core/Drawer/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import { signOutUser } from "../UserProfile/UserProfileActions";

const styles = theme => ({
    landingAppBar: {
        ...container,
        color: '#626262',
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 auto',
        padding: '0 !important',
        backgroundColor: '#fff !important',
        position: 'relative',
        boxShadow: 'none',

        [theme.breakpoints.down('xs')]: {
            maxWidth: '95%',
            width: '100%',
        },
    },
    shortAppBar: {
        borderRadius: 5,
        boxShadow: '0px 12px 19px 1px rgba(40, 40, 40, 0.12)',
    },
    fullWidth: {
        width: '100%',
        background: '#FFF',
        position: 'relative',
        boxShadow: '0px 12px 19px 1px rgba(40, 40, 40, 0.12)',
    },
    logo: {
        color: 'rgb(8, 92, 166)',
        fontSize: 30,
        fontFamily: 'dk_black_bamboo-webfont',
        letterSpacing: '1px',
        lineHeight: 1.2,
        margin: '20px 30px',
        padding: 0,

        [theme.breakpoints.down('sm')]: {
            margin: 15,
            fontSize: 25,
        },

        [theme.breakpoints.down('xs')]: {
            fontSize: 20,
            margin: 10,
        },

        '& > span': {
            color: 'rgb(207, 26, 49)',
            letterSpacing: '0px',
            marginLeft: 5,
        },
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actiesButton: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        },
    },
    menu: {
        padding: '10px 25px',

        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px',
        },
    },
    hamburgerMenuButton: {},
    drawerPaper: {
        width: "80%",
        maxWidth: 250,
        paddingTop: 30,
    },
    drawerLinks: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    drawerPhaseName: {
        fontSize: 18,
        flexGrow: 1,
        width: '100%',
        textAlign: 'center',
        margin: '15px 0',
    },
    drawerLink: {
        flexGrow: 1,
        width: '100%',
        textAlign: 'center',
    },
    activeDrawerLink: {
        background: '#258ecc',
        color: '#FFF',
        borderRadius: 0,
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
        background: `url(${require('../../assets/img/landing/add-user.png')}) no-repeat center`,
        width: 22,
        height: 22,
        display: 'none',
        backgroundSize: 'contain',

        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
});

const ActieItems = ({ phases, startPathUrl, playground, user, classes }) => {
    return Object.keys(phases).map((phaseName) => {
        const phase = phases[phaseName];

        return (
          <div key={phaseName} className={classes.drawerLink}>
              <div className={classes.drawerPhaseName}>{phase.title}</div>

              {
                  phase.steps.map(step => {
                        if (step.visible && !step.visible({ playground, user })) return null;

                        return (
                          <Button
                            component={NavLink}
                            activeClassName={classes.activeDrawerLink}
                            className={classes.drawerLink}
                            to={(startPathUrl || '') + step.link}
                            key={step.link}
                          >{step.name}</Button>
                        );
                    }
                  )
              }
          </div>
        )
    });
};

const Header = (props) => {
    const {
        classes,
        history,
        location,
        user,
        fullWidth,
        signOutUser,
        actieItems,
        playground,
        phases,
        startPathUrl,
    } = props;

    const [isDrawerOpen, toggleDrawer] = useState(false);

    const signInClick = () => history.push(`/actie/inloggen?target=${location.pathname}`);
    const gotoMyProfile = () => history.push('/mijn-profiel');
    const gotoMyActies = () => history.push('/mijn-acties');
    const openDrawer = () => toggleDrawer(true);
    const closeDrawer = () => toggleDrawer(false);
    const isOpen = !!isDrawerOpen;

    return (
      <div className={fullWidth ? classes.fullWidth : ''}>
          <AppBar className={`${classes.landingAppBar} ${fullWidth ? '' : classes.shortAppBar}`}>
              <div className={classes.left}>
                  <Link to={'/'}>
                      <div className={classes.logo}>Rookvrij<span>spelen</span></div>
                  </Link>

                  {user && <Hidden xsDown><Button className={classes.actiesButton} onClick={gotoMyActies}>Mijn acties</Button></Hidden>}
              </div>

                  {
                      user
                        ? (
                          <React.Fragment>
                              <Hidden smDown><HeaderLinks /></Hidden>

                              <Hidden mdUp>
                                  <IconButton
                                    color="inherit"
                                    aria-label="toggle drawer"
                                    onClick={openDrawer}
                                    className={classes.hamburgerMenuButton}
                                  >
                                      <Menu/>
                                  </IconButton>

                                  <Drawer
                                    classes={{ paper: classes.drawerPaper }}
                                    anchor="right"
                                    open={isOpen}
                                    onClose={closeDrawer}
                                  >
                                      <div
                                        tabIndex={0}
                                        role="button"
                                        onKeyDown={closeDrawer}
                                        onClick={closeDrawer}
                                        className={classes.drawerLinks}
                                      >
                                          <Button className={classes.drawerLink} onClick={gotoMyProfile}>Mijn profiel</Button>
                                          <Button className={classes.drawerLink} onClick={gotoMyActies}>Mijn acties</Button>
                                          <Button className={classes.drawerLink} onClick={signOutUser}>Uitloggen</Button>

                                          {actieItems && (
                                            <ActieItems
                                              playground={playground}
                                              phases={phases}
                                              startPathUrl={startPathUrl}
                                              user={user}
                                              classes={classes}
                                            />
                                          )}
                                      </div>
                                  </Drawer>
                              </Hidden>
                          </React.Fragment>
                        ) : (
                          <Button onClick={signInClick} className={classes.loginButton}>
                              <span className={classes.loginText}>Inloggen</span>
                              <div className={classes.addUserIcon} />
                          </Button>
                        )
                  }
          </AppBar>
      </div>
    );
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    signOutUser: () => dispatch(signOutUser()),
});

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Header)));

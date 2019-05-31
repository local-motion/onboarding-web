import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";

import { container } from "../../assets/jss/material-kit-react";
import MyProfile from "./MyProfile";
import MyActies from "./MyActies";
import WrappedHeader from "../../components/Header/WrappedHeader";
import Footer from "../../components/Footer/Footer";
import connect from "react-redux/es/connect/connect";
import { getUser } from "../../components/UserProfile/UserProfileReducer";
import { getAllPlaygrounds } from "../../components/Playground/PlaygroundReducer";


const styles = theme => ({
    wrapper: {
        background: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        height: '100%',
    },
    main: {
        ...container,
        flex: 1,
        margin: '-100px 0',
        padding: '0 !important',
        zIndex: 99,
    },
    links: {
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '0 10px',
        },
    },
    link: {
        color: '#085ca6',
        border: '1px solid rgb(177, 222, 254)',
        backgroundColor: '#FFF',
        boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        borderRadius: 25,
        fontSize: 14,
        padding: '10px 45px',
        margin: 10,
        width: 190,

        '&:hover': {
            backgroundColor: 'rgb(238, 106, 111)',
            boxShadow: '0px 12px 19px 1px rgba(40, 40, 40, 0.12)',
            border: '1px solid rgb(238, 106, 111)',
            color: '#FFF',
        },

        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
            width: 150,
            padding: '7px 25px',
            margin: 5,
        },
    },
    activeLink: {
        background: '#ec2e52',
        border: '1px solid #ec2e52',
        color: '#FFF',
    },
});

const links = [
    { name: 'Mijn Profiel', link: '/mijn-profiel' },
    { name: 'Mijn Acties', link: '/mijn-acties' },
];

class UserProfile extends React.Component {
    getNavButton = ({ link, name }) => {
        const { classes } = this.props;

        return (
          <Button
            className={classes.link}
            color="primary"
            activeClassName={classes.activeLink}
            to={link}
            component={NavLink}
            key={link}
          >{name}</Button>
        );
    };

    render() {
        const { classes, user, playgrounds } = this.props;

        if (!user) return <div>Loading...</div>;

        return (
          <div className={classes.wrapper}>
              <WrappedHeader />

              <div className={classes.main}>
                  <div className={classes.links}>
                      {links.map(this.getNavButton)}
                  </div>

                  <Switch>
                      <Route exact path="/mijn-profiel" key="My Profile" render={() => <MyProfile user={user}/>}/>
                      <Route exact path="/mijn-acties" key="My Acties" render={() => <MyActies user={user} playgrounds={playgrounds}/>}/>
                  </Switch>
              </div>

              <Footer />
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
    playgrounds: getAllPlaygrounds(state),
    user: getUser(state),
});

export default withStyles(styles)(connect(mapStateToProps)(UserProfile));

import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";

import { container } from "../../assets/jss/material-kit-react";
import MyProfile from "./MyProfile";
import MyActies from "./MyActies";
import WrappedHeader from "../../components/Header/WrappedHeader";
import Footer from "../../components/Footer/Footer";


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
    links: {},
    link: {
        color: '#085ca6',
        border: '1px solid rgb(177, 222, 254)',
        backgroundColor: '#FFF',
        boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        borderRadius: 25,
        fontSize: 14,
        padding: '10px 45px',

        '&:hover': {
            backgroundColor: 'rgb(238, 106, 111)',
            boxShadow: '0px 12px 19px 1px rgba(40, 40, 40, 0.12)',
            border: '1px solid rgb(238, 106, 111)',
            color: '#FFF',
        },

        '&:first-child': {
            marginRight: 20,
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
        const { classes } = this.props;

        return (
          <div className={classes.wrapper}>
              <WrappedHeader />

              <div className={classes.main}>
                  <div className={classes.links}>
                      {links.map(this.getNavButton)}
                  </div>

                  <Switch>
                      <Route exact path="/mijn-profiel" key="My Profile" component={MyProfile}/>
                      <Route exact path="/mijn-acties" key="My Acties" component={MyActies}/>
                  </Switch>
              </div>

              <Footer />
          </div>
        );
    }
}

export default withStyles(styles)(UserProfile);

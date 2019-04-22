import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import OnboardingHeader from "./OnboardingHeader";
import { getUser } from "../../../components/UserProfile/UserProfileReducer";
import { container } from "../../../assets/jss/material-kit-react.jsx";
import CtaButton from "./CtaButton";

const styles = theme => ({
    container: {
        ...container
    },
    startscreen: {
        background: `url(${require('../../../assets/img/landing/firstscreen-bg.jpg')}) no-repeat bottom`,
        backgroundSize: 'cover',
        width: '100%',
        maxHeight: 770,
        height: '100%',
        padding: 20,
    },
    cta: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        margin: '100px auto 240px',
        paddingLeft: 25,
    },
    ctaTitle: {
        fontSize: 74,
        fontFamily: "'dk_black_bamboo-webfont'",
        color: '#FFF',
        lineHeight: 1.2,
        textShadow: '0px 5px 10px rgba(40, 40, 40, 0.1)',
    },
});

const mapStateToProps = state => ({
    user: getUser(state),
});


class Startscreen extends Component {
    onClick() {
        console.log('do some action');
    }

    render() {
        const { classes, user } = this.props;
        return (
          <section className={classes.startscreen}>
              <OnboardingHeader user={user} />

              <div className={`${classes.cta} ${classes.container}`}>
                  <span className={classes.ctaTitle}>Maak een speeltuin bij jou<br />in de buurt rookvruij</span>

                  <CtaButton onClick={this.onClick} text={"Start enn actie"} />
              </div>
          </section>
        );
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Startscreen));
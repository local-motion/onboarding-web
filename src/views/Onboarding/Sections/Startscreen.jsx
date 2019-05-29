import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { container } from "../../../assets/jss/material-kit-react.jsx";
import CtaButton from "../components/CtaButton";
import Header from "../../../components/Header/Header";

const styles = theme => ({
    container: {
        ...container
    },
    startscreen: {
        background: `url(${require('../../../assets/img/landing/firstscreen-bg.jpg')}) no-repeat bottom center`,
        backgroundSize: 'cover',
        width: '100%',
        maxHeight: 770,
        height: '100%',
        padding: 20,

        [theme.breakpoints.down('xs')]: {
            backgroundImage: `url(${require('../../../assets/img/landing/firstscreen-bg-mobile.jpg')})`,
            minHeight: 520,
        },
    },
    cta: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        margin: '100px auto 240px',
        paddingLeft: 25,

        [theme.breakpoints.down('md')]: {
            width: '100%',
            margin: '100px auto 220px',
            padding: '0 30px',
            textAlign: 'center',
        },

        [theme.breakpoints.down('xs')]: {
            margin: '60px auto',
            padding: 0,
            textAlign: 'left',
        },
    },
    ctaTitle: {
        fontSize: 74,
        fontFamily: "'dk_black_bamboo-webfont'",
        color: '#FFF',
        lineHeight: 1.2,
        textShadow: '0px 5px 10px rgba(40, 40, 40, 0.1)',
        maxWidth: 880,

        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        },

        [theme.breakpoints.down('sm')]: {
            fontSize: 50,
        },

        [theme.breakpoints.down('xs')]: {
            fontSize: 37,
            marginLeft: 5,
        },
    },
    ctaButtonWrapper: {
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    ctaButton: {
        [theme.breakpoints.down('xs')]: {
            margin: '45px auto 0',
            width: '100%',
            maxWidth: '100%',
        },
    },
});


class Startscreen extends Component {
    render() {
        const { classes, onCtaClick } = this.props;
        return (
          <section className={classes.startscreen}>
              <Header />

              <div className={`${classes.cta} ${classes.container}`}>
                  <span className={classes.ctaTitle}>Maak een speeltuin bij jou in de buurt rookvrij</span>

                  <div className={classes.ctaButtonWrapper}>
                      <CtaButton customStyle={classes.ctaButton} onClick={onCtaClick} text={"Start een actie"} />
                  </div>
              </div>
          </section>
        );
    }
}

export default withStyles(styles)(Startscreen);
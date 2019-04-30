import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { container } from "../../../assets/jss/material-kit-react";
import StatisticsBanner from "./StatisticsBanner";
import CtaButton from "../components/CtaButton";

const styles = theme => ({
    container: {
        ...container
    },
    statisticsWrapper: {
        display: 'flex',
        paddingBottom: 50,
        width: '80%',

        [theme.breakpoints.down('md')]: {
            width: '100%',
            flexWrap: 'wrap',
        },
    },
    statisticInfo: {
        zIndex: 4,
        marginLeft: 45,
        marginTop: 65,
        flex: 1,

        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
            marginLeft: 0,
            marginTop: 35,
        },
    },
    title: {
        color: 'rgb(207, 26, 49)',
        fontSize: 58,
        fontFamily: "'dk_black_bamboo-webfont'",
        lineHeight: 1.2,

        [theme.breakpoints.down('sm')]: {
            fontSize: 40,
        },
    },
    text: {
        fontSize: 16,
        color: 'rgb(98, 98, 98)',
        lineHeight: 1.5,
        marginTop: 40,

        [theme.breakpoints.down('sm')]: {
            marginTop: 25,
        },
    },
    ctaButtonWrapper: {
        [theme.breakpoints.down('xs')]: {
            padding: '0 30px',
        },
    },
    ctaButton: {
        [theme.breakpoints.down('xs')]: {
            margin: '45px auto 0',
            width: '100%',
            maxWidth: '100%',
            fontSize: 16,
        },
    },
});

class Statistics extends Component {
    render() {
        const { classes, onCtaClick } = this.props;

        return (
          <section className={`${classes.statisticsWrapper} ${classes.container}`}>
              <StatisticsBanner />

              <div className={classes.statisticInfo}>
                  <div className={classes.title}>Kinderen rookvrij laten opgroeien</div>
                  <div className={classes.text}>Iedereen wil dat kinderen spelen in een gezonde en veilige omgeving. Jonge longen zijn kwetsbaar. Zien roken, doet roken. Als kinderen anderen zien roken, lijkt dat normaal en misschien zelfs aantrekkelijk. Met een rookvrije speeltuin geef je het goede voorbeeld aan kinderen en voorkom je bovendien het schadelijke meeroken. Voorbeelden van speeltuinen zijn bijvoorbeeld een speeltuin, een kinderboerderij of een buitenzwembad. Rookvrijspelen.nl biedt een stappenplan en helpt je bij het rookvrij maken van jouw speeltuin.</div>
                  <div className={classes.ctaButtonWrapper}>
                      <CtaButton
                        customStyle={classes.ctaButton}
                        text={"Start een actie"}
                        onClick={onCtaClick}
                        type={"outlined"}
                      />
                  </div>
              </div>
          </section>
        );
    }
}

export default withStyles(styles)(Statistics);
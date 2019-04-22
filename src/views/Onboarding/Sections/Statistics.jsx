import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { container } from "../../../assets/jss/material-kit-react";
import StatisticsBanner from "./StatisticsBanner";
import CtaButton from "./CtaButton";

const styles = theme => ({
    container: {
        ...container
    },
    statisticsWrapper: {
        display: 'flex',
        paddingBottom: 50,
        width: '80%',
    },
    statisticInfo: {
        zIndex: 4,
        marginLeft: 45,
        marginTop: 65,
    },
    title: {
        color: 'rgb(207, 26, 49)',
        fontSize: 58,
        fontFamily: "'dk_black_bamboo-webfont'",
        lineHeight: 1.2,
    },
    text: {
        fontSize: 16,
        color: 'rgb(98, 98, 98)',
        lineHeight: 1.5,
        marginTop: 40,
    },
});

class Statistics extends Component {
    onClick() {
        console.log('do action');
    }

    render() {
        const { classes } = this.props;

        return (
          <section className={`${classes.statisticsWrapper} ${classes.container}`}>
              <StatisticsBanner />

              <div className={classes.statisticInfo}>
                  <div className={classes.title}>Kinderen rookvrij laten opgroeien</div>
                  <div className={classes.text}>Rookvrijspelen is een initiatief van Longfonds en ABN AMRO. Wij streven ernaar dat elk kind dat vanaf 2017 wordt geboren Rookvrij kan opgroeien. Dat kan in een omgeving, zonder verleidingen en met goede voorbeelden om je heen. Hoe minder mensen je ziet roken, hoe minder vanzelfsprekend het wordt om zelf te gaan roken. Iedereen kan helpen met het Rookvrij maken van onze omgeving.</div>
                  <CtaButton
                    text={"Start enn actie"}
                    onClick={this.onClick}
                    type={"outlined"}
                  />
              </div>
          </section>
        );
    }
}

export default withStyles(styles)(Statistics);
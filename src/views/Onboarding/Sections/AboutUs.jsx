import React from "react";
import { withStyles } from "@material-ui/core";
import { container } from "../../../assets/jss/material-kit-react";

const styles = theme => ({
    container: {
        ...container,
        width: '80%',
    },
    aboutUs: {
        marginTop: 80,
        zIndex: 9,
        position: 'relative',
        paddingBottom: 140,
        background: `url(${require("../../../assets/img/landing/about-bg.png")}) repeat-x bottom`,
    },
    title: {
        fontSize: 58,
        color: 'rgb(207, 26, 49)',
        lineHeight: 1.2,
        textAlign: 'center',
        fontFamily: "'dk_black_bamboo-webfont'",
        marginBottom: 35,
    },
    text: {
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: 400,
        color: 'rgb(98, 98, 98)',
        textAlign: 'center',
        '&:last-child': {
            marginBottom: 45,
        },
    },
    link: {
        margin: '0 50px 10px',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    image: {
        width: 'auto',
        height: 80,
    },
    logos: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
});


const AboutUs = ({ classes }) => {
    return (
      <div className={classes.aboutUs}>
          <div className={classes.title}>Over rookvrijspelen.nl</div>

          <div className={classes.container}>
              <p className={classes.text}>
                  {'Rookvrijspelen is een initiatief van Longfonds en ABN AMRO. Wij streven ernaar dat elk kind dat vanaf 2017 wordt geboren Rookvrij kan opgroeien. Dat kan in een omgeving, zonder verleidingen en met goede voorbeelden om je heen. Hoe minder mensen je ziet roken, hoe minder vanzelfsprekend het wordt om zelf te gaan roken. Iedereen kan helpen met het Rookvrij maken van onze omgeving.'}
              </p>
              <p className={classes.text}>
                  {'Rookvrijspelen biedt een persoonlijke plek om een actiepagina op te zetten rondom een speeltuin. Op de actiepagina kan een ieder stappen doorlopen om de speeltuin versneld rookvrij te maken en te helpen houden. De personen rondom een actiepagina kunnen samen een team vormen en met elkaar chatten.'}
              </p>
          </div>

          <div className={classes.logos}>
              <a
                href="https://www.kwf.nl/"
                className={classes.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                  <img
                    className={classes.image}
                    src={require("assets/img/logo-kwf.png")}
                    alt="Logo KWF Kankerfonds"
                  />
              </a>
              <a
                href="https://www.longfonds.nl/"
                className={classes.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                  <img
                    className={classes.image}
                    src={require("assets/img/logo-longfonds.png")}
                    alt="Logo Longfonds"
                  />
              </a>
              <a
                href="https://www.hartstichting.nl/"
                className={classes.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                  <img
                    className={classes.image}
                    src={require("assets/img/logo-hartstichting-horizontal.png")}
                    alt="Logo Hartstichting"
                  />
              </a>
          </div>
      </div>
    );
};

export default withStyles(styles)(AboutUs);
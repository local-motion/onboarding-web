import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { playgroundIcons } from "../../../components/PlaygroundIcons/playgroundIconsConstants";
import SmokefreePhase from "./SmokefreePhase";
import CtaButton from "../components/CtaButton";
import { container } from "../../../assets/jss/material-kit-react";

const styles = theme => ({
    container: {
        ...container,
        width: '80%',

        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: '0 20px',
        },
    },
    phases: {
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',

        [theme.breakpoints.down('sm')]: {
            marginTop: 10,
        },
    },
    title: {
        fontSize: 58,
        color: '#085ca6',
        lineHeight: 1.2,
        textAlign: 'center',
        fontFamily: "'dk_black_bamboo-webfont'",
        marginBottom: 35,

        [theme.breakpoints.down('sm')]: {
            fontSize: 40,
            marginBottom: 25,
        },
    },
    text: {
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: 400,
        color: 'rgb(98, 98, 98)',
        textAlign: 'center',
        marginBottom: 35,
    },
    icons: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,

        [theme.breakpoints.down('sm')]: {
            justifyContent: 'flex-start',
        },
    },
    button: {
        margin: '0 auto',

        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
            fontSize: 16,
        },
    },
});


const SmokefreePhases = ({ classes, onCtaClick }) => {
    return (
      <div className={`${classes.phases} ${classes.container}`}>
          <div className={classes.title}>Hoe maak je een speeltuin rookvrij?</div>
          <div className={classes.text}>Je wilt je inzetten voor een rookvrije speeltuin, dat is een geweldige eerste stap! Hoe meer mensen jouw speeltuin rookvrij willen hebben, hoe groter de kans dat het bestuur van deze speeltuin hiermee aan de slag gaat. In 3 fases kun je ervoor zorgen dat jouw speeltuin rookvrij wordt. Maak een actiepagina aan en ga direct aan de slag.</div>

          <div className={classes.icons}>
              {playgroundIcons.map(icon => <SmokefreePhase key={icon.title} icon={icon} />)}
          </div>

          <CtaButton
            text={"Start een actie"}
            onClick={onCtaClick}
            type={"outlined"}
            customStyle={classes.button}
          />
      </div>
    );
};

export default withStyles(styles)(SmokefreePhases);
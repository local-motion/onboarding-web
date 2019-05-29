import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CtaButton from "../../components/CtaButton";

const styles = theme => ({
    wrapper: {
        background: '#FFF',
        borderRadius: 10,
        bottom: 30,
        boxShadow: '0px 10px 23.75px 1.25px rgba(40, 40, 40, 0.15)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        left: 30,
        padding: 20,
        position: 'absolute',
        width: 330,

        [theme.breakpoints.down('xs')]: {
            left: 20,
            bottom: 20,
            width: 'calc(100% - 40px)',
            padding: 0,
        },
    },
    text: {
        color: 'rgb(8, 92, 166)',
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 1.5,
        textAlign: 'center',
        padding: '0 10px',

        [theme.breakpoints.down('xs')]: {
            marginTop: 20,
            fontSize: 16,
            lineHeight: 1,
        },
    },
    button: {
        marginTop: 20,

        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
            borderRadius: '0 0 10px 10px',
            fontSize: 16,
        },
    },
});


const PlaygroundCta = ({ onCtaClick, classes }) => {
    return (
      <div className={classes.wrapper}>
          <div className={classes.text}>Geen actie in jouw buurt? Start je eigen actie.</div>
          <CtaButton customStyle={classes.button} onClick={onCtaClick} type="square" text={"Start een actie"} />
      </div>
    );
};

export default withStyles(styles)(PlaygroundCta);
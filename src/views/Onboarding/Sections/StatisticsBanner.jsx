import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    bannerWrapper: {
        position: 'relative',
        width: 520,

        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    bannerDots: {
        background: `url(${require('../../../assets/img/landing/nederland-map-dots-bg.png')}) no-repeat left`,
        backgroundSize: 'cover',
        height: 700,
        left: -295,
        position: 'absolute',
        top: 40,
        width: 860,
        zIndex: 3,

        [theme.breakpoints.down('md')]: {
            display: 'none',
            maxWidth: 860,
            width: '100%',
        },
    },
    banner: {
        alignItems: 'center',
        background: `url(${require('../../../assets/img/landing/stats-map-bg.jpg')}) no-repeat center`,
        backgroundSize: 'cover',
        borderRadius: 10,
        boxShadow: '0px 15px 28.5px 1.5px rgba(5, 74, 126, 0.22)',
        color: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: 640,
        marginTop: -110,
        position: 'relative',
        textAlign: 'center',
        maxWidth: 520,
        width: '100%',
        zIndex: 5,

        [theme.breakpoints.down('md')]: {
            margin: '-170px auto 0',
        },

        [theme.breakpoints.down('sm')]: {
            paddingBottom: 45,
            height: 'auto',
        },

        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
        },
    },
    freePlaygroundNumber: {
        alignItems: 'center',
        display: 'flex',
        fontSize: 80,
        fontWeight: 'bold',
        justifyContent: 'center',
        lineHeight: 1.2,
        marginTop: 45,
        textShadow: '0px 5px 10px rgba(40, 40, 40, 0.1)',

        [theme.breakpoints.down('sm')]: {
            fontSize: 55,
        },
    },
    playgroundPin: {
        background: `url(${require('../../../assets/img/landing/pin.png')}) no-repeat center`,
        backgroundSize: 'contain',
        height: 97,
        width: 109,

        [theme.breakpoints.down('sm')]: {
            height: 75,
            width: 77,
        },
    },
    freePlaygroundText: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 1.2,
        marginTop: 30,

        [theme.breakpoints.down('sm')]: {
            marginTop: 20,
        },
    },
    freePlaygroundTitle: {
        fontFamily: "'dk_black_bamboo-webfont'",
        fontSize: 39,
        fontWeight: 'bold',
        lineHeight: 1.2,
        marginTop: 20,

        [theme.breakpoints.down('sm')]: {
            fontSize: 35,
            marginTop: 15,
        },
    },
    peopleIcon: {
        background: `url(${require('../../../assets/img/landing/happy-kids.png')}) no-repeat center`,
        backgroundSize: 'contain',
        height: 79,
        marginTop: 35,
        width: 112,

        [theme.breakpoints.down('sm')]: {
            marginTop: 25,
        },
    },
    peopleNumber: {
        fontSize: 70,
        fontWeight: 'bold',
        lineHeight: 1.2,
        marginTop: 25,
        textShadow: '0px 5px 10px rgba(40, 40, 40, 0.1)',

        [theme.breakpoints.down('sm')]: {
            fontSize: 48,
        },
    },
    peopleText: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 1.5,
        marginTop: 15,
        maxWidth: '80%',

        [theme.breakpoints.down('sm')]: {
            marginTop: 10,
            maxWidth: '60%',
        },
    },
});


const StatisticsBanner = ({ classes }) => {
    return (
      <div className={classes.bannerWrapper}>
          <div className={classes.bannerDots} />
          <div className={classes.banner}>
              <div className={classes.freePlaygroundNumber}>14 <div className={classes.playgroundPin} /></div>
              <div className={classes.freePlaygroundText}>Succesvolle acties voor rookvrije</div>
              <div className={classes.freePlaygroundTitle}>SPEELTUINEN IN NEDERLAND</div>

              <div className={classes.peopleIcon} />
              <div className={classes.peopleNumber}>62,820</div>
              <div className={classes.peopleText}>Keer aangemeld voor een actie in heel Nederland.<br />We zijn hard op weg naar een Rookvrije Generatie!</div>
          </div>
      </div>
    );
};

export default withStyles(styles)(StatisticsBanner);
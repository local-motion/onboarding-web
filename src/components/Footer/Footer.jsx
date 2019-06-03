import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import { container } from "../../assets/jss/material-kit-react";

const styles = theme => ({
    footer: {
        marginTop: 30,
        padding: '60px 0 30px',
        background: `url(${require('../../assets/img/landing/footer-base.jpg')}) repeat-x top`,

        [theme.breakpoints.down('sm')]: {
            padding: '70px 20px 30px',
        },
    },
    fullWidthFooter: {
        boxShadow: '0px -12px 19px 1px rgba(40, 40, 40, 0.12)',
        marginTop: 40,
    },
    contentWrapper: {
        ...container,
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        background: '#FFF',
        padding: 5,
        margin: '0 auto',

        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
        },

        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: 0,
        },

        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    shortContentWrapper: {
        boxShadow: '0px 12px 19px 1px rgba(40, 40, 40, 0.12)',
        borderRadius: 5,
    },
    links: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '15px 0',

        // [theme.breakpoints.down('md')]: {
        //     marginTop: 37,
        // },

        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    link: {
        margin: '0 10px',
        fontSize: 14,
        color: '#626262',
        lineHeight: 1.2,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        position: 'relative',
        '&:after': {
            content: "''",
            position: 'absolute',
            height: '2px',
            background: 'rgb(177, 222, 254)',
            width: '100%',
            bottom: -4,
            left: 0,
            visibility: 'hidden',
        },
        '&:hover': {
            color: 'rgb(8, 92, 166)',
            '&:after': {
                visibility: 'visible',
            },
        },

        [theme.breakpoints.down('md')]: {
            margin: '8px 20px',
        },
    },
    logos: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: 15,

        // [theme.breakpoints.down('md')]: {
        //     marginBottom: 35,
        // },
        //
        // [theme.breakpoints.down('xs')]: {
        //     marginBottom: 15,
        // },
    },
    logoLink: {
        margin: 0,
        cursor: 'pointer',
        textDecoration: 'none',

        // [theme.breakpoints.down('xs')]: {
        //     margin: '0 20px 20px',
        // },
    },
    image: {
        width: 'auto',
        height: 50,

        // [theme.breakpoints.down('md')]: {
        //     height: 40,
        // },
    },
});


const Footer = ({ classes, fullWidth }) => {
    return (
      <footer className={fullWidth ? classes.fullWidthFooter : classes.footer}>
          <div className={`${classes.contentWrapper} ${fullWidth ? '' : classes.shortContentWrapper}`}>
              <div className={classes.links}>
                  <Link to="/over-ons" className={classes.link}>Over ons</Link>
                  <Link to="/gebruiksvoorwaarden" className={classes.link}>Gebruiksvoorwaarden</Link>
                  <Link to="/privacyverklaring" className={classes.link}>Privacyverklaring</Link>
                  <Link to="/veelgestelde-vragen" className={classes.link}>Veelgestelde vragen</Link>
                  <Link to="/contact" className={classes.link}>Contact</Link>
              </div>
              <div className={classes.logos}>
                  {/*<a*/}
                    {/*href="https://www.kwf.nl/"*/}
                    {/*className={classes.logoLink}*/}
                    {/*target="_blank"*/}
                    {/*rel="noopener noreferrer"*/}
                  {/*>*/}
                      {/*<img*/}
                        {/*className={classes.image}*/}
                        {/*src={require("assets/img/logo-kwf.png")}*/}
                        {/*alt="Logo KWF Kankerfonds"*/}
                      {/*/>*/}
                  {/*</a>*/}
                  <a
                    href="https://www.longfonds.nl/"
                    className={classes.logoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                      <img
                        className={classes.image}
                        src={require("assets/img/logo-longfonds.png")}
                        alt="Logo Longfonds"
                      />
                  </a>
                  {/*<a*/}
                    {/*href="https://www.hartstichting.nl/"*/}
                    {/*className={classes.logoLink}*/}
                    {/*target="_blank"*/}
                    {/*rel="noopener noreferrer"*/}
                  {/*>*/}
                      {/*<img*/}
                        {/*className={classes.image}*/}
                        {/*src={require("assets/img/logo-hartstichting-horizontal.png")}*/}
                        {/*alt="Logo Hartstichting"*/}
                      {/*/>*/}
                  {/*</a>*/}
              </div>
          </div>
      </footer>
    );
};

export default withStyles(styles)(Footer);

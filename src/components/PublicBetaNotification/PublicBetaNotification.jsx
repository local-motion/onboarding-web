import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Sticky from 'react-sticky-el';

const styles = theme => ({
    wrapper: {
        width: '100%',
        height: 30,
        overflow: 'hidden',
        background: 'linear-gradient(90deg, #148fe6 50%, #fed911 50%)',
        cursor: 'pointer',
    },
    closed: {
        height: 3,
    },
    badge: {
        height: 30,
        width: 390,
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 auto',

        [theme.breakpoints.down("xs")]: {
            width: 300,
        },
    },
    beta: {
        padding: '10px 20px',
        background: '#148fe6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        [theme.breakpoints.down("xs")]: {
            fontSize: 14,
        },
    },
    message: {
        background: '#fed911',
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 15,

        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
        },
    },
    link: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 10,
        fontWeight: 'bold',
    },
    sticky: {
        position: 'relative',
        zIndex: 9999,
    },
});


const PublicBetaNotification = ({ classes }) => {
    const [isOpen, toggleOpen] = useState(true);

    const toggle = () => toggleOpen(!isOpen);

    return (
      <Sticky stickyClassName={classes.sticky} topOffset={30}>
          <div className={`${classes.wrapper} ${!isOpen ? classes.closed : ''}`} onClick={toggle}>
              <div className={classes.badge}>
                  <div className={classes.beta}>BETA</div>
                  <div className={classes.message}>
                      U neemt deel aan een publieke test
                      <Link to="/veelgestelde-vragen" className={classes.link} onClick={(e) => e.stopPropagation()}>?</Link>
                  </div>
              </div>
          </div>
      </Sticky>
    );
};

export default withStyles(styles)(PublicBetaNotification);
import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Sticky from 'react-sticky-el';

const styles = theme => ({
    wrapper: {
        width: '100%',
        height: 30,
        overflow: 'hidden',
        background: 'linear-gradient(90deg, #148fe6 10%, #fed911 10%)',
        cursor: 'pointer',
    },
    closed: {
        height: 3,
    },
    badge: {
        height: 30,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    beta: {
        color: '#FFF',
        background: '#148fe6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        width: '10%',

        [theme.breakpoints.down("xs")]: {
            fontSize: 14,
            width: '20%',
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
        width: '90%',

        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
        },
    },
    link: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 20,
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
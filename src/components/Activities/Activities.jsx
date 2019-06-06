import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import AccessTime from "@material-ui/icons/AccessTime";

const styles = theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        paddingTop: 20,
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        marginBottom: 10,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'dk_black_bamboo-webfont',
        fontSize: 26,
        color: '#626262',
    },
    icon: {
        marginRight: 7,
        fill: '#626262',
    },
    activity: {
        border: '1px solid #c5e3f5',
        borderRadius: 5,
        padding: 15,
        margin: '5px 0',
        width: '100%',
    },
    time: {
        fontSize: 12,
        color: '#085ca6',
        lineHeight: 2,
    },
    message: {
        fontSize: 15,
        color: '#626262',
        lineHeight: 1.2,
    },
    highlighted: {
        color: '#085ca6',
    },
});

class Activities extends Component {
    render() {
        const { classes } = this.props;

        return (
          <div className={classes.wrapper}>
              <div className={classes.header}>
                  <AccessTime className={classes.icon} />
                  <div className={classes.title}>Activiteit</div>
              </div>

              <div className={classes.activity}>
                  <div className={classes.time}>1 day ago</div>
                  <div className={classes.message}><span className={classes.highlighted}>John</span> declared Spelen in <span className={classes.highlighted}>Hardewijk</span> smokefree</div>
              </div>
              <div className={classes.activity}>
                  <div className={classes.time}>2 day ago</div>
                  <div className={classes.message}><span className={classes.highlighted}>Tim</span> declared Spelen in <span className={classes.highlighted}>Hardewijk</span> smokefree</div>
              </div>
              <div className={classes.activity}>
                  <div className={classes.time}>3 day ago</div>
                  <div className={classes.message}><span className={classes.highlighted}>Sarah</span> declared Spelen in <span className={classes.highlighted}>Hardewijk</span> smokefree</div>
              </div>
          </div>
        );
    }
}

export default withStyles(styles)(Activities);
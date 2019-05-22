import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    wrapper: {
        background: '#FFF',
        borderRadius: 10,
        padding: 5,
    },
    title: {
        color: '#085ca6',
        fontFamily: "'dk_black_bamboo-webfont'",
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        background: '#eb621b',
        color: '#FFF',
        boxShadow: 'none',
        marginTop: 15,

        '&:hover': {
            background: 'rgba(235, 98, 27, .8)',
            color: '#FFF',
        }
    }
});

class OpenPlaygroundBubble extends Component {
    render() {
        const { classes, name, gotoPlayground } = this.props;

        return (
          <div className={classes.wrapper}>
              <div className={classes.title}>{name}</div>

              <Button
                type="button"
                fullWidth
                variant="contained"
                className={classes.button}
                onClick={gotoPlayground}
              >Sluit je aan</Button>
          </div>
        );
    }
}

export default withStyles(styles)(OpenPlaygroundBubble);
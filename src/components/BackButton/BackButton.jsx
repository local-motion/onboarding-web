import React from "react";
import { withRouter } from "react-router-dom";
import { ArrowLeftRounded } from "@material-ui/icons";
import { Button, withStyles } from "@material-ui/core";

const styles = theme => ({
    button: {
        marginTop: 20,
    },
});


const BackButton = ({ history, classes, className, where = 'back' }) => {
    function go() {
        if (where === 'back') {
            history.goBack();
        }

        if (where === 'home') {
            history.push('/')
        }
    }

    return (
      <div className={className}>
          <Button color="default" onClick={go} className={classes.button}>
              <ArrowLeftRounded />
              <span>Terug</span>
          </Button>
      </div>
    );
};

export default withStyles(styles)(withRouter(BackButton));
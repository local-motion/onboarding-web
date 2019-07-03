/*
    Based on: https://material-ui.com/components/snackbars/
*/

import React, { Component } from 'react';
import { amber } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
      warning: {
        backgroundColor: amber[700],
      },
      icon: {
        fontSize: 20,
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: 10,
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
    });


class WarningSnackbar extends Component {

    render() {
        const { message, classes } = this.props
        return (
            <Snackbar 
                className={classes.warning}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                key="bottom center"
                open={true}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
            >
                <SnackbarContent 
                    className={classes.warning}
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <WarningIcon className={classes.icon + ' ' + classes.iconVariant} />
                            {message}
                        </span>
                    }
                />
            </Snackbar>
        )
    }
}



export default withStyles(styles)(WarningSnackbar)


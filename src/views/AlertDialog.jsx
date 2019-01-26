import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import {withNamespaces} from "react-i18next";

/**
 * Handles parsing the 'error' portion of the payload. Local-Motion makes use
 * of error extensions to provide user friendly messages and allowing
 * functional decisions based on errors[x].extensions.code
 *
 * Example error response in case of graphQL errors:

 {
    graphQLErrors: 
        [
            {
                "code" : "UNAUTHORIZED",
                "niceMessage" : "You are not a manager of this playground"
            }
        ]

 }

*/
class AlertDialog extends React.Component {
    /**
     * Finds the GraphQLError and returns the 'niceMessage' of the error's extensions.
     */
    extractMessageFromApolloError(apolloError) {
        const graphQLErrors = apolloError.graphQLErrors;
        const networkError = apolloError.networkError;

        if (networkError)
            return "Netwerkfout";
        else if (graphQLErrors)
            return graphQLErrors.map(({ code, niceMessage }) => niceMessage + " (" + code + ")").join('/n')
        else
            return apolloError.toString();
    }

  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    const {errorMessage, apolloError} = this.props
    const message = errorMessage ||
                        (apolloError && this.extractMessageFromApolloError(apolloError)) ||
                        'Onbekende fout'

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Er is helaas iets fout gegaan"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Sluiten
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(AlertDialog)
);

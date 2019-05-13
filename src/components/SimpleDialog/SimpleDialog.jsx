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
import { ERROR_DIALOG } from './SimpleDialogReducer';

/**
 * This dialog presents a message to the user and an OK button to confirm and close the dialog
 * 
 * Props:
 * - open: true|false whether this dialog should open (note that when the user has closed the dialog it will no longer open until the component is reconstructed). Defaults to true
 * - title
 * - message
 * - buttonMessage (optional): text to print on the confirm button, defaults to 'OK'
 * - onClose: function that will be called when the dialog is closed. The parent component should use this to set the 'open' prop to false or disable rendering of this dialog altogether
*/
class SimpleDialog extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      open: props.open !== undefined ? props.open : true,
    }
  
  }

  handleClose = () => {
    this.props.onClose()
  };

  componentWillUnmount() {
    this.handleClose()
  }

  render() {
    const {type, title, message, buttonMessage, cancelButtonMessage, onConfirm} = this.props

    console.log('rendering simple dialog:', this.props)

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          {
            type === ERROR_DIALOG ?
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  {buttonMessage || 'OK'}
                </Button>
              </DialogActions>
            :
              // CONFIRMATION_DIALOG
              <DialogActions>
                <Button onClick={this.handleClose} color="secundary">
                  {cancelButtonMessage || 'Annuleren'}
                </Button>
                <Button onClick={onConfirm} color="primary">
                  {buttonMessage || 'OK'}
                </Button>
              </DialogActions>
          }
        </Dialog>
      </div>
    );
  }
}

export default withStyles(componentsStyle)(SimpleDialog)

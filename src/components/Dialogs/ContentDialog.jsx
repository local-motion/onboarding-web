// Largely copied from: https://raw.githubusercontent.com/mui-org/material-ui/master/docs/src/pages/demos/dialogs/CustomizedDialog.js

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions)


class ContentDialog extends React.Component {

  render() {
    const {title, content, open, onClose} = this.props
    const buttonLabel = this.props.buttonLabel || 'OK'

    return (
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="customized-dialog-title"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {title}
          </DialogTitle>
          <DialogContent>
              {content}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              {buttonLabel}
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default ContentDialog
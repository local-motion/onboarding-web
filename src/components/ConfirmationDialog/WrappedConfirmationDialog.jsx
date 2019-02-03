import React from 'react';
import { connect } from 'react-redux'
import { closeConfirmationDialog } from './ConfirmationDialogActions';
import { getConfirmationDialog } from './ConfirmationDialogReducer';
import ConfirmationDialog from './ConfirmationDialog';



const mapStateToProps = state => ({
    confirmationDialog: getConfirmationDialog(state)
})

const mapDispatchToProps = dispatch => ({
    closeConfirmationDialog:    () => dispatch(closeConfirmationDialog()),
})


const WrappedConfirmationDialog = props => {
    const {confirmationDialog, closeConfirmationDialog} = props
    return confirmationDialog ?
        <ConfirmationDialog
            title={confirmationDialog.title}
            message={confirmationDialog.message}
            buttonMessage={confirmationDialog.buttonMessage}
            onClose={closeConfirmationDialog}
        />
        :
        null
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedConfirmationDialog);

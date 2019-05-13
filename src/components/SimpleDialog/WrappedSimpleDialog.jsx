import React from 'react';
import { connect } from 'react-redux'
import { closeSimpleDialog, confirmConfirmationDialog } from './SimpleDialogActions';
import { getSimpleDialog } from './SimpleDialogReducer';
import SimpleDialog from './SimpleDialog';



const mapStateToProps = state => ({
    simpleDialog: getSimpleDialog(state)
})

const mapDispatchToProps = dispatch => ({
    closeSimpleDialog:            () => dispatch(closeSimpleDialog()),
    confirmConfirmationDialog:    () => dispatch(confirmConfirmationDialog()),
})


const WrappedSimpleDialog = props => {
    const {simpleDialog, closeSimpleDialog, confirmConfirmationDialog} = props

    console.log('wrapped simple dialog:' , simpleDialog)

    return simpleDialog ?
        <SimpleDialog
            type={simpleDialog.type}
            title={simpleDialog.title}
            message={simpleDialog.message}
            buttonMessage={simpleDialog.buttonMessage}
            cancelButtonMessage={simpleDialog.cancelButtonMessage}
            onClose={closeSimpleDialog}
            onConfirm={confirmConfirmationDialog}
        />
        :
        null
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSimpleDialog);

import React from 'react';
import { connect } from 'react-redux'
import { getStatusNotification } from './StatusNotificationReducer';
import WarningSnackbar from 'components/Snackbar/WarningSnackbar';


const mapStateToProps = state => ({
    statusNotification: getStatusNotification(state)
})

const WrappedWarningSnackbar = props => {
    const {statusNotification} = props
    return statusNotification ?
        <WarningSnackbar message={statusNotification.message} />
        :
        null
}

export default connect(mapStateToProps)(WrappedWarningSnackbar);

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import {withTranslation} from "react-i18next";

class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {title, content} = this.props;

        return (
            <div className={"FormDialog-container"}>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    className={"FormDialog"}
                >
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={"dialog-actions"}>
                        <Button onClick={this.handleClose} color="primary">
                            Bevestigen
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(
    withTranslation("translations")(FormDialog)
);
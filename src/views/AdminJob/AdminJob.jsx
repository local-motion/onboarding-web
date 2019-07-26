import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";
import { retrieveAdminCommand, runAdminJob, deleteAdminCommand } from "components/AdminJob/AdminJobActions.js";
import { getAdminCommand, getLastJobResult, getJobResult } from "components/AdminJob/AdminJobReducer.js";
import Button from "components/CustomButtons/Button.jsx";
import JSONPretty from 'react-json-pretty';
import { FormControlLabel, Checkbox } from '@material-ui/core';


const mapStateToProps = (state, ownProps) => ({
    commandRecord: getAdminCommand(state),
    jobResult: getJobResult(state),
    lastJobResult: getLastJobResult(state),
});

const mapDispatchToProps = dispatch => ({
    retrieveAdminCommand: () => dispatch(retrieveAdminCommand()),
    runAdminJob: (validationCode, retainCommandFile) => dispatch(runAdminJob(validationCode, retainCommandFile)),
    deleteAdminCommand: () => dispatch(deleteAdminCommand()),
});


class AdminJob extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            retainCommandFile: false,
            adminRecordRetrieved: false,
        }
    }

    retrieveAdminCommand = () => {
        this.props.retrieveAdminCommand();
        this.setState({adminRecordRetrieved: true});
    }

    runAdminJob = () => {
        this.props.runAdminJob(this.props.commandRecord.validationCode, this.state.retainCommandFile);
    }

    toggleRetainCommandFile = () => {
        this.setState(prevState =>({retainCommandFile: !prevState.retainCommandFile}))
    }

    render() {
        const { commandRecord, jobResult, deleteAdminCommand } = this.props;
        return (
            <div className={"workspace-wrapper"}>
                <h1>Administration</h1>
                <h2>Admin command</h2>
                <span>
                <div>
                {
                    commandRecord ?
                        <JSONPretty data={commandRecord}></JSONPretty>
                        :
                        this.state.adminRecordRetrieved ?
                            <div>No command file present</div>
                            :
                            <div>Press 'Fetch command'</div>
                }
                </div>
                {   jobResult &&
                    <div>
                        <h3>Result</h3>
                        <JSONPretty data={jobResult}></JSONPretty>
                    </div>
                }
                </span>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.retainCommandFile}
                            onChange={this.toggleRetainCommandFile}
                        />
                    }
                    label='Retain command file'
                />

                <br />

                <Button 
                    onClick={this.retrieveAdminCommand} 
                    color={commandRecord ? null : 'primary'}
                >
                    {commandRecord ? 'Refresh command' : 'Fetch command'}
                </Button>

                <Button 
                    onClick={this.runAdminJob} 
                    color="primary" 
                    disabled={!commandRecord}
                >
                    Run job
                </Button>

                <Button 
                    onClick={deleteAdminCommand} 
                    disabled={!commandRecord}
                >
                    Delete command
                </Button>
            </div>
        );
    }
}

export default withRouter(withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(AdminJob)));

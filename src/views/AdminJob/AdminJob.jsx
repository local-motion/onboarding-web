import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";
import { retrieveAdminCommand, runAdminJob } from "components/AdminJob/AdminJobActions.js";
import { getAdminCommand, getLastJobResult } from "components/AdminJob/AdminJobReducer.js";
import Button from "components/CustomButtons/Button.jsx";
import { dlog } from "utils/Generics.js";

const mapStateToProps = (state, ownProps) => ({
    commandRecord: getAdminCommand(state),
    lastJobResult: getLastJobResult(state),
});

const mapDispatchToProps = dispatch => ({
    retrieveAdminCommand: () => dispatch(retrieveAdminCommand()),
    runAdminJob: () => dispatch(runAdminJob()),
});


class AdminJob extends React.Component {
    // componentDidMount() {
    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    // }

    // componentDidUpdate(prevProps, prevState) {
    // }


    render() {
        const { commandRecord, retrieveAdminCommand, runAdminJob } = this.props;
        dlog('rendering command record: ', commandRecord)

        return (
            <div className={"workspace-wrapper"}>
                <h1>Administration</h1>
                <h2>Job command</h2>
                {
                    commandRecord ?
                        <div>
                            commandIdentifier:      {commandRecord.commandIdentifier}<br />
                            comment:                {commandRecord.comment}<br />
                            operatorEmail:          {commandRecord.operatorEmail}<br />
                            inputParameters:    <br />
                            <ul>
                                {Object.keys(commandRecord.inputParameters).map((item, index) =>
                                    <li key={index}>{item}: {commandRecord.inputParameters[item]}</li>
                                )}
                            </ul>

                        </div>
                        :
                        <div>No record present</div>
                }
                <Button onClick={retrieveAdminCommand}>Refresh job</Button>
                <Button onClick={runAdminJob} color="primary">Run job</Button>
            </div>
        );
    }
}

export default withRouter(withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(AdminJob)));

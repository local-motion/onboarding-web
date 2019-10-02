import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";
import { retrieveAdminCommand, runAdminJob, deleteAdminCommand } from "components/AdminJob/AdminJobActions.js";
import { getAdminCommand, getLastJobResult, getJobResult } from "components/AdminJob/AdminJobReducer.js";
import Button from "components/CustomButtons/Button.jsx";
// import Hook from "views/Developer/Hook.jsx";
import JSONPretty from 'react-json-pretty';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { readFromBrowserStorage, deleteFromBrowserStorage, writeToBrowserStorage } from "utils/Generics.js";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {logLevels, logLevelOff} from 'utils/Logging.js';

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

const browserStorageKey = "developer-settings"

console.log("loglevel", logLevelOff)

const defaultSettings = {
    developerMode: false,
    showLinkInMenu: false,
    logLevel: 'OFF',
    testPassword: '',
}
const getSettings = () => readFromBrowserStorage(browserStorageKey) || defaultSettings;
const storeSettings = settings => writeToBrowserStorage(browserStorageKey, settings);
const eraseSettings = () => deleteFromBrowserStorage(browserStorageKey);

export const isDeveloperMode = () => getSettings().developerMode;
export const showDeveloperCCLinkInMenu = () => isDeveloperMode() && getSettings().showLinkInMenu;
export const getLogLevelLabel = () => getSettings().logLevel;

// console.log('makestyles:' + makeStyles);
// const useStyles = makeStyles(theme => ({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }));

class DeveloperControlCenter extends React.Component {
    constructor(props) {
        super(props);
        const settings = readFromBrowserStorage(browserStorageKey);
        this.state = settings || defaultSettings;
    }

    clearSettings = () => {
        eraseSettings();
        this.triggerState();
    }

    // saveSettings = () => {
    //     writeToBrowserStorage(browserStorageKey, this.state);
    // }

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

    triggerState = () => this.setState({});

    updateSettings = settingsUpdateFunction => {
        const settings = getSettings();
        const updatedSettings = settingsUpdateFunction(settings);
        storeSettings({...settings, ...updatedSettings});
        this.triggerState();
    }

    toggleDeveloperMode = () => {
        this.updateSettings(settings => ({developerMode: !settings.developerMode}) );
    }
    toggleShowLinkInMenu = () => {
        this.updateSettings(settings => ({showLinkInMenu: !settings.showLinkInMenu}) );
    }
    updateLogLevel = event => {
        this.updateSettings(settings => ({logLevel: event.target.value}) );
        // this.updateSettings(settings => ({logLevel}) );
    }


    render() {
        // const classes = useStyles();
        const { commandRecord, jobResult } = this.props;
        const settings = getSettings();

        return (
            <div className={"workspace-wrapper"}>
                <h1>Developer Control Center</h1>
                All settings made on this page will be saved in the application storage of the browser and are therefore accessible to every user of this device.
                The settings are not LocalMotion-user specific, so they apply to all users of this device.

                <h2>General settings</h2>

                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={settings.developerMode} 
                            onChange={() => this.toggleDeveloperMode()}
                        />
                    }
                    label="Developer mode active"
                />

                {/* <Hook/> */}

                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={settings.showLinkInMenu} 
                            onChange={() => this.toggleShowLinkInMenu()}
                        />
                    }
                    label="Link to this page in menu"
                />

                {/* <FormControl  variant="filled" className={classes.formControl}> */}
                <FormControl  variant="filled">
                    <InputLabel htmlFor="log-level">Log level</InputLabel>
                    <Select
                        value={settings.logLevel}
                        onChange={this.updateLogLevel}
                        inputProps={{
                            id: 'log-level',
                        }}
                        >
                            {logLevels.map((logLevel, idx) => <MenuItem key={idx} value={logLevel.label}>{logLevel.label}</MenuItem>)}
                        {/* <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>



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

                <br />

                <Button 
                    onClick={this.retrieveAdminCommand} 
                    color={commandRecord ? null : 'primary'}
                >
                    {commandRecord ? 'Refresh command' : 'Fetch command'}
                </Button>

                <Button 
                    onClick={this.clearSettings} 
                    color={'primary'}
                >
                    Clear settings
                </Button>

                <br />
                <Button 
                    onClick={() => this.props.history.push('/')} 
                    color="primary"
                >
                    Back to homepage
                </Button>

            </div>
        );
    }
}

export default withRouter(withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(DeveloperControlCenter)));

import React from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";
import Button from "components/CustomButtons/Button.jsx";
// import Hook from "views/Developer/Hook.jsx";
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { readFromBrowserStorage, deleteFromBrowserStorage, writeToBrowserStorage } from "utils/Generics.js";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {logLevels} from 'utils/Logging.js';

const browserStorageKey = "developer-settings"

const defaultSettings = {
    developerMode: false,
    showLinkInMenu: false,
    logLevel: 'OFF',
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

    clearSettings = () => {
        eraseSettings();
        this.triggerState();
    }

    triggerState = () => this.setState({});             // Just to trigger a render cycle

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
    }


    render() {
        // const classes = useStyles();
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

                <br />

                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={settings.showLinkInMenu} 
                            onChange={() => this.toggleShowLinkInMenu()}
                        />
                    }
                    label="Link to this page in menu"
                />

                <br />

                <Button 
                    onClick={this.clearSettings} 
                    color={'primary'}
                >
                    Clear all settings
                </Button>

                <h2>Logging</h2>

                {/* <Hook/> */}
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
                    </Select>
                </FormControl>

                <br />
                <br />
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

export default withRouter(withStyles(componentsStyle)(DeveloperControlCenter));

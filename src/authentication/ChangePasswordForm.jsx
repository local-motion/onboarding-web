import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, TextField, withStyles} from '@material-ui/core'
import {Auth} from 'aws-amplify';
import { getErrorMessage } from '../api/ErrorMessages';
import { validateToMessage } from '../components/validation/Validations';
import { passwordMaximumLength, passwordMinimumLength, containsLowerCaseLetterPattern, containsUpperCaseLetterPattern, containsDecimalPattern, containsSpecialCharacterPattern, isValidPassword, containsOnlyValidCharactersPattern, allowedSpecialCharacters } from './AuthenticatorValidations';
import { bindMethods } from '../utils/Generics';
import Paper from "@material-ui/core/Paper/Paper";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { container } from "../assets/jss/material-kit-react";

const PasswordIcon = ({ className }) => (
    <SvgIcon width="20px" height="26px" viewBox="0 0 20 26" className={className}>
        <path fillRule="evenodd" fill="rgb(98, 98, 98)"
              d="M17.059,26.000 L2.941,26.000 C1.319,26.000 -0.000,24.633 -0.000,22.953 L-0.000,12.594 C-0.000,10.914 1.319,9.547 2.941,9.547 L4.704,9.547 L4.704,5.371 C4.704,2.409 7.079,-0.000 9.998,-0.000 C12.917,-0.000 15.292,2.409 15.292,5.371 L15.292,9.547 L17.059,9.547 C18.681,9.547 20.000,10.914 20.000,12.594 L20.000,22.953 C20.000,24.633 18.681,26.000 17.059,26.000 ZM13.331,5.371 C13.331,3.529 11.836,2.031 9.998,2.031 C8.160,2.031 6.665,3.529 6.665,5.371 L6.665,9.547 L13.331,9.547 L13.331,5.371 ZM18.039,12.594 C18.039,12.034 17.599,11.578 17.059,11.578 L2.941,11.578 C2.401,11.578 1.961,12.034 1.961,12.594 L1.961,22.953 C1.961,23.513 2.401,23.969 2.941,23.969 L17.059,23.969 C17.599,23.969 18.039,23.513 18.039,22.953 L18.039,12.594 ZM10.979,17.984 L10.979,20.211 C10.979,20.772 10.540,21.227 9.998,21.227 C9.457,21.227 9.018,20.772 9.018,20.211 L9.018,17.981 C8.518,17.647 8.186,17.065 8.186,16.402 C8.186,15.365 8.998,14.523 10.000,14.523 C11.002,14.523 11.814,15.365 11.814,16.402 C11.814,17.067 11.481,17.650 10.979,17.984 Z"/>
    </SvgIcon>
  );
  
  
const styles = theme => ({
    checkmark: {
        color: 'green'
    },
    specialCharacters: {
        fontWeight: 'bold',
    },
    container: {
        ...container,
        marginTop: 100,
    },
    paper: {
        alignItems: "center",
        borderRadius: "7px",
        border: "1px dashed #b1defe",
        boxShadow: "0px 5px 10px 0px rgba(40, 40, 40, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        marginBottom: 20,
    },
    avatarWrapper: {
        alignItems: "center",
        background: "#258ecc",
        borderRadius: "50%",
        boxShadow: "0px 5px 10px 0px rgba(40, 40, 40, 0.1)",
        display: "flex",
        height: 120,
        justifyContent: "center",
        width: 120,
        position: "absolute",
        left: "calc(50% - 60px)",
        top: -60
    },
    editWrapper: {
        alignItems: "center",
        background: "#FFF",
        border: "1px solid #b1defe",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        height: 37,
        justifyContent: "center",
        position: "absolute",
        right: 0,
        top: 0,
        width: 37,

        "&:hover": {
            fill: "#FFF",
            background: "#b1defe"
        }
    },
    editIcon: {
        fill: "#085ca6"
    },
    avatar: {
        fill: "#FFF",
        width: 43,
        height: 42
    },
    avatarText: {
        marginTop: 80,
        fontSize: 14,
        color: "#626262",
        fontWeight: 400,
    },
    input: {
        fontSize: 15,
        color: '#626262',
        fontWeight: 400,
        width: '100%',
        maxWidth: '60%',
        marginTop: 15,

        [theme.breakpoints.down('xs')]: {
            maxWidth: '90%',
        },
    },
    settingsTitle: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 26,
        fontFamily: 'dk_black_bamboo-webfont',
        marginBottom: 5,
        marginTop: 30,

        [theme.breakpoints.down('xs')]: {
            fontSize: 22,
            margin: '30px 5px 5px',
        },
    },
    settingsIcon: {
        height: 27,
        marginRight: 10,
        width: 33,
    },
    checkbox: {
        marginRight: 0,
        marginLeft: 0,
    },
    actions: {
        margin: '20px 0 40px',

        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            margin: '20px 0 20px',
        },
    },
    button: {
        padding: '15px 40px',
        color: '#FFF',
        boxShadow: 'none',

        [theme.breakpoints.down('xs')]: {
            margin: 5,
            width: 150,
            padding: '10px 30px',
        },
    },
    cancelButton: {
        marginRight: 15,
        background: '#626262',

        '&:hover': {
            background: '#a1a1a1',
            boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        },

        [theme.breakpoints.down('xs')]: {
            marginRight: 5,
        },
    },
    saveButton: {
        background: '#085ca6',

        '&:hover': {
            background: '#258ecc',
            boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        },
    },
    disabled: {
        color: '#FFF !important',
    },
});


const limitedPasswordValidations = [
    {
        validateThat: password => password.length <= passwordMaximumLength,
        message: 'Het wachtwoord mag uit maximaal 40 karakters bestaan.',
    },
    {
        validateThat: password => containsOnlyValidCharactersPattern.test(password) === true,
        message: 'Het wachtwoord mag alleen uit letters, cijfers en bovenvermelde speciale karakters bestaan.'
    },
]

/**
 * This form allows the user to change his password. To do his he first needs to provide his current password.
 */
class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            repeatedPassword: '',
            passwordFocus: false,
        }

        bindMethods(['changePassword', 'onChangePassword', 'onChangeNewPassword', 'onChangeRepeatedNewPassword', 'onFocusChangeNewPassword'], this)
    }


    changePassword() {
        const errorMessage = this.validatePreSubmit()
        if (errorMessage) {
            this.props.displayError(errorMessage)
            return
        }

        const {password} = this.props;
        const {newPassword} = this.state
        this.props.setWaitingForServerResponse()

        Auth.currentAuthenticatedUser()
        .then(user => {
            console.log('submitting change password for ', user);
            return Auth.changePassword(user, password, newPassword);
        })
        .then(data => {
            console.log('password change success', data);
            this.setState({newPassword: '', repeatedPassword: ''})
            this.props.setPassword('')
            this.props.clearWaitingForServerResponse()
            this.props.openInformationDialog('Gelukt', 'Je wachtwoord is gewijzigd.')
        })
        .catch(error => {
            console.log('password change error', error);
            this.props.clearWaitingForServerResponse()
            if (error.message === 'Incorrect username or password.')
                this.props.displayError('Het huidige wachtwoord is incorrect. Probeer het nog eens.')
            else
                this.props.displayError(getErrorMessage(error.code, error.message))
        })
    }

    validatePreSubmit() {
        // A safety check before submitting. With normal form behaviour these errors should not occur.
        const {password} = this.props
        const {newPassword, repeatedPassword} = this.state
        if (!password || !newPassword || !repeatedPassword)                 return 'Je moet alle velden invullen'
        if (!isValidPassword(newPassword))                                  return 'Het wachtwoord is ongeldig'
        if (repeatedPassword !== newPassword)                               return 'Beide wachtwoorden zijn niet aan elkaar gelijk'
        return ''
    }


    onChangePassword(event) {
        this.props.setPassword(event.target.value)
    }
    onChangeNewPassword(event) {
        this.setState({newPassword: event.target.value})
    }
    onChangeRepeatedNewPassword(event) {
        this.setState({repeatedPassword: event.target.value})
    }
    onFocusChangeNewPassword(hasFocus) {
        this.setState({passwordFocus: hasFocus})
    }
    catchEnterSubmit(event, isReadyToSubmit) {
        if(event.keyCode === 13 && event.shiftKey === false && isReadyToSubmit)
            this.changePassword()
    }

    render() {
        const { password, waitingForServerResponse, isInCard, classes } = this.props
        const { newPassword, repeatedPassword, passwordFocus } = this.state

        const passwordErrorLimited = validateToMessage(newPassword, limitedPasswordValidations, 'edit')
        const passwordError = newPassword && !isValidPassword(newPassword) ? 'Het wachtwoord is ongeldig' : ''
        const repeatedPasswordError = repeatedPassword && (repeatedPassword !== newPassword) ? 'Beide wachtwoorden zijn niet aan elkaar gelijk' : ''

        const isReadyToSubmit = password && newPassword && repeatedPassword &&
                                !passwordError && !repeatedPasswordError &&
                                !waitingForServerResponse

        const checkmark = <span className={classes.checkmark}>{String.fromCharCode(10004)}</span> 


        return (

            <Paper className={classes.paper}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={classes.settingsTitle}>
                    <PasswordIcon className={classes.settingsIcon}/>
                    Wachtwoord instellen
                </div>

                <TextField
                    variant="outlined"
                    className={classes.input}
                    label="Huidig wachtwoord"
                    type="password"
                    name="oldPassword"          // Setting the name property triggers the autocomplete in Chrome
                    value={password}
                    onChange={this.onChangePassword}
                    onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                    autoFocus
                />

                <TextField
                    variant="outlined"
                    className={classes.input}
                    label="Nieuw wachtwoord"
                    type="password"
                    value={newPassword}
                    onChange={this.onChangeNewPassword}
                    onFocus={() => this.onFocusChangeNewPassword(true)}
                    onBlur={() => this.onFocusChangeNewPassword(false)}
                    onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                    autoComplete="new-password"
                />
                {passwordFocus &&
                    <p>
                        Het wachtwoord moet:<br />
                        {containsLowerCaseLetterPattern.test(newPassword) ? checkmark : '-'} een kleine letter bevatten<br />
                        {containsUpperCaseLetterPattern.test(newPassword) ? checkmark : '-'} een hoofdletter bevatten<br />
                        {containsDecimalPattern.test(newPassword) ? checkmark : '-'} een cijfer bevatten<br />
                        {containsSpecialCharacterPattern.test(newPassword) ? checkmark : '-'} een van de volgende tekens bevatten: <span className={classes.specialCharacters}>{allowedSpecialCharacters}</span><br />
                        {newPassword.length >= passwordMinimumLength ? checkmark : '-'} tenminste {passwordMinimumLength} karakters lang zijn<br />
                        {passwordErrorLimited && <span className={"error"}>{passwordErrorLimited}</span>}
                    </p>
                }
                {!passwordFocus && passwordError && <p className={"error"}>{passwordError}</p>}

                <TextField
                    variant="outlined"
                    className={classes.input}
                    label="Nieuw wachtwoord nogmaals"
                    type="password"
                    value={repeatedPassword}
                    onChange={this.onChangeRepeatedNewPassword}
                    onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                    autoComplete="new-password"
                />
                {repeatedPasswordError && <p className={"error"}>{repeatedPasswordError}</p>}

                <div className={classes.actions}>
                    <Button
                    variant="contained"
                    className={`${classes.button} ${classes.saveButton}`}
                    classes={{ disabled: classes.disabled }}
                    disabled={ !isReadyToSubmit }
                    onClick={this.changePassword}
                    >
                        Wachtwoord wijzigen
                    </Button>
                </div>

            </Paper>
        )
    }
}

export default withStyles(styles)(withRouter(ChangePasswordForm))

import React, {Component, Fragment} from 'react';
import { withRouter } from "react-router-dom";
import {Button, TextField, withStyles} from '@material-ui/core'
import {Auth} from 'aws-amplify';
import { getErrorMessage } from '../api/ErrorMessages';
import { validateToMessage } from '../components/validation/Validations';
import { passwordMaximumLength, passwordMinimumLength, containsLowerCaseLetterPattern, containsUpperCaseLetterPattern, containsDecimalPattern, containsSpecialCharacterPattern, isValidPassword, containsOnlyValidCharactersPattern, allowedSpecialCharacters } from './AuthenticatorValidations';
import { bindMethods } from '../utils/Generics';
import Paper from "@material-ui/core/Paper/Paper";
import { styles } from './AuthenticatorStyles';
import { PadlockIcon } from './AuthenticatorStyles';
import { logdebug } from 'utils/Logging';


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
            logdebug('submitting change password for ', user);
            return Auth.changePassword(user, password, newPassword);
        })
        .then(data => {
            logdebug('password change success', data);
            this.setState({newPassword: '', repeatedPassword: ''})
            this.props.setPassword('')
            this.props.clearWaitingForServerResponse()
            this.props.openInformationDialog('Gelukt', 'Je wachtwoord is gewijzigd.')
        })
        .catch(error => {
            logdebug('password change error', error);
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
                <Fragment>
                    {isInCard || <div className={"secure-app-background"}></div>}
                    <div className={classes.settingsTitle}>
                        <PadlockIcon className={classes.settingsIcon}/>
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
                </Fragment>
            </Paper>
        )
    }
}

export default withStyles(styles)(withRouter(ChangePasswordForm))

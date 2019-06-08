import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, TextField, CardMedia, withStyles} from '@material-ui/core'
import {Auth} from 'aws-amplify';
import { getErrorMessage } from '../api/ErrorMessages';
import { validateToMessage } from '../components/validation/Validations';
import { passwordMaximumLength, passwordMinimumLength, containsLowerCaseLetterPattern, containsUpperCaseLetterPattern, containsDecimalPattern, containsSpecialCharacterPattern, isValidPassword, containsOnlyValidCharactersPattern, allowedSpecialCharacters, isValidVerificationCode, allVerificationCodeCharactersPattern, verificationCodeLength } from './AuthenticatorValidations';
import { bindMethods } from '../utils/Generics';
import { styles } from './AuthenticatorStyles';
import { PadlockIcon } from './AuthenticatorStyles';
import { Link } from "react-router-dom";

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
 * This form allows the user to set a new password using a reset code that was sent to him
 */
class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repeatedPassword: '',
            passwordFocus: false,
        }

        bindMethods(['resetPassword', 'onChangeVerificationCode', 'onChangeUsername', 'onChangePassword', 'onChangeRepeatedPassword', 'onFocusChangePassword'], this)
    }


    resetPassword() {
        const errorMessage = this.validatePreSubmit()
        if (errorMessage) {
            this.props.displayError(errorMessage)
            return
        }

        const {username, password, verificationCode} = this.props;
        this.props.setWaitingForServerResponse()
        console.log('submitting reset password for ' + username);
        Auth.forgotPasswordSubmit(username, verificationCode, password)
            .then(data => {
                console.log('password reset success for ' + username, data);
                // Leave the password in memory so it is correctly prefilled for sign in
                this.props.setVerificationCode('')
                this.props.clearWaitingForServerResponse()
                this.props.clearInitiativeForVerification()
                this.props.changeForm('signIn')
            })
            .catch(error => {
                console.log('password reset error', error);
                this.props.clearWaitingForServerResponse()
                this.props.displayError(getErrorMessage(error.code, error.message))
            })
    }

    validatePreSubmit() {
        // A safety check before submitting. With normal form behaviour these errors should not occur.
        const {username, password, verificationCode} = this.props
        const {repeatedPassword} = this.state
        if (!username)                                                      return 'Gebruikersnaam is onbekend. Ververs het scherm en probeer opnieuw'
        if (!verificationCode || !password || !repeatedPassword)            return 'Je moet alle velden invullen'
        if (!isValidVerificationCode(verificationCode))                     return 'De code moet uit ' + verificationCodeLength + ' cijfers bestaan'
        if (!isValidPassword(password))                                     return 'Het wachtwoord is ongeldig'
        if (repeatedPassword !== password)                                  return 'Beide wachtwoorden zijn niet aan elkaar gelijk'
        return ''
    }


    onChangeVerificationCode(event) {
        const verificationCode = event.target.value.trim()
        if (allVerificationCodeCharactersPattern.test(verificationCode) && verificationCode.length <= verificationCodeLength)
            this.props.setVerificationCode(verificationCode)
    }
    onChangeUsername(event) {
        const username = event.target.value.trim()
        this.props.setUsername(username)
    }
    onChangePassword(event) {
        this.props.setPassword(event.target.value)
    }
    onChangeRepeatedPassword(event) {
        this.setState({repeatedPassword: event.target.value})
    }
    onFocusChangePassword(hasFocus) {
        this.setState({passwordFocus: hasFocus})
    }
    catchEnterSubmit(event, isReadyToSubmit) {
        if(event.keyCode === 13 && event.shiftKey === false && isReadyToSubmit)
            this.resetPassword()
    }

    render() {
        const { verificationCode, username, password, verificationLink, waitingForServerResponse, changeForm, isInCard, classes } = this.props
        const {repeatedPassword, passwordFocus} = this.state

        const verificationCodeError = verificationCode &&!isValidVerificationCode(verificationCode) ? 'De code moet uit ' + verificationCodeLength + ' cijfers bestaan' : ''
        const passwordErrorLimited = validateToMessage(password, limitedPasswordValidations, 'edit')
        const passwordError = password && !isValidPassword(password) ? 'Het wachtwoord is ongeldig' : ''
        const repeatedPasswordError = repeatedPassword && (repeatedPassword !== password) ? 'Beide wachtwoorden zijn niet aan elkaar gelijk' : ''

        // const isInCard = this.props.location.pathname.includes('actie');

        const isReadyToSubmit = verificationCode && username && password && repeatedPassword &&
                                !verificationCodeError && !passwordError && !repeatedPasswordError &&
                                !waitingForServerResponse

        const checkmark = <span className={classes.checkmark}>{String.fromCharCode(10004)}</span> 


        return (

            <div>
                {isInCard || <div className={"secure-app-background"}></div>}
                {isInCard && (
                      <CardMedia
                        className={classes.media}
                        image={require("../assets/img/backgrounds/login-bg.jpg")}
                        title={"Inloggen"}
                      />
                    )}
                <div className={classes.secureAppContainer}>

                    <div className={classes.settingsTitle}>
                        <PadlockIcon className={classes.settingsIcon}/>
                        Wachtwoord reset
                    </div>
                    {verificationLink ?
                            <p>Kies een nieuw wachtwoord</p>
                        :
                            <p>Geef de code uit de wachtwoordresetmail en kies een nieuw wachtwoord</p>
                    }

                    {/* The verification code field is placed outside the form so the Chrome password manager does not misinterpret the verification code for the username */}
                    {!verificationLink &&
                    <TextField
                        variant="outlined"
                        className={classes.input}
                        label="Code"
                        type="text"
                        value={verificationCode}
                        onChange={this.onChangeVerificationCode}
                        autoComplete="off"
                        autoFocus={!verificationCode}
                        onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                    />
                    }
                    {verificationCodeError && <p className={"error"}>{verificationCodeError}</p>}

                    <form className={classes.secureAppContainer}>

                    {/* The username field is here mainly to allow password manager to store the new username-password combination */}
                    <TextField
                        variant="outlined"
                        className={classes.input}
                        label="Gebruikersnaam"
                        type="text"
                        // name="username"          // Setting the name property triggers the autocomplete in Chrome
                        value={username}
                        onChange={this.onChangeUsername}
                        autoComplete="username"
                        onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                    />

                    <TextField
                        variant="outlined"
                        className={classes.input}
                        label="Wachtwoord"
                        type="password"
                        value={password}
                        onChange={this.onChangePassword}
                        onFocus={() => this.onFocusChangePassword(true)}
                        onBlur={() => this.onFocusChangePassword(false)}
                        onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                        autoFocus={!!verificationCode}
                        autoComplete="new-password"
                    />
                    {passwordFocus &&
                        <p>
                            Het wachtwoord moet:<br />
                            {containsLowerCaseLetterPattern.test(password) ? checkmark : '-'} een kleine letter bevatten<br />
                            {containsUpperCaseLetterPattern.test(password) ? checkmark : '-'} een hoofdletter bevatten<br />
                            {containsDecimalPattern.test(password) ? checkmark : '-'} een cijfer bevatten<br />
                            {containsSpecialCharacterPattern.test(password) ? checkmark : '-'} een van de volgende tekens bevatten: <span className={classes.specialCharacters}>{allowedSpecialCharacters}</span><br />
                            {password.length >= passwordMinimumLength ? checkmark : '-'} tenminste {passwordMinimumLength} karakters lang zijn<br />
                            {passwordErrorLimited && <span className={"error"}>{passwordErrorLimited}</span>}
                        </p>
                    }
                    {!passwordFocus && passwordError && <p className={"error"}>{passwordError}</p>}

                    <TextField
                        variant="outlined"
                        className={classes.input}
                        label="Wachtwoord nogmaals"
                        type="password"
                        value={repeatedPassword}
                        onChange={this.onChangeRepeatedPassword}
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
                        onClick={this.resetPassword}
                        >
                            Reset wachtwoord
                        </Button>
                    </div>
                    </form>

                    <div className={classes.links}>
                        <Link 
                            className={classes.link}
                            onClick={() => changeForm('forgotPassword')}
                            >
                                Terug naar nieuw wachtwoord aanvragen
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(ResetPasswordForm))

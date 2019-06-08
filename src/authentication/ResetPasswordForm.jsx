import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, TextField, withStyles} from '@material-ui/core'
import {Auth} from 'aws-amplify';
import { getErrorMessage } from '../api/ErrorMessages';
import { validateToMessage } from '../components/validation/Validations';
import { style } from './AuthenticatorStyles';
import { passwordMaximumLength, passwordMinimumLength, containsLowerCaseLetterPattern, containsUpperCaseLetterPattern, containsDecimalPattern, containsSpecialCharacterPattern, isValidPassword, containsOnlyValidCharactersPattern, allowedSpecialCharacters, isValidVerificationCode, allVerificationCodeCharactersPattern, verificationCodeLength } from './AuthenticatorValidations';
import { bindMethods } from '../utils/Generics';


const styles = theme => ({
    checkmark: {
        color: 'green'
    },
    specialCharacters: {
        fontWeight: 'bold',
    }
})

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
            <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Wachtwoord reset</h1>
                    <div className={"signin-wrapper"}>
                        {verificationLink ?
                            <p>Kies een nieuw wachtwoord</p>
                        :
                            <p>Geef de code uit de wachtwoordresetmail en kies een nieuw wachtwoord</p>
                        }
                        {/* The verification code field is placed outside the form so the Chrome password manager does not misinterpret the verification code for the username */}
                        {!verificationLink &&
                        <TextField
                            type="text"
                            fullWidth
                            variant={"outlined"}
                            placeholder="Code"
                            value={verificationCode}
                            onChange={this.onChangeVerificationCode}
                            style={style.input}
                            autoFocus={!verificationCode}
                            autoComplete='off'
                            />
                        }
                        {verificationCodeError && <p className={"error"}>{verificationCodeError}</p>}
                        <form
                            style={style}
                            onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                        >
                            {/* The username field is here mainly to allow password manager to store the new username-password combination */}
                            <TextField
                                  placeholder="Gebruikersnaam of emailadres"
                                  type="text"
                                  style={style.input}
                                  fullWidth
                                  variant={"outlined"}
                                  value={username}
                                  onChange={this.onChangeUsername}
                                //   disabled={verificationLink}
                                  autoComplete="username"
                                  />
                            <TextField
                                type="password"
                                placeholder="Kies een wachtwoord"
                                fullWidth
                                variant={"outlined"}
                                value={password}
                                onChange={this.onChangePassword}
                                onFocus={() => this.onFocusChangePassword(true)}
                                onBlur={() => this.onFocusChangePassword(false)}
                                style={style.input}
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
                                type="password"
                                placeholder="Herhaal het wachtwoord"
                                fullWidth
                                variant={"outlined"}
                                value={repeatedPassword}
                                onChange={this.onChangeRepeatedPassword}
                                style={style.input}
                                autoComplete="new-password"
                            />
                            {repeatedPasswordError && <p className={"error"}>{repeatedPasswordError}</p>}

                            <Button
                                style={style.loginButton}
                                variant="contained"
                                color="primary"
                                disabled={ !isReadyToSubmit }
                                onClick={this.resetPassword}>
                                Reset wachtwoord
                            </Button>
                        </form>
                        <div style={style.links} className={"extra-info"}>
                            <div style={style.left}>
                                <Button
                                    style={style.extraButton}
                                    onClick={() => {
                                        console.log('button pressed')
                                        changeForm('forgotPassword')
                                    }
                                    }>
                                    Terug naar nieuw wachtwoord aanvragen
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(ResetPasswordForm))

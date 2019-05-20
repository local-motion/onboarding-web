import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, TextField, withStyles} from '@material-ui/core'
import {Auth} from 'aws-amplify';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getErrorMessage } from '../api/ErrorMessages';
import ContentDialog from "../components/Dialogs/ContentDialog";
import TermsText from "../views/Legal/TermsText";
import PrivacyText from "../views/Legal/PrivacyText";
import { checkEmailExists } from '../components/UserProfile/UserProfileActions';
import { connect } from "react-redux";
import { setSignupConfirmCookies } from '../auth/VerificationLinkHandler';
import { validateToMessage } from '../components/validation/Validations';
import { style } from './AuthenticatorStyles';
import { passwordMaximumLength, passwordMinimumLength, containsLowerCaseLetterPattern, containsUpperCaseLetterPattern, containsDecimalPattern, containsSpecialCharacterPattern, usernameMaximumLength, usernameValidations, isValidPassword, containsOnlyValidCharactersPattern, allowedSpecialCharacters, isValidEmailAddress } from './AuthenticatorValidations';
import { bindMethods } from '../utils/Generics';


const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch) => ({
    checkEmailExists: (emailAddress, onSuccessCallback, onFailCallback, onCompletionCallback) => dispatch(checkEmailExists(emailAddress, onSuccessCallback, onFailCallback, onCompletionCallback)),
})

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
 * This form allows a new user to initiate the sign up process by providing an existing email address and choosing an username and password.
 * As a result the user will receive an email with a verification code.
 * The sign up process needs to be completed by the SignUpConfirmForm where the user supplies this verification code.
 */
class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repeatedPassword: '',
            repeatedPasswordError: '',
            emailAddressError: '',
            error: '',
            usernameError: '',
            passwordError: '',
            passwordFocus: false,
            acceptedTerms: false,
            filledPass: false,
            isTermsOpened: false,
            isPrivacyOpened: false,
            waitingForServerResponse: false,
        }

        bindMethods(['signUp', 'togglePrivacyDialog', 'toggleTermsDialog', 'onChangeUsername', 'onChangePassword', 'onChangeRepeatedPassword', 'onChangeEmailAddress',
                     'onFocusChangePassword', 'onChangeAcceptedTerms'], this)
    }

    signUp() {
        const {username, password, emailAddress} = this.props;
        this.props.setWaitingForServerResponse()
        this.props.checkEmailExists(emailAddress, 
            (result) => {
                // on success (let errors be picked up by the default error handler)
                if (result.emailExists === true)
                    this.signUpError({code: 'EMAIL_ADDRESS_ALREADY_EXISTS'})
                else
                    Auth.signUp(username, password, emailAddress, '')
                        .then(() => {
                            this.props.setPassword('')                                    // clear password from memory
                            this.props.setError('')
                            this.props.clearWaitingForServerResponse()
                    
                            this.props.changeForm('confirmSignUp');
                    
                        })
                        .catch(err => {
                            this.props.setPassword('')                                    // clear password from memory
                            let message = getErrorMessage(err.code, err.message)
                            if (err.message && (err.message.includes("password") || err.message.includes("Password")))
                                message = 'Je wachtwoord heeft minimaal 8 karakters, een cijfer, een hoofdletter en een speciaal karakter nodig.';
                            else if (err.message && err.message.includes("email"))
                                message = 'Ongeldig email adres';
                            
                            this.props.setError(message)
                            this.props.clearWaitingForServerResponse()
                        })
            },
        )

        // Save the initiative in a cookie so it can be picked up when the user clicks the link in the verification mail
        const {initiativeId} = this.props.match.params
        if (initiativeId)
            setSignupConfirmCookies(initiativeId)
    }

    onChangeUsername(event) {
        const username = event.target.value.trim().substring(0, usernameMaximumLength)
        const errorMessage = validateToMessage(username, usernameValidations, 'edit')
        this.setState({usernameError: errorMessage})

        this.props.setUsername(username)
    }
    onChangePassword(event) {
        const password = event.target.value
        const repeatedPassword = this.state.repeatedPassword
        const passwordError = validateToMessage(password, limitedPasswordValidations, 'edit')
        const repeatedPasswordError = repeatedPassword && (repeatedPassword !== password) ? 'Beide wachtwoorden zijn niet aan elkaar gelijk' : ''
        this.setState({passwordError, repeatedPasswordError})

        this.props.setPassword(password)
    }
    onChangeRepeatedPassword(event) {
        const repeatedPassword = event.target.value
        const password = this.props.password
        const repeatedPasswordError = repeatedPassword && (repeatedPassword !== password) ? 'Beide wachtwoorden zijn niet aan elkaar gelijk' : ''
        this.setState({repeatedPassword, repeatedPasswordError})
    }
    onChangeEmailAddress(event) {
        const emailAddress = event.target.value
        const emailAddressError = emailAddress && !isValidEmailAddress(emailAddress) ? 'Dit emailadres is ongeldig' : ''
        this.setState({emailAddressError})
        this.props.setEmailAddress(emailAddress)
    }
    onChangeAcceptedTerms(event) {
        this.setState({acceptedTerms: event.target.checked})
    }

    onFocusChangePassword(hasFocus) {
        this.setState({passwordFocus: hasFocus})
    }




    catchEnterSubmit(e) {
        if (e.keyCode === 13 && e.shiftKey === false && this.state.filled) {
            this.signUp();
        }
    }

    toggleTermsDialog() {
        this.setState(({ isTermsOpened }) => ({ isTermsOpened: !isTermsOpened }));
    }

    togglePrivacyDialog() {
        this.setState(({ isPrivacyOpened }) => ({ isPrivacyOpened: !isPrivacyOpened }));
    }

    render() {
        const   {   username, password, emailAddress, error, waitingForServerResponse, 
                    changeForm,
                    classes
        } = this.props

        const {repeatedPassword, acceptedTerms, usernameError, passwordError, repeatedPasswordError, emailAddressError, passwordFocus} = this.state
        const isInCard = this.props.location.pathname.includes('workspace');

        const isReadyToSubmit = emailAddress && username && !usernameError && isValidPassword(password) && repeatedPassword === password && acceptedTerms

        const checkmark = <span className={classes.checkmark}>{String.fromCharCode(10004)}</span> 


        return (
            <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Schrijf je in</h1>
                    <div className={"signin-wrapper"}>
                        <p>Geef je emailadres op en kies een gebruikersnaam en wachtwoord</p>
                        <form
                            style={style}
                            onKeyDown={
                                event => this.catchEnterSubmit(event)
                            }
                        >
                            <div>
                                <TextField
                                    type="email"
                                    placeholder="Geef je emailadres op"
                                    fullWidth
                                    variant={"outlined"}
                                    style={style.input}
                                    value={emailAddress}
                                    onChange={this.onChangeEmailAddress}
                                    autoComplete='off'
                                    autoFocus
                                />
                            </div>
                            {emailAddress && emailAddressError && <p className={"error"}>{emailAddressError}</p>}
                            <div>
                                <TextField
                                    type="text"
                                    placeholder="Kies een gebruikersnaam"
                                    fullWidth
                                    variant={"outlined"}
                                    style={style.input}
                                    className={"code"}
                                    value={username}
                                    onChange={this.onChangeUsername}
                                    autoComplete='off'
                                />
                            </div>
                            {username && usernameError && <p className={"error"}>{usernameError}</p>}
                            <div>
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
                                    autoComplete="new-password"
                                />
                            </div>
                            {passwordFocus &&
                                <p>
                                    Het wachtwoord moet:<br />
                                    {containsLowerCaseLetterPattern.test(password) ? checkmark : '-'} een kleine letter bevatten<br />
                                    {containsUpperCaseLetterPattern.test(password) ? checkmark : '-'} een hoofdletter bevatten<br />
                                    {containsDecimalPattern.test(password) ? checkmark : '-'} een cijfer bevatten<br />
                                    {containsSpecialCharacterPattern.test(password) ? checkmark : '-'} een van de volgende tekens bevatten: <span className={classes.specialCharacters}>{allowedSpecialCharacters}</span><br />
                                    {password.length >= passwordMinimumLength ? checkmark : '-'} tenminste {passwordMinimumLength} karakters lang zijn<br />
                                    {passwordError && <span className={"error"}>{passwordError}</span>}
                                </p>
                            }
                            {!passwordFocus && password && !isValidPassword(password) && <p className={"error"}>Het wachtwoord is ongeldig</p>}

                            <div>
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
                            </div>
                            {repeatedPasswordError && <p className={"error"}>{repeatedPasswordError}</p>}


                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={acceptedTerms}
                                        onChange={this.onChangeAcceptedTerms}
                                        color="primary"
                                        value="accepted"
                                    />
                                }
                                label={[
                                    <span key="1">Ik ga akkoord met de </span>,
                                    // eslint-disable-next-line
                                    <a key="2" onClick={this.toggleTermsDialog}>Gebruiksvoorwaarden</a>,
                                    <span key="3"> en de </span>,
                                    // eslint-disable-next-line
                                    <a key="4" onClick={this.togglePrivacyDialog}>Privacyverklaring</a>
                                ]}
                            />

                            <ContentDialog
                              open={this.state.isTermsOpened}
                              onClose={this.toggleTermsDialog}
                              title="Gebruiksvoorwaarden"
                              content={<TermsText />}
                              maxWidth="lg"
                            />

                            <ContentDialog
                              open={this.state.isPrivacyOpened}
                              onClose={this.togglePrivacyDialog}
                              title="Privacyverklaring"
                              content={<PrivacyText />}
                              maxWidth="lg"
                            />

                            <Button
                                style={style.loginButton}
                                variant="contained"
                                color="primary"
                                disabled={ !isReadyToSubmit || waitingForServerResponse }
                                onClick={this.signUp}>
                                Maak het account
                            </Button>
                        </form>
                        {error && <p className={"error"}>{error}</p>}
                        <div style={style.links} className={"extra-info"}>
                            <div style={style.left}>
                                <Button
                                    style={style.extraButton}
                                    onClick={() => changeForm('signIn')}>
                                    Ga terug naar login
                                </Button>
                            </div>
                            <div style={style.left}>
                                <Button
                                    style={style.extraButton}
                                    onClick={() => changeForm('confirmSignUp')}>
                                    Bevestig je account
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm)));

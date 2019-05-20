import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {Button, CardMedia} from '@material-ui/core'
import {Auth} from 'aws-amplify';

import { getErrorMessage } from '../api/ErrorMessages';
import { getPlaygroundDetails } from "../components/Playground/PlaygroundReducer";
import TextField from "@material-ui/core/TextField/TextField";
import { openInformationDialog } from '../components/SimpleDialog/SimpleDialogActions';
import { style } from './AuthenticatorStyles';
import { bindMethods } from '../utils/Generics';
import { allVerificationCodeCharactersPattern, verificationCodeLength, isValidVerificationCode } from './AuthenticatorValidations';
import { clearVerificationCookies } from '../auth/VerificationLinkHandler';


const mapStateToProps = (state, ownProps) => ({
    playground: ownProps.match.params.initiativeId
      ? getPlaygroundDetails(state, ownProps.match.params.initiativeId)
      : null,
});

const mapDispatchToProps = (dispatch) => ({
    triggerCodeSentNotification: () => dispatch(openInformationDialog(
        'Code verstuurd', 
        'De verification code is naar jouw emailadres verstuurd.', 
        'OK', 
      )),
})

/**
 * This form allows an existing user to authenticate himself and thereby create a user session
 */
class ConfirmSignUpForm extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        bindMethods(['onChangeUsername', 'onChangeVerificationCode'], this)
        // this.checkContact = this.checkContact.bind(this);
    }

    componentDidMount() {
        this.props.setCta && this.props.setCta({
            ctaAction: () => this.props.changeForm('signUp'),
            ctaText: 'Maak een account',
            ctaDisabled: false,
        });
    }

    componentWillUnmount() {
        this.props.unsetCta && this.props.unsetCta();
    }

    confirmSignUp() {
        const {username, verificationCode} = this.props
        console.log('confirm sign up with ' + verificationCode);

        this.props.setWaitingForServerResponse()

        Auth.confirmSignUp(username, verificationCode)
            .then(() => this.confirmSuccess(username))
            .catch(error => {
                console.log('error in confirm signup: ', error)
                if (error.code === "NotAuthorizedException" && error.message === "User cannot be confirm. Current status is CONFIRMED")
                    this.confirmSuccess(username)
                else
                    this.handleError(error)
            })
    }

    resendCode() {
        const {username} = this.props
        console.log('resend code to ' + username);
        Auth.resendSignUp(username)
            .then(() => {
                this.props.triggerCodeSentNotification()
            })
            .catch(error => this.handleError(error));
    }

    confirmSuccess(username) {
        console.log('confirm sign up success with ' + username);
        clearVerificationCookies()
        this.props.setVerificationCode('')
        this.props.clearWaitingForServerResponse()
        this.props.changeForm('signIn')
    }

    handleError(error) {
        console.log('confirm sign up error', error);
        clearVerificationCookies()
        this.props.setError(getErrorMessage(error.code, error.message))
    }


    signIn() {
        const {username, password} = this.props;
        this.props.setWaitingForServerResponse()
        Auth.signIn(username, password)
            .then(user => {
                console.log('sign in success', user);
                this.props.setPassword('')                                    // clear password from memory
                this.props.setError('')
                this.props.clearWaitingForServerResponse()
        
                if (user.attributes.email_verified !== true) {
                    this.props.triggerEmailNotVerifiedError()
                    return
                }
                // There are other sign in challenges we don't cover here.
                // SMS_MFA, SOFTWARE_TOKEN_MFA, NEW_PASSWORD_REQUIRED, MFA_SETUP ...
                if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
                    this.props.changeForm('confirmSignIn', user);
                } else {
                    this.props.onSignInSuccess(user);
                }
            })
            .catch(error => {
                console.log('sign in error', error);
                this.props.setPassword('')                                    // clear password from memory

                if (error.code === 'UserNotConfirmedException') {
                    this.props.triggerUserNotConfirmedError(() => this.props.changeForm('SignUpConfirm'))
                    return
                }
                this.props.setError(getErrorMessage(error.code, error.message))
                this.props.clearWaitingForServerResponse()
            })
    }

    signInSuccess(user) {
        console.log('sign in success', user);
        this.props.setPassword('')                                    // clear password from memory
        this.props.setError('')
        this.props.clearWaitingForServerResponse()

        if (user.attributes.email_verified !== true) {
            this.props.triggerEmailNotVerifiedError()
            return
        }
        // There are other sign in challenges we don't cover here.
        // SMS_MFA, SOFTWARE_TOKEN_MFA, NEW_PASSWORD_REQUIRED, MFA_SETUP ...
        if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
            this.props.changeForm('confirmSignIn', user);
        } else {
            this.props.onSignInSuccess(user);
        }
    }

    signInError(err) {
        this.props.setPassword('')                                    // clear password from memory
        this.props.setError(getErrorMessage(err.code, err.message))
        this.props.clearWaitingForServerResponse()
    }


    onChangeUsername(event) {
        this.props.setUsername(event.target.value)
    }
    onChangeVerificationCode(event) {
        const verificationCode = event.target.value
        if (allVerificationCodeCharactersPattern.test(verificationCode) && verificationCode.length <= verificationCodeLength)
            this.props.setVerificationCode(verificationCode)
    }

    catchEnterSubmit(e){
        if(e.keyCode === 13 && e.shiftKey === false) {
            this.signIn();
        }
    }

    render() {
        const   {   username, verificationCode, error, waitingForServerResponse, 
                    changeForm
                } = this.props

        const isInCard = this.props.location.pathname.includes('workspace');

        const showSubmitButton = username && verificationCode && isValidVerificationCode(verificationCode)

        return (
            <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={"secure-app-container"} style={isInCard ? style.secureAppContainer : {}}>
                    {isInCard && (
                      <CardMedia
                        style={style.media}
                        image={require("../assets/img/backgrounds/login-bg.jpg")}
                        title={"Inloggen"}
                      />
                    )}
                    <h1 className={"grunge-title"}>Bevestig je account</h1>
                    <p>Geef de code uit de bevestigingsmail op</p>
                    <div className={"signin-wrapper"}>
                        <form
                            style={style}
                            onKeyDown={
                                event => this.catchEnterSubmit(event)
                            }
                        >
                            <TextField
                                // id="signInFormUsername"
                                type="text"
                                fullWidth
                                variant={"outlined"}
                                placeholder="Gebruikersnaam"
                                style={style.input}
                                value={username}
                                onChange={this.onChangeUsername}
                                autoFocus={!username}
                            />
                            <TextField
                                // id="signInFormPassword"
                                type="text"
                                fullWidth
                                variant={"outlined"}
                                placeholder="Code"
                                value={verificationCode}
                                onChange={this.onChangeVerificationCode}
                                style={style.input}
                                autoFocus={!!username}
                            />
                            <Button
                                style={style.loginButton}
                                onClick={this.signIn}
                                variant="contained"
                                color="primary"
                                className={"pagination-button-step"}
                                disabled={!showSubmitButton || waitingForServerResponse}
                            >
                                Bevestig
                            </Button>

                            <Button
                              variant="text"
                              style={{...style.loginButton, ...style.extraButton }}
                              onClick={() => changeForm('forgotPassword')}
                            >
                                Stuur code opnieuw
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
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmSignUpForm));
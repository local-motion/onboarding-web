import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, CardMedia} from '@material-ui/core'
import {Auth} from 'aws-amplify';

import { getErrorMessage } from '../api/ErrorMessages';
import TextField from "@material-ui/core/TextField/TextField";
import { style } from './AuthenticatorStyles';
import { bindMethods } from '../utils/Generics';
import { allVerificationCodeCharactersPattern, verificationCodeLength, isValidVerificationCode } from './AuthenticatorValidations';


/**
 * This form allows an existing user to authenticate himself and thereby create a user session
 */
class ConfirmSignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoSubmitTriggered: false,
        }
        bindMethods(['onChangeUsername', 'onChangeVerificationCode', 'confirmSignUp', 'resendCode'], this)
    }
    
    // componentDidUpdate() {
    //     console.log('update of componentDidMount, verificationLink, autoSubmitTriggered', this.props.verificationLink, this.state.autoSubmitTriggered)
    //     if (this.props.verificationLink  && !this.state.autoSubmitTriggered) {
    //         this.setState({autoSubmitTriggered: true})
    //         this.confirmSignUp()
    //     }
    // }

    componentDidMount() {
        this.props.setCta && this.props.setCta({
            ctaAction: () => this.props.changeForm('signUp'),
            ctaText: 'Maak een account',
            ctaDisabled: false,
        });

        console.log('update of componentDidMount, verificationLink, autoSubmitTriggered', this.props.verificationLink, this.state.autoSubmitTriggered)
        if (this.props.verificationLink  && !this.state.autoSubmitTriggered) {
            this.setState({autoSubmitTriggered: true})
            this.confirmSignUp()
        }
    }

    componentWillUnmount() {
        this.props.unsetCta && this.props.unsetCta();
    }

    confirmSignUp() {
        const {username, verificationCode} = this.props
        if (username && verificationCode) {
            console.log('submitting confirm sign up with ' + verificationCode);

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
    }

    resendCode() {
        const {username} = this.props
        if (!username)
            this.props.displayError('Vul je gebruikersnaam of emailadres in')
        else {
            console.log('resend code to ' + username);
            Auth.resendSignUp(username)
                .then(() => {
                    this.props.setVerificationCode('')
                    this.props.openInformationDialog('Code verstuurd', 'De verification code is naar jouw emailadres verstuurd.')
                })
                .catch(error => {
                    console.log('error in resend code: ', error)
                    if (error.message === "User is already confirmed.") {
                        this.props.clearWaitingForServerResponse()
                        this.props.setVerificationCode('')
                        this.props.openInformationDialog('Gebruiker is al bevestigd', 'Ga verder met inloggen', 'OK', () => this.props.changeForm('signIn'))
                    }
                    else
                        this.handleError(error)
                })
        }
    }

    confirmSuccess(username) {
        console.log('confirm sign up success with ' + username);
        this.props.clearInitiativeForVerification()
        this.props.setVerificationCode('')
        this.props.clearWaitingForServerResponse()
        this.props.changeForm(this.state.autoSubmitTriggered ? 'signUpSuccess' : 'signIn')
    }

    handleError(error) {
        console.log('confirm sign up error', error);
        this.props.clearWaitingForServerResponse()
        this.props.displayError(getErrorMessage(error.code, error.message))
    }

    onChangeUsername(event) {
        this.props.setUsername(event.target.value)
    }
    onChangeVerificationCode(event) {
        const verificationCode = event.target.value.trim()
        if (allVerificationCodeCharactersPattern.test(verificationCode) && verificationCode.length <= verificationCodeLength)
            this.props.setVerificationCode(verificationCode)
    }

    catchEnterSubmit(event, isReadyToSubmit){
        if(event.keyCode === 13 && event.shiftKey === false && isReadyToSubmit) {
            this.confirmSignUp();
        }
    }

    render() {
        const   { username, verificationCode, waitingForServerResponse, changeForm } = this.props
        const isInCard = this.props.location.pathname.includes('actie');

        const isReadyToSubmit = username && verificationCode && isValidVerificationCode(verificationCode) && !waitingForServerResponse

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
                                event => this.catchEnterSubmit(event, isReadyToSubmit)
                            }
                        >
                            <TextField
                                type="text"
                                fullWidth
                                variant={"outlined"}
                                placeholder="Gebruikersnaam of emailadres"
                                style={style.input}
                                value={username}
                                onChange={this.onChangeUsername}
                                autoFocus={!username}
                            />
                            <TextField
                                type="text"
                                fullWidth
                                variant={"outlined"}
                                placeholder="Code"
                                value={verificationCode}
                                onChange={this.onChangeVerificationCode}
                                style={style.input}
                                autoFocus={!!username}
                                autoComplete='off'
                                />
                            <Button
                                style={style.loginButton}
                                onClick={this.confirmSignUp}
                                variant="contained"
                                color="primary"
                                className={"pagination-button-step"}
                                disabled={!isReadyToSubmit}
                            >
                                Bevestig
                            </Button>

                            <Button
                              variant="text"
                              style={{...style.loginButton, ...style.extraButton }}
                              onClick={this.resendCode}
                            >
                                Stuur code opnieuw
                            </Button>
                            </form>

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

export default withRouter(ConfirmSignUpForm)
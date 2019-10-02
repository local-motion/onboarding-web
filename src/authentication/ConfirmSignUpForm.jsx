import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, CardMedia, withStyles} from '@material-ui/core'
import {Auth} from 'aws-amplify';
import { Link } from "react-router-dom";
import { styles } from './AuthenticatorStyles';
import { PadlockIcon } from './AuthenticatorStyles';

import { getErrorMessage } from '../api/ErrorMessages';
import TextField from "@material-ui/core/TextField/TextField";
import { bindMethods } from '../utils/Generics';
import { allVerificationCodeCharactersPattern, verificationCodeLength, isValidVerificationCode } from './AuthenticatorValidations';
import { logdebug, loginfo } from 'utils/Logging';


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
    
    componentDidMount() {
        // this.props.setCta && this.props.setCta({
        //     ctaAction: () => this.props.changeForm('signUp'),
        //     ctaText: 'Maak een account',
        //     ctaDisabled: false,
        // });
        this.props.unsetCta && this.props.unsetCta();

        logdebug('update of componentDidMount, verificationLink, autoSubmitTriggered', this.props.verificationLink, this.state.autoSubmitTriggered)
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
            logdebug('submitting confirm sign up with ' + verificationCode);

            this.props.setWaitingForServerResponse()

            Auth.confirmSignUp(username, verificationCode)
                .then(() => this.confirmSuccess(username))
                .catch(error => {
                    loginfo('error in confirm signup: ', error)
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
            logdebug('resend code to ' + username);
            Auth.resendSignUp(username)
                .then(() => {
                    this.props.setVerificationCode('')
                    this.props.openInformationDialog('Code verstuurd', 'De verificatiecode is naar jouw emailadres verstuurd.')
                })
                .catch(error => {
                    logdebug('error in resend code: ', error)
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
        logdebug('confirm sign up success with ' + username);
        this.props.clearInitiativeForVerification()
        this.props.setVerificationCode('')
        this.props.clearWaitingForServerResponse()
        this.props.changeForm(this.state.autoSubmitTriggered ? 'signUpSuccess' : 'signIn')
    }

    handleError(error) {
        loginfo('confirm sign up error', error);
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
        const   { username, verificationCode, waitingForServerResponse, changeForm, isInCard, classes } = this.props

        const isReadyToSubmit = username && verificationCode && isValidVerificationCode(verificationCode) && !waitingForServerResponse

        return (

            <div>
                {isInCard || <div className={"secure-app-background"}></div>}
                {isInCard && (
                      <CardMedia
                        className={classes.media}
                        image={require("../assets/img/backgrounds/login-bg.jpg")}
                        title={"Account bevestigen"}
                      />
                    )}
                <div className={classes.secureAppContainer}>

                    <div className={classes.settingsTitle}>
                        <PadlockIcon className={classes.settingsIcon}/>
                        Bevestig je account
                    </div>
                    <p>Geef de code uit de bevestigingsmail op</p>

                    <TextField
                        variant="outlined"
                        className={classes.input}
                        label="Gebruikersnaam of emailadres"
                        type="text"
                        name="username"          // Setting the name property triggers the autocomplete in Chrome
                        value={username}
                        onChange={this.onChangeUsername}
                        autoFocus={!username}
                        autoComplete="username"
                        onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                    />

                    <TextField
                        variant="outlined"
                        className={classes.input}
                        label="Code"
                        type="text"
                        value={verificationCode}
                        onChange={this.onChangeVerificationCode}
                        onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                        autoFocus={!!username}
                        autoComplete='off'
                    />

                    <div className={classes.actions}>
                        <Button
                        variant="contained"
                        className={`${classes.button} ${classes.saveButton}`}
                        classes={{ disabled: classes.disabled }}
                        disabled={ !isReadyToSubmit }
                        onClick={this.confirmSignUp}
                        >
                            Bevestig
                        </Button>
                    </div>


                    <div className={classes.links}>
                        <Link 
                            to=""
                            className={classes.link}
                            onClick={event => {
                                event.preventDefault()
                                changeForm('resendCode')
                            }}
                            >
                            Stuur code opnieuw
                        </Link>
                    </div>

                    <div className={classes.links}>
                        <Link 
                            to=""
                            className={classes.link}
                            onClick={event => {
                                event.preventDefault()
                                changeForm('signIn')
                            }}
                        >
                            Ga terug naar login
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(ConfirmSignUpForm))
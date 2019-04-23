import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, Input, Typography} from '@material-ui/core'
import {Auth, JS, Logger} from 'aws-amplify';
import querySearch from "stringquery";
import { getErrorMessage } from '../api/ErrorMessages';
import { readCookie, eraseCookie, createCookie } from '../utils/CookieUtils';
import { getUser } from '../components/UserProfile/UserProfileReducer';
import { connect } from 'react-redux'
import { openConfirmationDialog } from '../components/ConfirmationDialog/ConfirmationDialogActions';

const logger = new Logger('JSignIn');

const mapStateToProps = state => ({
    authenticatedUser: getUser(state)
})

const mapDispatchToProps = dispatch => ({
    openAlreadyLoggedInDialog:    () => dispatch(openConfirmationDialog(
                        'U bent reeds ingelogd', 
                        'Als u met een andere gebruikersnaam wilt inloggen log dan eerst uit en klikt dan nogmaals op de verificatielink',
                        )),
})

// Cookies
const VERIFICATION_USERNAME_COOKIE = 'verificationUsername'
const VERIFICATION_INITIATIVE_COOKIE = 'verificationInitiative'
const VERIFICATION_TYPE_COOKIE = 'verificationTtype'
const VERIFICATION_TYPE_SIGNUP = 'signup'
const VERIFICATION_TYPE_RESET_PASSWORD = 'reset_password'

export const setSignupConfirmCookies = (username, initiativeId) => {
    createCookie(VERIFICATION_USERNAME_COOKIE, username, 2)
    createCookie(VERIFICATION_TYPE_COOKIE, VERIFICATION_TYPE_SIGNUP, 2)
    if (initiativeId)
        createCookie(VERIFICATION_INITIATIVE_COOKIE, initiativeId, 2)
}

export const setPasswordResetCookies = (username, initiativeId) => {
    createCookie(VERIFICATION_USERNAME_COOKIE, username, 2)
    createCookie(VERIFICATION_TYPE_COOKIE, VERIFICATION_TYPE_RESET_PASSWORD, 2)
    if (initiativeId)
        createCookie(VERIFICATION_INITIATIVE_COOKIE, initiativeId, 2)
}

export const clearVerificationCookies = () => {
    eraseCookie(VERIFICATION_USERNAME_COOKIE)
    eraseCookie(VERIFICATION_TYPE_COOKIE)
    eraseCookie(VERIFICATION_INITIATIVE_COOKIE)
}

/**
 * This class handles a verfication url that is clicked by the user in a verification mail.
 * It checks whether the user is logged in and otherwise change the state to show a login dialog.
 * When the user is authenticated the verification type (confirm_signup or password_reset) is read from a cookie 
 * and the appropriate verification action is executed. When no cookie is present the user is prompted to
 * specify the type.
 */
class VerificationLinkHandler extends Component {
    constructor(props) {
        super(props);
        this.checkContact = this.checkContact.bind(this);
        this.changeState = this.changeState.bind(this);
        this.inputs = {};
        this.state = {error: '', signInPage: true}
    }

    changeState(state, data) {
        const {onStateChange} = this.props;
        if (onStateChange) {
            onStateChange(state, data);
        }
    }

    componentDidUpdate() {
        const isInCard = !!this.props.match.params.initiativeId;
        const verificationCode = this.props.match.params.verificationCode;
        const username = readCookie(VERIFICATION_USERNAME_COOKIE)
        const verificationType = readCookie(VERIFICATION_TYPE_COOKIE)
        const {authState, authData, authenticatedUser, openAlreadyLoggedInDialog} = this.props;

        if (!verificationCode || !authState === 'signIn' /* note that signIn is the default state */ ) {
            return
        }

        if (authenticatedUser) {
            this.props.history.push('/');
            this.props.openAlreadyLoggedInDialog();
        }

        if (username && verificationType === VERIFICATION_TYPE_SIGNUP) {
            const initiativeId = readCookie(VERIFICATION_INITIATIVE_COOKIE)
            if (initiativeId) {
                // Let the VerificationLinkHandler within the particular workspace handle this
                this.props.history.push('/workspace/' + initiativeId + '/verify/' + verificationCode)
            }
            else {
                this.gotoConfirmSignUp(username, verificationCode)
            }
        }
        
    }


    gotoConfirmSignUp(username, verificationCode) {
        console.log('verification link handler directing to confirm signup')
        this.changeState('confirmSignUp:' + verificationCode, username);
    }

    gotoPasswordReset(username, verificationCode) {
        console.log('verification link handler directing to password reset')
        this.changeState('forgotPassword:' + verificationCode, username);
    }

    signInError(err) {
        logger.info('sign in error', err);
        /*
          err can be in different structure:
            1) plain text message;
            2) object { code: ..., message: ..., name: ... }
        */
        this.setState({error: getErrorMessage(err.code, err.message)})
    }

    checkContact(user) {
        Auth.verifiedContact(user)
            .then(data => {
                if (!JS.isEmpty(data.verified)) {
                    this.changeState('signedIn', user);
                    this.props.onSignIn(user);
                    this.goToTargetUrl();
                } else {
                    user = Object.assign(user, data);
                    this.changeState('verifyContact', user);
                }
            });
    }

    catchEnterSubmit(e){
        if(e.keyCode === 13 && e.shiftKey === false) {
            this.signIn();
        }
    }


    render() {
        const isInCard = !!this.props.match.params.initiativeId;
        const verificationCode = this.props.match.params.verificationCode;
        const username = readCookie(VERIFICATION_USERNAME_COOKIE)
        const verificationType = readCookie(VERIFICATION_TYPE_COOKIE)
        const {authState, authData, authenticatedUser, openAlreadyLoggedInDialog} = this.props;

        if (!verificationCode || !authState === 'signIn' /* note that signIn is the default state */ ) {
            return null;
        }

        if (authenticatedUser) {
            this.props.history.push('/');
            openAlreadyLoggedInDialog();
        }

        // if (username && verificationType === VERIFICATION_TYPE_SIGNUP)
        //     this.gotoConfirmSignUp(username, verificationCode)

        
        const style = {
            width: '20rem',
            input: {borderRadius: '0', display: 'block'},
            links: {fontSize: '0.9em', minHeight: "25px"},
            button: {width: '100%', marginBottom: "15px"},
            extraButton: {border: "0", marginBottom: "15px", marginRight: "15px", cursor: "pointer"},
            left: {float: "left"},
            alert: {fontSize: '0.8em'}
        };

        const {error} = this.state;

        return (
            <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Rookvrije Generatie</h1>
                    <div className={"signin-wrapper"}>
                        <form
                            style={style}
                            onKeyDown={
                                event => this.catchEnterSubmit(event)
                            }
                        >
                            <Typography>Uw verificatiecode is {verificationCode}, wat wilt u hiermee doen?</Typography>
                            {/* <Input
                                id="SigninFormUserName"
                                type="text"
                                placeholder="Verificatiecode"
                                style={style.input}
                                defaultValue={verificationCode}
                                onChange={event => this.inputs.username = event.target.value}
                                autoFocus
                            /> */}
                            <span>
                            <Button
                                style={style.button}
                                onClick={() => this.gotoConfirmSignUp(username, verificationCode)}
                            >
                                Emailadres bevestigen
                            </Button>
                            <Button
                                style={style.button}
                                onClick={this.signIn}
                            >
                                Wachtwoord resetten
                            </Button>
                            </span>
                        </form>
                        {error && <p className={"error"}>{error}</p>}

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerificationLinkHandler))
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, Typography} from '@material-ui/core'
import { readCookie, eraseCookie, createCookie } from '../utils/CookieUtils';
import { getUser } from '../components/UserProfile/UserProfileReducer';
import { connect } from 'react-redux'
import queryString from 'query-string';
import { openErrorDialog } from '../components/SimpleDialog/SimpleDialogActions';

const mapStateToProps = state => ({
    authenticatedUser: getUser(state)
})

const mapDispatchToProps = dispatch => ({
    openAlreadyLoggedInDialog:    () => dispatch(openErrorDialog(
                        'Je bent reeds ingelogd', 
                        'Als je met een andere gebruikersnaam wilt inloggen log dan eerst uit en klik dan nogmaals op de verificatielink',
                        )),
})

// Cookies
const VERIFICATION_INITIATIVE_COOKIE = 'verificationInitiative'
const VERIFICATION_TYPE_SIGNUP = 'signup'
const VERIFICATION_TYPE_RESET_PASSWORD = 'reset_password'

export const setSignupConfirmCookies = (initiativeId) => {
    createCookie(VERIFICATION_INITIATIVE_COOKIE, initiativeId, 2)
}

export const setPasswordResetCookies = (initiativeId) => {
    createCookie(VERIFICATION_INITIATIVE_COOKIE, initiativeId, 2)
}

export const clearVerificationCookies = () => {
    eraseCookie(VERIFICATION_INITIATIVE_COOKIE)
}


/**
 * This class handles a verification url that is clicked by the user in a verification mail.
 * It checks whether the user is logged in and if so prompts the user to signout and then re-click the link in the mail.
 * If an active initiave is found in the designated cookie to flow is directed to a verificationl link handler within the
 * workspace of that initiative.
 * Based on the verfication type in the url the flow is either directed to the signup confirmation or the password reset.
 */
class VerificationLinkHandler extends Component {
    constructor(props) {
        super(props);
        this.changeState = this.changeState.bind(this);
        this.gotoLogin = this.gotoLogin.bind(this);
        this.inputs = {};
        this.state = {error: '', complete: false}
    }

    changeState(state, data) {
        const {onStateChange} = this.props;
        if (onStateChange) {
            onStateChange(state, data);
        }
    }

    componentDidUpdate() {
        const isInCard = !!this.props.match.params.initiativeId;
        const params = queryString.parse(this.props.location.search)
        const verificationType = params.type
        const username = params.user
        const verificationCode = params.code
        const initiativeId = readCookie(VERIFICATION_INITIATIVE_COOKIE)

        console.log('props: ', this.props)
        console.log('parsed (type, name, code): ', verificationType, username, verificationCode)

        const {authState, authData, authenticatedUser, openAlreadyLoggedInDialog} = this.props


        if (authState === 'complete' && verificationType === VERIFICATION_TYPE_RESET_PASSWORD) {
            this.setState({complete: true})
            this.changeState('signIn', authData)
            return
        }

        if (this.state.complete || !verificationCode || !username || !verificationType || authState !== 'signIn' /* note that signIn is the default state */ ) {
            return
        }

        if (authenticatedUser) {
            this.props.history.push('/');
            openAlreadyLoggedInDialog();
        }

        if (!isInCard && initiativeId) {
            // Let the VerificationLinkHandler within the particular workspace handle this
            console.log('redirecting from verification link handler to workspace ' + initiativeId)
            this.props.history.push(`/workspace/${initiativeId}/login?type=${verificationType}&user=${username}&code=${verificationCode}&target=/workspace/${initiativeId}/join`)
            return
        }

        console.log('verification type: ' + verificationType)
        if (verificationType === VERIFICATION_TYPE_SIGNUP)
            this.gotoConfirmSignUp(username, verificationCode)
        else if (verificationType === VERIFICATION_TYPE_RESET_PASSWORD)
            this.gotoPasswordReset(username, verificationCode)
        
    }


    gotoConfirmSignUp(username, verificationCode) {
        console.log('verification link handler directing to confirm signup')
        this.changeState('confirmSignUp:' + verificationCode, username);
    }

    gotoPasswordReset(username, verificationCode) {
        console.log('verification link handler directing to password reset')
        this.changeState('forgotPasswordReset:' + verificationCode, username);
    }

    gotoLogin() {
        console.log('verification link handler directing to login')
        this.setState({complete: true})
        this.changeState('signIn', this.props.authData)   
    }

    render() {
        const isInCard = !!this.props.match.params.initiativeId;
        const {authState} = this.props;

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

        if (authState === 'complete') {

            return (
                <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                    {isInCard || <div className={"secure-app-background"}></div>}
                    <div className={"secure-app-container"}>
                        <h1 className={"grunge-title"}>Rookvrije Generatie</h1>
                        <div className={"signin-wrapper"}>
                            <form
                                style={style}
                            >
                                <Typography>Je email adres is gevalideerd!</Typography>
                                <span>
                                <Button
                                    style={style.button}
                                    onClick={() => this.gotoLogin()}
                                >
                                    Ga verder met inloggen
                                </Button>
                                </span>
                            </form>
                            {error && <p className={"error"}>{error}</p>}

                        </div>
                    </div>
                </div>
            )
        }

        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerificationLinkHandler))
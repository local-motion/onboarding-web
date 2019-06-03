import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import querySearch from "stringquery";

import { getPlaygroundDetails } from "../components/Playground/PlaygroundReducer";
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { getActivePhaseUrl } from '../misc/WorkspaceHelpers';
import { bindMethods, copyProperties } from '../utils/Generics';
import ConfirmSignUpForm from './ConfirmSignUpForm';
import { openInformationDialog, openErrorDialog } from '../components/SimpleDialog/SimpleDialogActions';
import ForgotPasswordForm from './ForgotPasswordForm';
import PasswordResetForm from './PasswordResetForm';
import { readCookie, eraseCookie, createCookie } from '../utils/CookieUtils';
import queryString from 'query-string';
import SignUpSuccessForm from './SignUpSuccessForm';


const mapStateToProps = (state, ownProps) => ({
    playground: ownProps.match.params.initiativeId
      ? getPlaygroundDetails(state, ownProps.match.params.initiativeId)
      : null,
});

const mapDispatchToProps = (dispatch) => ({
    openInformationDialog:  (title, message, buttonMessage, onClose) => dispatch(openInformationDialog(title, message, buttonMessage, onClose && (dispatch => onClose(dispatch)))),
    openErrorDialog:        (title, message, buttonMessage, onClose) => dispatch(openErrorDialog(title, message, buttonMessage, onClose && (dispatch => onClose(dispatch)))),
})

// Cookies
const VERIFICATION_INITIATIVE_COOKIE = 'verificationInitiative'
const VERIFICATION_TYPE_SIGNUP = 'signup'
const VERIFICATION_TYPE_RESET_PASSWORD = 'reset_password'

export const storeInitiativeForVerification = (initiativeId) => {
    createCookie(VERIFICATION_INITIATIVE_COOKIE, initiativeId, 2)
}

export const clearVerificationCookies = () => {
    eraseCookie(VERIFICATION_INITIATIVE_COOKIE)
}


/**
 * This component supports all actions relevant for user authentication through the invocation of relevant forms
 */
class Authenticator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: 'signIn',
            username: '',
            password: '',
            confirmPassword: '',
            emailAddress: '',
            verificationCode: '',
            verificationLink: false,
            waitingForServerResponse: false
        }

        bindMethods(['changeForm', 'setUsername', 'setPassword', 'setEmailAddress', 'setVerificationCode', 'onSignInSuccess', 'displayError',
                     'setWaitingForServerResponse', 'clearWaitingForServerResponse'], this)

        const isInCard = !!this.props.match.params.initiativeId;
        const params = queryString.parse(this.props.location.search)
        const verificationType = params.type
        const username = params.user
        const verificationCode = params.code
        const initiativeId = readCookie(VERIFICATION_INITIATIVE_COOKIE)
        const {authenticatedUser, openAlreadyLoggedInDialog} = this.props                     

        console.log('constructing authenticator: type, username, code:', verificationType, username, verificationCode)

        if (username && verificationCode && verificationType && (verificationType === VERIFICATION_TYPE_SIGNUP || verificationType === VERIFICATION_TYPE_RESET_PASSWORD)) {
            if (authenticatedUser) {
                this.props.history.push('/');
                openAlreadyLoggedInDialog();
            }
            else if (!isInCard && initiativeId) {
                // Let the VerificationLinkHandler within the particular workspace handle this
                console.log('redirecting from verification link handler to workspace ' + initiativeId)
                this.props.history.push(`/workspace/${initiativeId}/login?type=${verificationType}&user=${username}&code=${verificationCode}&target=/workspace/${initiativeId}/join`)
                return
            }
            else {
                this.state.username = username
                this.state.verificationCode = verificationCode
                this.state.verificationLink = true
                this.state.form = verificationType === VERIFICATION_TYPE_SIGNUP ? 'confirmSignUp' : 'passwordReset'
            }
        }

    }

    componentDidMount() {
        this.props.setCta && this.props.setCta({
            ctaAction: () => this.changeForm('signUp'),
            ctaText: 'Maak een account',
            ctaDisabled: false,
        });
    }

    componentWillUnmount() {
        this.props.unsetCta && this.props.unsetCta();
    }

    changeForm(newForm) {   

        console.log('changing form to ', newForm)

        if (newForm === 'signUp' || newForm === 'forgotPassword')
            this.setPassword('')
        if (newForm === 'signUp')
            this.setUsername('')
        if (newForm === 'signUp')
            this.setEmailAddress('')
        this.setState({form: newForm, verificationLink: false})                          
    }

    displayError(message) {
        this.props.openErrorDialog('Er is iets fout gegaan', message, 'OK')
    }


    setUsername(username)                   {   this.setState({username})                               }
    setPassword(password)                   {   this.setState({password})                               }
    setEmailAddress(emailAddress)           {   this.setState({emailAddress})                           }
    setVerificationCode(verificationCode)   {   this.setState({verificationCode})                       }
    setWaitingForServerResponse()           {   this.setState({waitingForServerResponse: true})         }
    clearWaitingForServerResponse()         {   this.setState({waitingForServerResponse: false})        }

    onSignInSuccess(user) {
        this.props.onSignIn(user)
        const { location: { search, pathname }, playground } = this.props;
        const parsedSearch = querySearch(search);
        const url = parsedSearch["target"]
          || (
            playground
              ? getActivePhaseUrl(playground)
              : pathname.replace('/login', '')
          );

          this.changeForm('signedIn');
          this.props.history.push(url);
    }

    render() {
        // const isInCard = this.props.location.pathname.includes('workspace');

        let formProps = copyProperties(this.state, {},    [ 'username', 'password', 'emailAddress', 'verificationCode', 'verificationLink', 'waitingForServerResponse' ])
        formProps = copyProperties(this, formProps,       [ 'setUsername', 'setPassword', 'setEmailAddress', 'setVerificationCode', 'displayError', 
                                                            'setWaitingForServerResponse', 'clearWaitingForServerResponse', 'changeForm'])
        formProps = copyProperties(this.props, formProps, [ 'openInformationDialog', 'openErrorDialog'])
        formProps.clearVerificationCookies = clearVerificationCookies
        formProps.storeInitiativeForVerification = storeInitiativeForVerification

        switch(this.state.form) {
            case 'signIn':
                return <SignInForm {...formProps} onSignInSuccess={this.onSignInSuccess}/>
            case 'signUp':
                return <SignUpForm {...formProps}/>
            case 'confirmSignUp':
                return <ConfirmSignUpForm {...formProps}/>
            case 'signUpSuccess':
                return <SignUpSuccessForm {...formProps}/>
            case 'forgotPassword':
                return <ForgotPasswordForm {...formProps}/>
            case 'passwordReset':
                return <PasswordResetForm {...formProps}/>
            default:
                return <div>Invalid form state: {this.state.form}</div> 
        }
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authenticator));
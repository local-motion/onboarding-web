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


const mapStateToProps = (state, ownProps) => ({
    playground: ownProps.match.params.initiativeId
      ? getPlaygroundDetails(state, ownProps.match.params.initiativeId)
      : null,
});

const mapDispatchToProps = (dispatch) => ({
    openInformationDialog:  (title, message, buttonMessage, onClose) => dispatch(openInformationDialog(title, message, buttonMessage, onClose && (dispatch => onClose(dispatch)))),
    openErrorDialog:        (title, message, buttonMessage, onClose) => dispatch(openErrorDialog(title, message, buttonMessage, onClose && (dispatch => onClose(dispatch)))),
})

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
            waitingForServerResponse: false
        }

        bindMethods(['changeForm', 'setUsername', 'setPassword', 'setEmailAddress', 'setVerificationCode', 'onSignInSuccess', 'displayError',
                     'setWaitingForServerResponse', 'clearWaitingForServerResponse'], this)
    }

    componentDidMount() {
        this.props.setCta && this.props.setCta({
            ctaAction: () => this.changeState('signUp'),
            ctaText: 'Maak een account',
            ctaDisabled: false,
        });
    }

    componentWillUnmount() {
        this.props.unsetCta && this.props.unsetCta();
    }

    changeForm(newForm) {   
        if (newForm === 'signUp' || newForm === 'forgotPassword')
            this.setPassword('')
        if (newForm === 'signUp')
            this.setUsername('')
        if (newForm === 'signUp')
            this.setEmailAddress('')
        this.setState({form: newForm})                          
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

        let formProps = copyProperties(this.state, {},    [ 'username', 'password', 'emailAddress', 'verificationCode', 'waitingForServerResponse' ])
        formProps = copyProperties(this, formProps,       [ 'setUsername', 'setPassword', 'setEmailAddress', 'setVerificationCode', 'displayError', 
                                                            'setWaitingForServerResponse', 'clearWaitingForServerResponse', 'changeForm'])
        formProps = copyProperties(this.props, formProps, [ 'openInformationDialog', 'openErrorDialog'])

        switch(this.state.form) {
            case 'signIn':
                return <SignInForm {...formProps} onSignInSuccess={this.onSignInSuccess}/>
            case 'signUp':
                return <SignUpForm {...formProps}/>
            case 'confirmSignUp':
                return <ConfirmSignUpForm {...formProps}/>
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
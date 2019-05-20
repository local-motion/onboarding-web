import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import querySearch from "stringquery";

import { getPlaygroundDetails } from "../components/Playground/PlaygroundReducer";
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { getActivePhaseUrl } from '../misc/WorkspaceHelpers';
import { bindMethods } from '../utils/Generics';
import ConfirmSignUpForm from './ConfirmSignUpForm';


const mapStateToProps = (state, ownProps) => ({
    playground: ownProps.match.params.initiativeId
      ? getPlaygroundDetails(state, ownProps.match.params.initiativeId)
      : null,
});

const mapDispatchToProps = (dispatch) => ({
})

/**
 * 
 * 
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
            error: '', 
            signInPage: true, 
            waitingForServerResponse: false
        }

        bindMethods(['changeForm', 'setUsername', 'setPassword', 'setEmailAddress', 'setVerificationCode', 'onSignInSuccess', 'setError',
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
        if (newForm === 'signUp')
            this.setPassword('')
        this.setState({form: newForm})                          
    }

    setUsername(username)                   {   this.setState({username})                               }
    setPassword(password)                   {   this.setState({password})                               }
    setEmailAddress(emailAddress)           {   this.setState({emailAddress})                           }
    setVerificationCode(verificationCode)   {   this.setState({verificationCode})                       }
    setError(error)                         {   this.setState({error})                                  }
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

        const formProps = {
            username: this.state.username, 
            password: this.state.password, 
            emailAddress: this.state.emailAddress, 
            verificationCode: this.state.verificationCode, 
            error: this.state.error, 
            waitingForServerResponse: this.state.waitingForServerResponse,

            setUsername: this.setUsername, 
            setPassword: this.setPassword, 
            setEmailAddress: this.setEmailAddress, 
            setVerificationCode: this.setVerificationCode, 
            setError: this.setError, 
            setWaitingForServerResponse: this.setWaitingForServerResponse,
            clearWaitingForServerResponse: this.clearWaitingForServerResponse,
            changeForm: this.changeForm
        }

        switch(this.state.form) {
            case 'signIn':
                return <SignInForm {...formProps} onSignInSuccess={this.onSignInSuccess}/>
            case 'signUp':
                return <SignUpForm {...formProps}/>
            case 'confirmSignUp':
                return <ConfirmSignUpForm {...formProps}/>
            default:
                return <div>Invalid form state: {this.state.form}</div> 
        }
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authenticator));
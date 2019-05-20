import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {Button, CardMedia} from '@material-ui/core'
import {Auth} from 'aws-amplify';

import { getErrorMessage } from '../api/ErrorMessages';
import { getPlaygroundDetails } from "../components/Playground/PlaygroundReducer";
import TextField from "@material-ui/core/TextField/TextField";
import { signOutUser } from '../components/UserProfile/UserProfileActions';
import { openErrorDialog } from '../components/SimpleDialog/SimpleDialogActions';
import { style } from './AuthenticatorStyles';
import { bindMethods } from '../utils/Generics';


const mapStateToProps = (state, ownProps) => ({
    playground: ownProps.match.params.initiativeId
      ? getPlaygroundDetails(state, ownProps.match.params.initiativeId)
      : null,
});

const mapDispatchToProps = (dispatch) => ({
    triggerEmailNotVerifiedError: () => dispatch(openErrorDialog(
        'Emailadres niet gevalideerd', 
        'Je emailadres is niet langer gevalideerd. Neem contact op met de beheerder (zie contact link onderaan het scherm)', 
        'OK', 
        () => dispatch(signOutUser())
      )),
    triggerUserNotConfirmedError: callback => dispatch(openErrorDialog(
        'Emailadres niet gevalideerd', 
        'Je emailadres is nog niet gevalideerd. Check je inbox of vraag een nieuwe code aan', 
        'OK', 
        () => callback())
      ),
})

/**
 * This form allows an existing user to authenticate himself and thereby create a user session
 */
class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        bindMethods(['onChangeUsername', 'onChangePassword'], this)
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


    // checkContact(user) {
    //     this.setState({waitingForServerResponse: true})
    //     Auth.verifiedContact(user)
    //         .then(data => {
    //             this.setState({waitingForServerResponse: false})
    //             if (!JS.isEmpty(data.verified)) {
    //                 this.changeForm('signedIn', user);
    //                 this.props.onSignIn(user);
    //                 this.goToTargetUrl();
    //             } else {
    //                 user = Object.assign(user, data);
    //                 this.changeForm('verifyContact', user);
    //             }
    //         });
    // }

    onChangeUsername(event) {
        this.props.setUsername(event.target.value)
    }
    onChangePassword(event) {
        this.props.setPassword(event.target.value)
    }

    catchEnterSubmit(e){
        if(e.keyCode === 13 && e.shiftKey === false) {
            this.signIn();
        }
    }

    render() {
        const   {   username, password, error, waitingForServerResponse, 
                    changeForm
                } = this.props

        const isInCard = this.props.location.pathname.includes('workspace');

        // To allow for the browser to auto-populate the username and password field, which we cannot detect the submit button is shown when both
        // fields are populated, but also when a field is not present yet.
        const showSubmitButton =    !document.getElementById('signInFormUsername') || !document.getElementById('signInFormPassword') ||
                                    (document.getElementById('signInFormUsername').value && document.getElementById('signInFormPassword').value)

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
                    <h1 className={"grunge-title"}>Inloggen</h1>
                    <p>Geef je gebruikersnaam en wachtwoord op</p>
                    <div className={"signin-wrapper"}>
                        <form
                            style={style}
                            onKeyDown={
                                event => this.catchEnterSubmit(event)
                            }
                        >
                            <TextField
                                id="signInFormUsername"
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
                                id="signInFormPassword"
                                type="password"
                                fullWidth
                                variant={"outlined"}
                                placeholder="Wachtwoord"
                                value={password}
                                onChange={this.onChangePassword}
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
                                Inloggen
                            </Button>

                            <Button
                              variant="text"
                              style={{...style.loginButton, ...style.extraButton }}
                              onClick={() => changeForm('forgotPassword')}
                            >
                                Wachtwoord vergeten?
                            </Button>
                        {error && <p className={"error"}>{error}</p>}
                            <div style={style.createAccountTitle}>Ben je hier voor de eerste keer?</div>
                            <div>Je hoeft je slechts éénmalig te registreren om deel te nemen aan een actie. Na het registeren kun je meteen starten om de speeltuin rookvrij te maken.</div>

                            <Button
                                style={style.signUpButton}
                                onClick={() => changeForm('signUp')}
                                variant="contained"
                                className={"pagination-button-step"}
                            >
                                Maak een account
                            </Button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInForm));
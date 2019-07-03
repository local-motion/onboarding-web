import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {Button, CardMedia, withStyles} from '@material-ui/core'
import {Auth} from 'aws-amplify';
import { Link } from "react-router-dom";

import { getErrorMessage } from '../api/ErrorMessages';
import { getPlaygroundDetails } from "../components/Playground/PlaygroundReducer";
import TextField from "@material-ui/core/TextField/TextField";
import { signOutUser } from '../components/UserProfile/UserProfileActions';
import { bindMethods } from '../utils/Generics';
import { styles } from './AuthenticatorStyles';
import { PadlockIcon } from './AuthenticatorStyles';


const mapStateToProps = (state, ownProps) => ({
    playground: ownProps.match.params.initiativeId
      ? getPlaygroundDetails(state, ownProps.match.params.initiativeId)
      : null,
});

const mapDispatchToProps = (dispatch) => ({
})


/**
 * This form allows an existing user to authenticate himself and thereby create a user session
 */
class SignInForm extends Component {
    constructor(props) {
        super(props);
        bindMethods(['signIn', 'onChangeUsername', 'onChangePassword'], this)
        // this.checkContact = this.checkContact.bind(this);
        this.state = {
            onChangeTriggered: false
        }
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
        if (username && password) {
            this.props.setWaitingForServerResponse()
            Auth.signIn(username, password)
                .then(user => {
                    console.log('sign in success', user);
                    this.props.setPassword('')                                    // clear password from memory
                    this.props.clearWaitingForServerResponse()
            
                    if (user.attributes.email_verified !== true) {

                        this.props.openErrorDialog(
                            'Emailadres niet gevalideerd', 
                            'Je emailadres is niet langer gevalideerd. Neem contact op met de beheerder (zie contact link onderaan het scherm)', 
                            'OK', 
                            dispatch => dispatch(signOutUser())
                        )
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
                    this.props.clearWaitingForServerResponse()

                    if (error.code === 'UserNotConfirmedException') {
                        this.props.openErrorDialog(
                            'Emailadres niet gevalideerd', 
                            'Je emailadres is nog niet gevalideerd. Check je inbox of vraag een nieuwe code aan', 
                            'OK', 
                            () => this.props.changeForm('confirmSignUp')
                        )
                        return
                    }
                    this.props.displayError(getErrorMessage(error.code, error.message))
                })
        }
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
        this.setState({onChangeTriggered:true})
        this.props.setUsername(event.target.value)
    }
    onChangePassword(event) {
        this.setState({onChangeTriggered:true})
        this.props.setPassword(event.target.value)
    }

    catchEnterSubmit(event, isReadyToSubmit){
        if (event.keyCode === 13 && event.shiftKey === false && isReadyToSubmit) {
            this.signIn();
        }
    }

    render() {
        const   {   username, password, waitingForServerResponse, changeForm, isInCard, classes } = this.props

        // To allow for the browser to auto-populate the username and password field, which we cannot detect, the submit button is shown when both
        // fields are populated, but also when a field is not present yet and also when no onChange event has occurred yet.
        const isReadyToSubmit =    !waitingForServerResponse &&
                                    (   
                                        !this.state.onChangeTriggered ||
                                        !document.getElementById('signInFormUsername') || !document.getElementById('signInFormPassword') ||
                                        (document.getElementById('signInFormUsername').value && document.getElementById('signInFormPassword').value)
                                    )

        return (
            <div>
                {isInCard || <div className={"secure-app-background"}></div>}
                {isInCard && (
                      <CardMedia
                        className={classes.media}
                        image={require("../assets/img/backgrounds/login-bg.jpg")}
                        title={"Inloggen"}
                      />
                    )}
                <div className={classes.secureAppContainer}>

                    <div className={classes.settingsTitle}>
                        <PadlockIcon className={classes.settingsIcon}/>
                        Inloggen
                    </div>
                    <p>Geef je gebruikersnaam en wachtwoord op</p>

                    <TextField
                        variant="outlined"
                        className={classes.input}
                        label="Gebruikersnaam"
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
                        name="password"          // Setting the name property triggers the autocomplete in Chrome
                        label="Wachtwoord"
                        type="password"
                        value={password}
                        onChange={this.onChangePassword}
                        onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                        autoFocus={!!username}
                    />

                    <div className={classes.actions}>
                        <Button
                        variant="contained"
                        className={`${classes.button} ${classes.saveButton}`}
                        classes={{ disabled: classes.disabled }}
                        disabled={ !isReadyToSubmit }
                        onClick={this.signIn}
                        >
                            Inloggen
                        </Button>
                    </div>

                    <div className={classes.links}>
                        <Link 
                            to=""
                            className={classes.link}
                            onClick={event => {
                                event.preventDefault()
                                changeForm('forgotPassword')
                            }}
                            >
                            Wachtwoord vergeten?
                        </Link>
                    </div>


                    <p className={classes.title}>Ben je hier voor de eerste keer?</p>
                    <p className={classes.text}> Je hoeft je slechts éénmalig te registreren om deel te nemen aan een actie. Na het registeren kun je meteen starten om de speeltuin rookvrij te maken.</p>

                    <div className={classes.actions}>
                        <Button
                        variant="contained"
                        className={`${classes.button} ${classes.saveButton}`}
                        classes={{ disabled: classes.disabled }}
                        disabled={ !isReadyToSubmit }
                        onClick={() => changeForm('signUp')}
                        >
                            Maak een account
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInForm)));
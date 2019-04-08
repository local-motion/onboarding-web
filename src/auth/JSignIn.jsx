import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, Input} from '@material-ui/core'
import {Auth, JS, Logger} from 'aws-amplify';
import querySearch from "stringquery";
import { getErrorMessage } from '../api/ErrorMessages';

const logger = new Logger('JSignIn');

/**
 * A mix between
 * https://raw.githubusercontent.com/aws-amplify/amplify-js/master/packages/aws-amplify-react/src/Auth/SignIn.jsx
 * https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial/blob/master/step-03/journal/src/components/auth/JSignIn.jsx
 */
class JSignIn extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
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

    signIn() {
        const {password} = this.inputs;

        // We are taking the username straight from the DOM here, because the inputs may contains an old value from a previous display of the form which
        // can happen in the signup process (user gets presented a signin form, elects to signup and afterwards is directed to signin again).
        // After signup the username field will contain the just enrolled username (from authData), which will not be propagated to the input if the user
        // does not edit the username field. 
        const username = document.getElementById('SigninFormUserName').value

        logger.info('attempting sign in with ' + username);
        Auth.signIn(username, password)
            .then(user => this.signInSuccess(user))
            .catch(err => this.signInError(err));
    }

    signInSuccess(user) {
        logger.info('sign in success', user);
        this.setState({error: ''});

        // There are other sign in challenges we don't cover here.
        // SMS_MFA, SOFTWARE_TOKEN_MFA, NEW_PASSWORD_REQUIRED, MFA_SETUP ...
        if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
            this.changeState('confirmSignIn', user);
        } else {
            this.checkContact(user);
        }
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

    goToTargetUrl = () => {
        console.log(this.props);
        const parsedSearch = querySearch(this.props.location.search);
        const url = parsedSearch["target"] || "/";

        this.props.history.push(url);
    };

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
        const {authState, authData} = this.props;
        if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) {
            return null;
        }

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
                            <Input
                                id="SigninFormUserName"
                                type="text"
                                placeholder="Gebruikersnaam"
                                style={style.input}
                                defaultValue={authData || ''}
                                onChange={event => this.inputs.username = event.target.value}
                                autoFocus
                            />
                            <Input
                                type="password"
                                placeholder="Wachtwoord"
                                onChange={event => this.inputs.password = event.target.value}
                                style={style.input}
                            />
                            <Button
                                style={style.button}
                                onClick={this.signIn}
                            >
                                Inloggen
                            </Button>
                        </form>
                        {error && <p className={"error"}>{error}</p>}
                        <div style={style.links} className={"extra-info"}>
                            <div style={style.left}>
                                <button
                                    style={style.extraButton}
                                    onClick={() => this.changeState('signUp')}
                                >
                                    Maak een account
                                </button>
                            </div>
                            <div style={style.left}>
                                <button style={style.extraButton}
                                        onClick={() => this.changeState('forgotPassword')}
                                >
                                    Wachtwoord vergeten?
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(JSignIn);
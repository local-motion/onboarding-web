import React, {Component} from 'react';
import {Button, Input} from '@material-ui/core'
import {Auth, JS, Logger} from 'aws-amplify';

const logger = new Logger('JSignIn');

/**
 * A mix between
 * https://raw.githubusercontent.com/aws-amplify/amplify-js/master/packages/aws-amplify-react/src/Auth/SignIn.jsx
 * https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial/blob/master/step-03/journal/src/components/auth/JSignIn.jsx
 */
export default class JSignIn extends Component {
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
        const {username, password} = this.inputs;
        logger.info('sign in with ' + username);
        // Auth.signIn(username, password)
        //     .then(user => this.signInSuccess(user))
        //     .catch(err => this.signInError(err));

        console.log('sign in with ' + username);
        this.props.goForward(username, password, this.props.history);
        // setTimeout(() => this.props.history.push("/"), 1);
        // setTimeout(() => this.props.history.goBack());
        console.log("JSignIn signIn()");
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
        this.setState({error: err.message || err});
    }

    checkContact(user) {
        Auth.verifiedContact(user)
            .then(data => {
                if (!JS.isEmpty(data.verified)) {
                    this.changeState('signedIn', user);
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
        const {authState, authData} = this.props;
        if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) {
            return null;
        }

        const style = {
            width: '20rem',
            input: {borderRadius: '0', display: 'block'},
            links: {fontSize: '0.9em', minHeight: "25px"},
            button: {width: '100%', marginBottom: "15px"},
            extraButton: {border: "0", marginBottom: "15px", cursor: "pointer"},
            left: {float: "left"},
            alert: {fontSize: '0.8em'}
        };

        const {error} = this.state;

        return (
            <div className={"secure-app-wrapper"}>
                <div className={"secure-app-background"}></div>
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
                                type="text"
                                placeholder="Username"
                                style={style.input}
                                defaultValue={authData || ''}
                                onChange={event => this.inputs.username = event.target.value}
                                autoFocus
                            />
                            <Input
                                type="password"
                                placeholder="Password"
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
                            {/*<Federated federated={federated_data} onStateChange={this.changeState} />*/}
                            {error && <div style={style.alert}>{error}</div>}

                    </div>
                </div>
            </div>
        )
    }
}

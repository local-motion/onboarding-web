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
        this.state = {error: ''}
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

    render() {
        const {authState, authData} = this.props;
        if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) {
            return null;
        }

        const style = {
            width: '20rem',
            input: {borderRadius: '0'},
            links: {fontSize: '0.9em'},
            button: {width: '100%'},
            alert: {fontSize: '0.8em'}
        };

        const {error} = this.state;

        return (
            <div>
                <form style={style} preventDefault>
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
                    <div style={style.links}>
                        <div>
                            New to us?{' '}
                            <a href="#" preventDefault onClick={() => this.changeState('signUp')}>
                                Sign up
                            </a>
                        </div>
                        <div>
                            <a href="#" preventDefault onClick={() => this.changeState('forgotPassword')}>
                                Forgot password
                            </a>
                        </div>
                    </div>
                    <Button
                        style={style.button}
                        onClick={this.signIn}
                    >
                        Sign In
                    </Button>
                    {/*<Federated federated={federated_data} onStateChange={this.changeState} />*/}
                    {error && <div style={style.alert}>{error}</div>}
                </form>
            </div>
        )
    }
}

import React, {Component} from 'react';
import {Button, Input} from '@material-ui/core';
import {Auth, JS, Logger} from 'aws-amplify';

const logger = new Logger('JConfirmSignIn');

export default class JConfirmSignIn extends Component {
    constructor(props) {
        super(props);
        this.confirmSignIn = this.confirmSignIn.bind(this);
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

    confirmSignIn() {
        const user = this.props.authData;
        const {code} = this.inputs;
        logger.info('confirm sign in with ' + code);
        const mfaType = user.challengeName === 'SOFTWARE_TOKEN_MFA'
            ? 'SOFTWARE_TOKEN_MFA'
            : null;
        Auth.confirmSignIn(user, code, mfaType)
            .then(() => this.confirmSuccess(user))
            .catch(err => this.confirmError(err));
    }

    confirmSuccess(user) {
        logger.info('confirm sign in success', user);
        this.setState({error: ''});

        this.checkContact(user);
    }

    confirmError(err) {
        logger.info('confirm sign in error', err);
        this.setState({error: err.message || err});
    }

    checkContact(user) {
        Auth.verifiedContact(user)
            .then(data => {
                logger.info('verified contacts', data);
                if (!JS.isEmpty(data.verified)) {
                    this.changeState('signedIn', user);
                } else {
                    user = Object.assign(user, data);
                    this.changeState('verifyContact', user);
                }
            })
            .catch(err => {
                logger.info('check verified contact error', err);
            });
    }

    render() {
        const {authState} = this.props;
        if (authState !== 'confirmSignIn') {
            return null;
        }

        const style = {
            links: {fontSize: '0.9em'},
            button: {width: '100%'},
            alert: {fontSize: '0.8em'}
        };

        const {error} = this.state;

        return (
            <div className={"secure-app-wrapper"}>
                <div className={"secure-app-background"}></div>
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Rookvrije Generatie</h1>
                    <div style={style.container}>
                        <h2>Bevestig het inloggen</h2>
                        <form onSubmit={this.onSubmit} autoComplete={"off"}>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Code"
                                    onChange={event => this.inputs.code = event.target.value}
                                    autoFocus
                                    autoComplete='new-password'
                                />
                            </div>
                            {error && <p style={style.alert}>{error.message}</p>}
                        </form>
                        <div style={style.links}>
                            <div>
                                <Button
                                    style={style.button}
                                    onClick={() => this.changeState('signIn')}>
                                    Back to sign in
                                </Button>
                            </div>
                            <div>
                                <Button
                                    style={style.button}
                                    onClick={this.confirmSignIn}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

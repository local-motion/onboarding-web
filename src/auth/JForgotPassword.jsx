import React, {Component} from 'react';
import {Button, Input} from '@material-ui/core'
import {Auth, Logger} from 'aws-amplify';

const logger = new Logger('JForgotPassword');

/**
 * A mix between
 * https://raw.githubusercontent.com/aws-amplify/amplify-js/master/packages/aws-amplify-react/src/Auth/ForgotPassword.jsx
 * https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial/blob/master/step-03/journal/src/components/auth/JforgotPassword.jsx
 */
export default class JForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.sendCode = this.sendCode.bind(this);
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

    sendCode() {
        const username = this.props.authData || this.inputs.username;
        logger.info('resend code to ' + username);
        Auth.forgotPassword(username)
            .then(data => this.sendSuccess(username, data))
            .catch(err => this.handleError(err));
    }

    sendSuccess(username, data) {
        logger.info('sent code for ' + username, data);
        this.changeState('forgotPasswordReset', username);
    }

    handleError(err) {
        logger.info('forgot password send code error', err);
        this.setState({error: err.message || err});
    }

    render() {
        const {authState, authData} = this.props;
        if (authState !== 'forgotPassword') {
            return null;
        }

        const style = {
            width: '100%',
            input: {borderRadius: '0', display: 'block'},
            links: {fontSize: '0.9em', minHeight: "35px"},
            button: {width: '100%'},
            extraButton: {border: "0", marginBottom: "15px", cursor: "pointer"},
            left: {float: "left"},
            right: {float: "right"},
            alert: {fontSize: '0.8em'}
        };

        const {error} = this.state;

        return (
            <div className={"secure-app-wrapper"}>
                <div className={"secure-app-background"}></div>
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Rookvrije Generatie</h1>
                    <div style={style.container}>
                        <div>
                            <h2>Je wachtwoord vergeten?</h2>
                        </div>
                        <form style={style}>
                            <div>
                                <Input
                                    type="text"
                                    style={style.input}
                                    placeholder="Username"
                                    defaultValue={authData || ''}
                                    onChange={event => this.inputs.username = event.target.value}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <Button style={style.button} onClick={this.sendCode}>Verstuur wachtwoord reset
                                    code</Button>
                            </div>
                            {error && <div style={style.alert}>{error}</div>}
                        </form>
                        <div style={style.links}>
                            <div style={style.right}>
                                <button
                                    style={style.extraButton}
                                    onClick={() => this.changeState('signIn')}>
                                    Terug naar het inlogscherm
                                </button>
                            </div>
                            <div style={style.left}>
                                <button
                                    style={style.extraButton}
                                    onClick={() => this.changeState('confirmSignUp')}>
                                    Bevestig je account
                                </button>
                            </div>
                            <div style={style.left}>
                                <button
                                    style={style.extraButton}
                                    onClick={() => this.changeState('signUp')}>
                                    Nog geen account?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

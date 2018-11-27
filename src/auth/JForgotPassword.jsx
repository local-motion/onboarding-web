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
            width: '20rem',
            links: {fontSize: '0.9em'},
            button: {width: '100%'},
            alert: {fontSize: '0.8em'}
        };

        const {error} = this.state;

        return (
            <div style={style.container}>
                <div>
                    <h1>Forgot password</h1>
                </div>
                <form>
                    <div>
                        <Input
                            type="text"
                            placeholder="Username"
                            defaultValue={authData || ''}
                            onChange={event => this.inputs.username = event.target.value}
                            autoFocus
                        />
                    </div>
                    <div>
                        <Button style={style.button} onClick={this.sendCode}>Send password reset code</Button>
                    </div>
                    {error && <div style={style.alert}>{error}</div>}
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
                        <p> No account? </p>
                        <Button
                            style={style.button}
                            onClick={() => this.changeState('confirmSignUp')}>
                            Confirm a code
                        </Button>
                    </div>
                    <div>
                        <p> No account? </p>
                        <Button
                            style={style.button}
                            onClick={this.signUp}>
                            Create account
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

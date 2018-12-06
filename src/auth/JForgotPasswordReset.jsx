import React, {Component} from 'react';
import {Button, Input} from '@material-ui/core'
import {Auth, Logger} from 'aws-amplify';

const logger = new Logger('JForgotPasswordReset');

/**
 * Based on:
 * https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial/blob/master/step-03/journal/src/components/auth/JForgotPasswordReset.jsx
 */
export default class JForgotPasswordReset extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
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

    submit() {
        const username = this.props.authData;
        if (!username) {
            this.setState({error: 'missing username'});
            return;
        }

        const {code, password} = this.inputs;
        logger.info('reset password for ' + username);
        Auth.forgotPasswordSubmit(username, code, password)
            .then(data => this.submitSuccess(username, data))
            .catch(err => this.handleError(err));
    }

    submitSuccess(username, data) {
        logger.info('forgot password reset success for ' + username, data);
        this.changeState('signIn', username);
    }

    handleError(err) {
        logger.info('forgot password reset error', err);
        this.setState({error: err.message || err});
    }

    render() {
        const {authState} = this.props;
        if (authState !== 'forgotPasswordReset') {
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
                            <h2>Wachtwoord reset code</h2>
                        </div>
                        <form name={"pass-reset-with-code"} autoComplete={"off"}>
                            <div>
                                Code:
                                <Input
                                    type="text"
                                    placeholder="Code"
                                    name={"code"}
                                    style={style.input}
                                    onChange={event => this.inputs.code = event.target.value}
                                    autoFocus
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                Nieuw wachtwoord:
                                <Input
                                    type="password"
                                    placeholder="Wachtwoord"
                                    name={"password"}
                                    style={style.input}
                                    onChange={event => this.inputs.password = event.target.value}
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <Button style={style.button} onClick={this.submit}>Reset password</Button>
                            </div>
                            {error && <div style={style.alert}>{error}</div>}
                        </form>
                        <div style={style.links}>
                            <div>
                                <Button
                                    style={style.button}
                                    onClick={() => this.changeState('forgotPassword')}>
                                    Back to forgot password
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, Input} from '@material-ui/core'
import {Auth, Logger} from 'aws-amplify';
import { getErrorMessage } from '../api/ErrorMessages';
import { clearVerificationCookies } from './VerificationLinkHandler';

const logger = new Logger('JForgotPasswordReset');

/**
 * Based on:
 * https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial/blob/master/step-03/journal/src/components/auth/JForgotPasswordReset.jsx
 */
class JForgotPasswordReset extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.changeState = this.changeState.bind(this);
        this.inputs = {};
        this.state = {error: '', waitingForServerResponse: false}
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

        const {password} = this.inputs;
        const code = this.inputs.code || this.props.authState.split(':')[1]
        logger.info('reset password for ' + username);
        this.setState({waitingForServerResponse: true})
        Auth.forgotPasswordSubmit(username, code, password)
            .then(data => this.submitSuccess(username, data))
            .catch(err => this.handleError(err));
    }

    submitSuccess(username, data) {
        logger.info('forgot password reset success for ' + username, data);
        this.inputs.password = ''                                            // clear password from memory
        this.setState({waitingForServerResponse: false})
        clearVerificationCookies();
        this.changeState('complete', username);
    }

    handleError(err) {
        logger.info('forgot password reset error', err);
        this.inputs.password = ''                                            // clear password from memory
        // this.setState({error: err.message || err});
        this.setState({error: getErrorMessage(err.code, err.message), waitingForServerResponse: false});
    }

    catchEnterSubmit(e){
        if(e.keyCode === 13 && e.shiftKey === false) {
            this.submit();
        }
    }

    render() {
        const isInCard = this.props.location.pathname.includes('workspace');
        const {authState} = this.props;
        if (!authState.startsWith('forgotPasswordReset')) {
            return null;
        }

        const verificationCode = authState.split(':')[1]
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
            <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Rookvrije Generatie</h1>
                    <div style={style.container}>
                        <div>
                            <h2>Wachtwoord reset code</h2>
                        </div>
                        <form   name={"pass-reset-with-code"} 
                                autoComplete={"new-password"}
                                onKeyDown={
                                    event => this.catchEnterSubmit(event)
                                }
                        >
                            <div>
                                Code:
                                <Input
                                    type="text"
                                    placeholder="Code"
                                    name={"code"}
                                    defaultValue={verificationCode}
                                    style={style.input}
                                    onChange={event => this.inputs.code = event.target.value}
                                    autoFocus={!verificationCode}
                                    autoComplete='new-password'
                                />
                            </div>
                            <div>
                                Nieuw wachtwoord:
                                <Input
                                    type="password"
                                    placeholder="Wachtwoord"
                                    name={"password"}
                                    autoFocus={!!verificationCode}
                                    style={style.input}
                                    onChange={event => this.inputs.password = event.target.value}
                                    autoComplete='new-password'
                                />
                            </div>
                            <div>
                                <Button 
                                    style={style.button} 
                                    disabled={this.state.waitingForServerResponse}
                                    onClick={this.submit}
                                >
                                    Reset wachtwoord
                                </Button>
                            </div>
                            {error && <div style={style.alert}>{error}</div>}
                        </form>
                        <div style={style.links}>
                            <div>
                                <Button
                                    style={style.button}
                                    onClick={() => this.changeState('forgotPassword')}>
                                    Terug naar nieuw wachtwoord aanvragen
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(JForgotPasswordReset);
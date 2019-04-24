import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, Input} from '@material-ui/core'
import {Auth, Logger} from 'aws-amplify';
import { getErrorMessage } from '../api/ErrorMessages';
import { setPasswordResetCookies } from './VerificationLinkHandler';

const logger = new Logger('JForgotPassword');

/**
 * A mix between
 * https://raw.githubusercontent.com/aws-amplify/amplify-js/master/packages/aws-amplify-react/src/Auth/ForgotPassword.jsx
 * https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial/blob/master/step-03/journal/src/components/auth/JforgotPassword.jsx
 */
class JForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.sendCode = this.sendCode.bind(this);
        this.changeState = this.changeState.bind(this);
        this.inputs = {};
        this.state = {error: '', usernameFilled: false}
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
    
        // Save the initiative in a cookie so it can be picked up when the user clicks the link in the verification mail
        const {initiativeId} = this.props.match.params
        if (initiativeId)
            setPasswordResetCookies(initiativeId)
    }

    sendSuccess(username, data) {
        logger.info('sent code for ' + username, data);
        this.changeState('forgotPasswordReset', username);
    }

    handleError(err) {
        logger.info('forgot password send code error', err);
        // this.setState({error: err.message || err});
        this.setState({error: getErrorMessage(err.code, err.message)});
    }

    catchEnterSubmit(e){
        if(e.keyCode === 13 && e.shiftKey === false && this.state.usernameFilled) {
            console.log('sendcode');
            this.sendCode();
        }
    }

    isDirty(event){
        this.inputs.username = event;
        this.inputs.username !== "" ? this.setState({usernameFilled: true}) : this.setState({usernameFilled: false});
    }

    render() {
        const isInCard = !!this.props.match.params.initiativeId;
        const {authState, authData} = this.props;
        if (authState !== 'forgotPassword') {
            return null;
        }

        const style = {
            width: '100%',
            input: {borderRadius: '0', display: 'block'},
            links: {fontSize: '0.9em', minHeight: "35px"},
            button: {width: '100%'},
            extraButton: {border: "0", marginBottom: "15px", marginRight: "15px", cursor: "pointer"},
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
                            <h2>Je wachtwoord vergeten?</h2>
                        </div>
                        <form
                            style={style}
                            onSubmit={e => { e.preventDefault(); }}
                            onKeyDown={
                                event => this.catchEnterSubmit(event)
                            }
                        >
                            <div>
                                <Input
                                    type="text"
                                    style={style.input}
                                    placeholder="Gebruikersnaam"
                                    defaultValue={authData || ''}
                                    onChange={
                                        event => this.isDirty(event.target.value)
                                    }
                                    autoFocus
                                    autoComplete='new-password'
                                />
                            </div>
                            <div>
                                <Button
                                    style={style.button}
                                    onClick={this.sendCode}
                                    disabled={!this.state.usernameFilled}
                                >
                                    Verstuur wachtwoord reset code
                                </Button>
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

export default withRouter(JForgotPassword);
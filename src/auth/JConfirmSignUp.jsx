import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, Input} from '@material-ui/core';
import {Auth, Logger} from 'aws-amplify';
import { getErrorMessage } from '../api/ErrorMessages';
import { clearVerificationCookies } from './VerificationLinkHandler';

const logger = new Logger('JConfirmSignUp');

/**
 * A mix between
 * https://raw.githubusercontent.com/aws-amplify/amplify-js/master/packages/aws-amplify-react/src/Auth/ConfirmSignUp.jsx
 * https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial/blob/master/step-03/journal/src/components/auth/JConfirmSignUp.jsx
 */
class JConfirmSignUp extends Component {
    constructor(props) {
        super(props);
        this.confirmSignUp = this.confirmSignUp.bind(this);
        this.confirmSuccess = this.confirmSuccess.bind(this);
        this.resendCode = this.resendCode.bind(this);
        this.changeState = this.changeState.bind(this);
        this.isValidInput = this.isValidInput.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.inputs = {};
        this.state = {
            message: '',
            error: '',
            validatedCode: '',
            codeLength: 0,
            filledUsername: false,
            filled: false,
            autoSubmitTriggered: false,
            waitingForServerResponse: false,
        }
    }

    changeState(state, data) {
        const {onStateChange} = this.props;
        if (onStateChange) {
            onStateChange(state, data);
        }
    }

    validateCode(input) {
        const RGEX = new RegExp(/([0-9])\d{5}/g);
        const validatedResult = RGEX.test(input);

        this.inputs.code = input;

        this.setState({codeLength: input.toString().length});
        validatedResult ?
            this.setState(
                {validateCode: "validated", error: ''}
                , () => {
                    if (this.props.authData || this.state.filledUsername) {
                        this.setState({filled: true});
                    }
                }) :
            this.setState({validateCode: "unvalidated", error: 'De code bestaat uit 6 cijfers'});


        if ((this.props.authData || this.state.filledUsername) && this.state.validateCode === "validated") {
            this.setState({filled: true});
        }

    }

    confirmSignUp() {
        const username = this.props.authData || this.inputs.username;
        const code = this.inputs.code || this.props.authState.split(':')[1]
        logger.info('confirm sign up with ' + code);
        this.setState({waitingForServerResponse: true})
        Auth.confirmSignUp(username, code)
            .then(() => this.confirmSuccess(username))
            .catch(err => {
                console.log('error in confirm signup: ', err)
                if (err.code === "NotAuthorizedException" && err.message === "User cannot be confirm. Current status is CONFIRMED")
                    this.confirmSuccess(username)
                else
                    this.handleError(err)
            })
    }

    resendCode() {
        const username = this.props.authData || this.inputs.username;
        logger.info('resend code to ' + username);
        Auth.resendSignUp(username)
            .then(() => this.setState({message: 'Code sent'}))
            .catch(err => this.handleError(err));
    }

    confirmSuccess(username) {
        clearVerificationCookies();
        logger.info('confirm sign up success with ' + username);
        this.setState({message: '', error: '', waitingForServerResponse: false});
        this.changeState('complete', username);
        this.setState({codeLength: 0, error: '', validateCode: "unvalidated"});
    }

    handleError(err) {
        logger.info('confirm sign up error', err);
        // this.setState({message: '', error: err.message || err});
        this.setState({message: '', error: getErrorMessage(err.code, err.message), waitingForServerResponse: false});
    }

    isDirty(event) {
        this.inputs.username = event;
        this.inputs.username.toString().length > 0 ?
            this.setState({filledUsername: true}, () => {
                if (this.state.validateCode === "validated") {
                    this.setState({filled: true});
                }
            }) :
            this.setState({filledUsername: false}, () => {

            });
    }

    catchEnterSubmit(e) {
        if (e.keyCode === 13 && e.shiftKey === false && this.state.filled) {
            this.confirmSignUp();
        }
    }

    isValidInput(defaultUsername, defaultVerificationCode) {
        const username = document.getElementById('confirmsignup_username') ? document.getElementById('confirmsignup_username').value : defaultUsername
        const verificationCode = document.getElementById('confirmsignup_verificationcode') ? document.getElementById('confirmsignup_verificationcode').value : defaultVerificationCode
        const RGEX = new RegExp(/([0-9])\d{5}/g);
        const validatedResult = RGEX.test(verificationCode);
        return username && username.length > 0 && validatedResult
    }

    componentDidUpdate() {
        const {authState} = this.props;
        const verificationCode = authState.split(':')[1]
        if (authState.startsWith('confirmSignUp') && verificationCode && !this.state.autoSubmitTriggered) {
            this.setState({autoSubmitTriggered: true})
            this.confirmSignUp()
        }
    }

    render() {
        const isInCard = this.props.location.pathname.includes('workspace');
        const {authState, authData} = this.props;
        if (!authState.startsWith('confirmSignUp')) {
            return null;
        }
        const verificationCode = authState.split(':')[1]
        const validInput = this.isValidInput(authData, verificationCode)

        const style = {
            width: '20rem',
            input: {borderRadius: '0', display: 'block'},
            links: {fontSize: '0.9em', minHeight: "35px"},
            button: {width: '100%'},
            extraButton: {border: "0", marginBottom: "15px", cursor: "pointer"},
            left: {float: "left"},
            alert: {fontSize: '0.8em'},
            error: {fontSize: '0.8em', color: "red"},
            message: {fontSize: '0.8em', color: "#333333"}
        };

        const {message, error, validateCode, codeLength} = this.state;

        return (
            <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Rookvrije Generatie</h1>
                    <div style={style.container}>
                        <h2>Bevestig je account</h2>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                            }}
                            onKeyDown={
                                event => this.catchEnterSubmit(event)
                            }
                        >
                            <div>
                                <Input
                                    id="confirmsignup_username"
                                    type="text"
                                    placeholder="Gebruikersnaam"
                                    defaultValue={authData || ''}
                                    style={style.input}
                                    className={error === "Username cannot be empty" ? "input-container error" : "input-container"}
                                    onChange={
                                        event => this.isDirty(event.target.value)
                                    }
                                    disabled={!!authData}
                                    autoComplete='new-password'
                                />
                            </div>
                            <div>
                                <Input
                                    id="confirmsignup_verificationcode"
                                    type="text"
                                    placeholder="Code"
                                    defaultValue={verificationCode}
                                    style={style.input}
                                    className={
                                        "input-container last " + (validateCode === "validated" ? 'success' : 'error') + (codeLength === 0 ? " untouched" : " dirty")
                                    }
                                    onChange={
                                        event => this.validateCode(event.target.value)
                                    }
                                    autoFocus
                                    autoComplete='new-password'
                                    inputProps={{
                                        maxLength: "6",
                                    }}
                                />
                                {error !== '' ? <span className={"error"} style={style.error}> {error} </span> : null}
                                {message !== '' ?
                                    <span className={"message"} style={style.message}> {message} </span> : null}

                            </div>
                            <div>
                                <Button
                                    style={style.button}
                                    onClick={this.confirmSignUp}
                                    disabled={
                                        !validInput
                                    }
                                >
                                    Bevestig
                                </Button>
                            </div>
                            <div>
                                <Button
                                    style={style.button}
                                    onClick={this.resendCode}>
                                    Stuur code opnieuw
                                </Button>
                            </div>
                        </form>
                        <div style={style.links}>
                            <div>
                                <button
                                    style={style.extraButton}
                                    onClick={() => this.changeState('signIn')}>
                                    Terug naar het inlogscherm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(JConfirmSignUp);
import React, {Component} from 'react';
import {Button, Input} from '@material-ui/core';
import {Auth, Logger} from 'aws-amplify';
import Error from "@material-ui/icons/Error";

const logger = new Logger('JConfirmSignUp');

/**
 * A mix between
 * https://raw.githubusercontent.com/aws-amplify/amplify-js/master/packages/aws-amplify-react/src/Auth/ConfirmSignUp.jsx
 * https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial/blob/master/step-03/journal/src/components/auth/JConfirmSignUp.jsx
 */
export default class JConfirmSignUp extends Component {
    constructor(props) {
        super(props);
        this.confirmSignUp = this.confirmSignUp.bind(this);
        this.resendCode = this.resendCode.bind(this);
        this.changeState = this.changeState.bind(this);
        this.inputs = {};
        this.state = {message: '', error: '', validatedCode: '', codeLength: 0}
    }

    changeState(state, data) {
        const {onStateChange} = this.props;
        if (onStateChange) {
            onStateChange(state, data);
        }
    }

    validateCode(input) {
        const RGEX = new RegExp(/([0-9])\S{5}/g);
        const validatedResult = RGEX.test(input);
        this.setState({codeLength: input.toString().length });
        console.log(this.state.codeLength);
        validatedResult ?
            this.setState({validateCode: "validated", error: ''}) :
            this.setState({validateCode: "unvalidated", error: 'De code bestaat uit 6 cijfers'});
    }

    confirmSignUp() {
        const username = this.props.authData || this.inputs.username;
        const {code} = this.inputs;
        logger.info('confirm sign up with ' + code);
        Auth.confirmSignUp(username, code)
            .then(() => this.confirmSuccess(username))
            .catch(err => this.handleError(err));
    }

    resendCode() {
        const username = this.props.authData || this.inputs.username;
        logger.info('resend code to ' + username);
        Auth.resendSignUp(username)
            .then(() => this.setState({message: 'Code sent'}))
            .catch(err => this.handleError(err));
    }

    confirmSuccess(username) {
        logger.info('confirm sign up success with ' + username);
        this.setState({message: '', error: ''});
        this.changeState('signIn', username);
    }

    handleError(err) {
        logger.info('confirm sign up error', err);
        this.setState({message: '', error: err.message || err});
    }

    render() {
        const {authState, authData} = this.props;
        if (authState !== 'confirmSignUp') {
            return null;
        }

        const style = {
            width: '20rem',
            input: {borderRadius: '0', display: 'block'},
            links: {fontSize: '0.9em', minHeight: "35px"},
            button: {width: '100%'},
            extraButton: {border: "0", marginBottom: "15px", cursor: "pointer"},
            left: {float: "left"},
            alert: {fontSize: '0.8em'},
            error: {fontSize: '0.8em', color: "red"}
        };

        const {error, validateCode, codeLength} = this.state;

        return (
            <div className={"secure-app-wrapper"}>
                <div className={"secure-app-background"}></div>
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Rookvrije Generatie</h1>
                    <div style={style.container}>
                        <h2>Bevestig je account</h2>
                        <form onSubmit={this.onSubmit} autoComplete={"off"}>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    defaultValue={authData || ''}
                                    style={style.input}
                                    className={error === "Username cannot be empty" ? "input-container error" : "input-container" }
                                    onChange={event => this.inputs.username = event.target.value}
                                    disabled={!!authData}
                                    autoComplete='new-password'
                                />
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Code"
                                    style={style.input}
                                    className={
                                        "input-container last " + (validateCode === "validated" ? 'success' : 'error') + (codeLength === 0 ? " untouched" : " dirty" )
                                    }
                                    onChange={
                                        event => this.inputs.code = event.target.value &&
                                        this.validateCode(event.target.value)
                                    }
                                    autoFocus
                                    autoComplete='new-password'
                                    inputProps={{
                                        maxLength: "6",
                                    }}
                                />
                                { error !== '' ? <span className={"error"} style={style.error}> Error: {error} </span> : null }

                            </div>
                            <div>
                                <Button
                                    style={style.button}
                                    onClick={this.confirmSignUp}>
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

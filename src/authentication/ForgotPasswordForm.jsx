import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, TextField} from '@material-ui/core'
import {Auth} from 'aws-amplify';
import { getErrorMessage } from '../api/ErrorMessages';
import { setPasswordResetCookies } from './VerificationLinkHandler';
import { style } from './AuthenticatorStyles';
import { bindMethods } from '../utils/Generics';

/**
 * This form allows the user to specify his username or email address and get sent an email containing a code to reset his password
 */
class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        bindMethods(['sendCode', 'onChangeUsername'], this)
    }

    sendCode() {
        const {username} = this.props;
        this.props.setWaitingForServerResponse()
        Auth.forgotPassword(username)
            .then(data => {
                console.log('sent password reset code to ' + username);
                this.props.clearWaitingForServerResponse()
                this.changeForm('forgotPasswordReset')
            })
            .catch(error => {
                console.log('forgot password send code error', error);
                this.props.clearWaitingForServerResponse()
                if (error.code === 'InvalidParameterException' && error.message === 'Cannot reset password for the user as there is no registered/verified email or phone_number')
                    this.props.openErrorDialog(
                        'Emailadres niet gevalideerd', 
                        'Je emailadres is nog niet gevalideerd. Check je inbox of vraag een nieuwe code aan', 
                        'OK', 
                        () => this.props.changeForm('confirmSignUp')
                    )
                else
                    this.props.displayError(getErrorMessage(error.code, error.message))
            })
    
        // Save the initiative in a cookie so it can be picked up when the user clicks the link in the verification mail
        const {initiativeId} = this.props.match.params
        if (initiativeId)
            setPasswordResetCookies(initiativeId)
    }

    onChangeUsername(event) {
        const username = event.target.value.trim()
        this.props.setUsername(username)
    }

    catchEnterSubmit(event, isReadyToSubmit){
        if(event.keyCode === 13 && event.shiftKey === false && isReadyToSubmit)
            this.sendCode();
    }

    render() {
        const {username, waitingForServerResponse, changeForm} = this.props
        const isInCard = this.props.location.pathname.includes('workspace');

        // const style = {
        //     width: '100%',
        //     input: {borderRadius: '0', display: 'block'},
        //     links: {fontSize: '0.9em', minHeight: "35px"},
        //     button: {width: '100%'},
        //     extraButton: {border: "0", marginBottom: "15px", marginRight: "15px", cursor: "pointer"},
        //     left: {float: "left"},
        //     right: {float: "right"},
        //     alert: {fontSize: '0.8em'}
        // };

        const isReadyToSubmit = username && !waitingForServerResponse

        return (
            <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Wachtwoord vergeten</h1>
                    <div style={style.container}>
                        <form
                            style={style}
                            onSubmit={e => { e.preventDefault(); }}
                            onKeyDown={
                                event => this.catchEnterSubmit(event, isReadyToSubmit)
                            }
                        >
                                <TextField
                                  placeholder="Gebruikersnaam of e-mailadres"
                                  type="text"
                                  style={style.input}
                                  fullWidth
                                  variant={"outlined"}
                                  value={username}
                                  onChange={this.onChangeUsername}
                                  autoFocus
                                //   autoComplete='off'
                                />
                                <Button
                                    style={style.loginButton}
                                    onClick={this.sendCode}
                                    variant="contained"
                                    color="primary"
                                    className={"pagination-button-step"}
                                    disabled={!isReadyToSubmit}
                                >
                                    Verstuur wachtwoord reset code
                                </Button>
                        </form>
                        <div style={style.links}>
                            {/* <div style={style.right}> */}
                                <Button
                                    style={style.extraButton}
                                    onClick={() => changeForm('signIn')}>
                                    Ga terug naar login
                                </Button>
                            {/* </div> */}
                            {/* <div style={style.left}> */}
                                <Button
                                    style={style.extraButton}
                                    onClick={() => changeForm('confirmSignUp')}>
                                    Bevestig je account
                                </Button>
                            {/* </div> */}
                            {/* <div style={style.left}> */}
                                <Button
                                    style={style.extraButton}
                                    onClick={() => changeForm('signUp')}>
                                    Nog geen account?
                                </Button>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ForgotPasswordForm);
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, TextField, withStyles, CardMedia} from '@material-ui/core'
import {Auth} from 'aws-amplify';
import { getErrorMessage } from '../api/ErrorMessages';
import { styles } from './AuthenticatorStyles';
import { bindMethods } from '../utils/Generics';
import { PadlockIcon } from './AuthenticatorStyles';
import { Link } from "react-router-dom";

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
            if (username) {
            this.props.setWaitingForServerResponse()
            Auth.forgotPassword(username)
                .then(data => {
                    console.log('sent password reset code to ' + username);
                    this.props.clearWaitingForServerResponse()
                    this.props.setVerificationCode('')

                    // Save the initiative so it can be picked up when the user clicks the link in the verification mail
                    const {initiativeName} = this.props.match.params
                    if (initiativeName)
                        this.props.storeInitiativeForVerification(initiativeName)

                    this.props.changeForm('passwordReset')
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
        
        }
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
        const {username, waitingForServerResponse, changeForm, isInCard, classes} = this.props

        console.log('initiativeid: ', this.props.match.params)

        const isReadyToSubmit = username && !waitingForServerResponse

        return (


            <div>
                {isInCard || <div className={"secure-app-background"}></div>}
                {isInCard && (
                      <CardMedia
                        className={classes.media}
                        image={require("../assets/img/backgrounds/login-bg.jpg")}
                        title={"Wachtwoord vergeten"}
                      />
                    )}
                <div className={classes.secureAppContainer}>

                    <div className={classes.settingsTitle}>
                        <PadlockIcon className={classes.settingsIcon}/>
                        Wachtwoord vergeten
                    </div>

                    <TextField
                        variant="outlined"
                        className={classes.input}
                        label="Gebruikersnaam of emailadres"
                        type="text"
                        name="username"          // Setting the name property triggers the autocomplete in Chrome
                        value={username}
                        onChange={this.onChangeUsername}
                        autoFocus
                        onKeyDown={ event => this.catchEnterSubmit(event, isReadyToSubmit) }
                    />

                    <div className={classes.actions}>
                        <Button
                        variant="contained"
                        className={`${classes.button} ${classes.saveButton}`}
                        classes={{ disabled: classes.disabled }}
                        disabled={ !isReadyToSubmit }
                        onClick={this.sendCode}
                        >
                            Verstuur wachtwoord reset code
                        </Button>
                    </div>

                    <div className={classes.links}>
                        <Link 
                            className={classes.link}
                            onClick={() => changeForm('signIn')}
                            >
                            Ga terug naar login
                        </Link>
                        <Link 
                            className={classes.link}
                            onClick={() => changeForm('confirmSignUp')}
                            >
                            Bevestig je account
                        </Link>
                        <Link 
                            className={classes.link}
                            onClick={() => changeForm('signUp')}
                            >
                            Nog geen account?
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(ForgotPasswordForm));

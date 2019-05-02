import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Button, Input} from '@material-ui/core'
import {Auth, Logger} from 'aws-amplify';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getErrorMessage } from '../api/ErrorMessages';
import ContentDialog from "../components/Dialogs/ContentDialog";
import TermsText from "../views/Legal/TermsText";
import PrivacyText from "../views/Legal/PrivacyText";

const logger = new Logger('JSignUp');

/**
 * A mix between
 * https://raw.githubusercontent.com/aws-amplify/amplify-js/master/packages/aws-amplify-react/src/Auth/SignUp.jsx
 * https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial/blob/master/step-03/journal/src/components/auth/JSignUp.jsx
 */
class JSignUp extends Component {
    constructor(props) {
        super(props);

        this.inputs = {};

        this.state = {
            error: '',
            acceptedTerms: false,
            filledPass: false,
            filledUsername: false,
            filledEmail: false,
            filled: false,
            isTermsOpened: false,
            isPrivacyOpened: false,
        };

        this.signUp = this.signUp.bind(this);
        this.changeState = this.changeState.bind(this);
        this.togglePrivacyDialog = this.togglePrivacyDialog.bind(this);
        this.toggleTermsDialog = this.toggleTermsDialog.bind(this);
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.checked}, () => {
            this.isFilled();
        });
    };

    changeState(state, data) {
        const {onStateChange} = this.props;
        if (onStateChange) {
            onStateChange(state, data);
        }
    }

    signUp() {
        const {username, password, email, phone_number} = this.inputs;
        logger.info('sign up with ' + username);
        Auth.signUp(username, password, email, phone_number)
            .then(() => this.signUpSuccess(username))
            .catch(err => this.signUpError(err));
    }

    signUpSuccess(username) {
        logger.info('sign up success with ' + username);
        this.setState({error: ''});

        this.changeState('confirmSignUp', username);
    }

    signUpError(err) {
        logger.info('sign up error', err);
        let message = getErrorMessage(err.code, err.message)
        if (err.message && (err.message.includes("password") || err.message.includes("Password")))
            message = 'Je wachtwoord heeft minimaal 6 karakters, een cijfer, een hoofdletter en een speciaal karakter nodig.';
        else if (err.message && err.message.includes("email"))
            message = 'Ongeldig email adres';
        
        this.setState({error: message});
    }

    isFilled() {
        const {filledUsername, filledPass, filledEmail, acceptedTerms} = this.state;
        if (filledUsername && filledPass && filledEmail && acceptedTerms) {
            this.setState({filled: true});
        } else {
            this.setState({filled: false});
        }
    }

    isDirty(field, event) {
        switch (field) {
            case "username":
                this.inputs.username = event;
                this.inputs.username !== "" ?
                    this.setState({filledUsername: true}, () => {
                        this.isFilled();
                    }) :
                    this.setState({filledUsername: false}, () => {
                        this.isFilled();
                    });
                break;
            case "password":
                this.inputs.password = event;
                this.inputs.password !== "" ?
                    this.setState({filledPass: true}, () => {
                        this.isFilled();
                    }) :
                    this.setState({filledPass: false}, () => {
                        this.isFilled();
                    });
                break;
            case "email":
                this.inputs.email = event;
                this.inputs.email !== "" ? this.setState({filledEmail: true}, () => {
                        this.isFilled();
                    }) :
                    this.setState({filledEmail: false}, () => {
                        this.isFilled();
                    });
                break;
            default:
                return "";
        }

    }

    catchEnterSubmit(e) {
        if (e.keyCode === 13 && e.shiftKey === false && this.state.filled) {
            this.signUp();
        }
    }

    toggleTermsDialog() {
        this.setState(({ isTermsOpened }) => ({ isTermsOpened: !isTermsOpened }));
    }

    togglePrivacyDialog() {
        this.setState(({ isPrivacyOpened }) => ({ isPrivacyOpened: !isPrivacyOpened }));
    }

    render() {
        const isInCard = this.props.location.pathname.includes('workspace');
        const {authState} = this.props;
        if (authState !== 'signUp') {
            return null;
        }

        const style = {
            width: '100%',
            input: {borderRadius: '0', display: 'block'},
            links: {fontSize: '0.9em', minHeight: "35px"},
            button: {width: '100%'},
            extraButton: {border: "0", marginBottom: "15px", marginRight: "15px", cursor: "pointer"},
            left: {float: "left"},
            alert: {fontSize: '0.8em'}
        };

        const {error} = this.state;


        return (
            <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Rookvrije Generatie</h1>
                    <div style={style.container}>
                        <h2>Schrijf je in</h2>
                        <form
                            onKeyDown={
                                event => this.catchEnterSubmit(event)
                            }
                        >
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Gebruikersnaam"
                                    style={style.input}
                                    className={"code"}
                                    onChange={
                                        event => this.isDirty("username", event.target.value)
                                    }
                                    autoFocus
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <Input
                                    type="password"
                                    placeholder="Wachtwoord"
                                    onChange={
                                        event => this.isDirty("password", event.target.value)
                                    }
                                    style={style.input}
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <Input
                                    type="email"
                                    placeholder="Emailadres"
                                    style={style.input}
                                    onChange={
                                        event => this.isDirty("email", event.target.value)
                                    }
                                    autoComplete='off'
                                />
                            </div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.acceptedTerms}
                                        onChange={this.handleChange('acceptedTerms')}
                                        color="primary"
                                        value="accepted"
                                    />
                                }
                                label={[
                                    <span key="1">Ik ga akkoord met de </span>,
                                    // eslint-disable-next-line
                                    <a key="2" onClick={this.toggleTermsDialog}>Gebruiksvoorwaarden</a>,
                                    <span key="3"> en de </span>,
                                    // eslint-disable-next-line
                                    <a key="4" onClick={this.togglePrivacyDialog}>Privacyverklaring</a>
                                ]}
                            />

                            <ContentDialog
                              open={this.state.isTermsOpened}
                              onClose={this.toggleTermsDialog}
                              title="Gebruiksvoorwaarden"
                              content={<TermsText />}
                              maxWidth="lg"
                            />

                            <ContentDialog
                              open={this.state.isPrivacyOpened}
                              onClose={this.togglePrivacyDialog}
                              title="Privacyverklaring"
                              content={<PrivacyText />}
                              maxWidth="lg"
                            />

                            <div>
                                <Button
                                    style={style.button}
                                    disabled={
                                        !this.state.filled
                                    }
                                    onClick={this.signUp}>
                                    Maak het account
                                </Button>
                            </div>
                        </form>
                        {error && <p className={"error"}>{error}</p>}
                        <div style={style.links} className={"extra-info"}>
                            <div style={style.left}>
                                <button
                                    style={style.extraButton}
                                    onClick={() => this.changeState('signIn')}>
                                    Ga terug naar login
                                </button>
                            </div>
                            <div style={style.left}>
                                <button
                                    style={style.extraButton}
                                    onClick={() => this.changeState('confirmSignUp')}>
                                    Bevestig je account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(JSignUp);

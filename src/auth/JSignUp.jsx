import React, {Component} from 'react';
import {Button, Input} from '@material-ui/core'
import {Auth, Logger} from 'aws-amplify';

const logger = new Logger('JSignUp');

/**
 * A mix between
 * https://raw.githubusercontent.com/aws-amplify/amplify-js/master/packages/aws-amplify-react/src/Auth/SignUp.jsx
 * https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial/blob/master/step-03/journal/src/components/auth/JSignUp.jsx
 */
export default class JSignUp extends Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.changeState = this.changeState.bind(this);
        this.inputs = {};
        this.state = {
            error: '',
            filledPass: false,
            filledUsername: false,
            filledEmail: false,
            filled: false
        }
    }

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
        let message = err.message || err;
        if( message.includes("password") ){
            message = 'Je wachtwoord heeft minimaal 6 karakters en 1 cijfer nodig.';
        }
        this.setState({error: message});
    }
    isDirty(field, event){
        const { filledUsername, filledPass, filledEmail } =  this.state;
        switch (field){
            case "username":
                this.inputs.username = event;
                this.inputs.username !== "" ? this.setState({filledUsername: true}) : this.setState({filledUsername: false});
                break;
            case "password":
                this.inputs.password = event;
                this.inputs.password !== "" ? this.setState({filledPass: true}) : this.setState({filledPass: false});
                break;
            case "email":
                this.inputs.email = event;
                this.inputs.email !== "" ? this.setState({filledEmail: true}) : this.setState({filledEmail: false});
                break;
            default: return "";
        }
        if ( filledUsername && filledPass && filledEmail  ){
            this.setState({filled: true});
        }
        console.log(this.state, this.inputs);
    }

    render() {
        const {authState} = this.props;
        if (authState !== 'signUp') {
            return null;
        }

        const style = {
            width: '100%',
            input: {borderRadius: '0', display: 'block'},
            links: {fontSize: '0.9em', minHeight: "35px"},
            button: {width: '100%'},
            extraButton: {border: "0", marginBottom: "15px", cursor: "pointer"},
            left: {float: "left"},
            alert: {fontSize: '0.8em'}
        };

        const {error} = this.state;

        console.log(this.inputs);

        return (
            <div className={"secure-app-wrapper"}>
                <div className={"secure-app-background"}></div>
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Rookvrije Generatie</h1>
                    <div style={style.container}>
                        <h2>Schrijf je in</h2>
                        <form onSubmit={this.onSubmit} style={style} autoComplete={"off"}>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Username"
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
                                    placeholder="Password"
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
                                    placeholder="Email address"
                                    style={style.input}
                                    onChange={
                                        event => this.isDirty("email", event.target.value)
                                    }
                                    autoComplete='off'
                                />
                            </div>
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
                        {error && <p>{error}</p>}
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

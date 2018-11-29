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
        this.state = {error: ''}
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
        if (message.startsWith('Invalid phone number')) {
            // reference: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
            message = 'Phone numbers must follow these formatting rules: A phone number must start with a plus (+) sign, followed immediately by the country code. A phone number can only contain the + sign and digits. You must remove any other characters from a phone number, such as parentheses, spaces, or dashes (-) before submitting the value to the service. For example, a United States-based phone number must follow this format: +14325551212.'
        }
        this.setState({error: message});
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

        return (
            <div style={style.container}>
                <h2>Schrijf je in</h2>
                <form onSubmit={this.onSubmit} style={style}>
                    <div>
                        <Input
                            type="text"
                            placeholder="Username"
                            style={style.input}
                            onChange={event => this.inputs.username = event.target.value}
                            autoFocus
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            onChange={event => this.inputs.password = event.target.value}
                            style={style.input}
                        />
                    </div>
                    <div>
                        <Input
                            type="email"
                            placeholder="Email address"
                            style={style.input}
                            onChange={event => this.inputs.email = event.target.value}
                        />
                    </div>
                    <div>
                        <Button
                            style={style.button}
                            onClick={this.signUp}>
                            Maak het account
                        </Button>
                    </div>
                    {error && <p>{error.message}</p>}
                </form>
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
        )
    }
}

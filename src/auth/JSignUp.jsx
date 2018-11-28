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
        const {authState, theme} = this.props;
        if (authState !== 'signUp') {
            return null;
        }

        const style = {
            width: '20rem',
            input: {borderRadius: '0'},
            links: {fontSize: '0.9em'},
            button: {width: '100%'},
            alert: {fontSize: '0.8em'},
            container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }
        };

        const {error} = this.state;

        return (
            <div style={style.container}>
                <h1>SignUp</h1>
                <form onSubmit={this.onSubmit}>
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
                    {error && <p>{error.message}</p>}
                </form>
                <div style={style.links}>
                    <div>
                        <a
                            style={style.button}
                            onClick={() => this.changeState('signIn')}>
                            Back to sign in
                        </a>
                    </div>
                    <div>
                        <p> No account? </p>
                        <Button
                            style={style.button}
                            onClick={() => this.changeState('confirmSignUp')}>
                            Confirm a code
                        </Button>
                    </div>
                    <div>
                        <p> No account? </p>
                        <Button
                            style={style.button}
                            onClick={this.signUp}>
                            Create account
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

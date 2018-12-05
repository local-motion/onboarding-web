import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Route, Router, Switch} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {setContext} from "apollo-link-context";

import indexRoutes from "routes/index.jsx";
import "assets/scss/material-kit-react.css?v=1.2.0";


import Amplify from "aws-amplify";
import {withAuthenticator} from 'aws-amplify-react';

import JSignOut from "auth/JSignOut";
import JSignUp from "auth/JSignUp";
import JSignIn from "auth/JSignIn";
import JConfirmSignUp from "auth/JConfirmSignUp";
import JConfirmSignIn from "auth/JConfirmSignIn";
import JForgotPassword from "./auth/JForgotPassword";
import JForgotPasswordReset from "./auth/JForgotPasswordReset";

const isAuthenticated = () => Amplify.Auth.user != null;
const oauth = {
    awsCognito: {
        // Domain name
        domain: 'techoverflow-d.auth.eu-west-1.amazoncognito.com',

        // Authorized scopes
        scope: ['email', 'openid'],

        // Callback URL
        redirectSignIn: 'https://techoverflow-d.aws.nl.eu.abnamro.com/onboarding/signin',

        // Sign out URL
        redirectSignOut: 'https://techoverflow-d.aws.nl.eu.abnamro.com/onboarding/logout',

        // 'code' for Authorization code grant,
        // 'token' for Implicit grant
        responseType: 'token',

        // optional, for Cognito hosted ui specified options
        options: {
            // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
            AdvancedSecurityDataCollectionFlag: true
        }
    }
};

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-1',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-1_64ShtC2tS',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '5djhi4lvjkf33cu6aik6kd1uku',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // // OPTIONAL - Configuration for cookie storage
        // cookieStorage: {
        //     // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.yourdomain.com',
        //     // OPTIONAL - Cookie path
        //     path: '/',
        //     // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        //     // OPTIONAL - Cookie secure flag
        //     secure: true
        // },

        // OPTIONAL - customized storage object
        // storage: new MyStorage(),

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH',

        oauth: oauth
    },
    // ...
});

let hist = createBrowserHistory();
const rootEl = document.querySelector("#root");

const App = class App extends React.Component {
    render() {
        const {auth, authData} = this.props;
        console.log('Auth: ', auth);
        console.log('Auth data: ', authData);
        if (!authData) {
            return "Logging in failed: " + (auth && auth.state);
        }

        let uri = process.env.ONBOARDING_API || 'https://techoverflow-d.aws.nl.eu.abnamro.com/api/graphql';
        console.log('ONBOARDING_API: ' + process.env.ONBOARDING_API);
        console.log('Using Onboarding API at ' + uri);

        const httpLink = new HttpLink({uri: uri});
        const authLink = setContext(async (req, {headers}) => {
            let session = authData.getSignInUserSession();
            let idToken = session.getIdToken();
            let jwtToken = idToken.getJwtToken();
            return {
                ...headers,
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
            };
        });
        const link = authLink.concat(httpLink);
        const client = new ApolloClient({
            link: link,
            cache: new InMemoryCache(),
        });

        return (
            <div>
                {
                    <div>Hello, {authData.username}</div>
                }
                <JSignOut/>
                {
                    !isAuthenticated() &&
                    <button onClick={this.props.OAuthSignIn}>
                        Sign in with AWS
                    </button>
                }
                <ApolloProvider client={client}>
                    <I18nextProvider i18n={i18n}>
                        <Router history={hist}>
                            <Switch>
                                {indexRoutes.map((prop, key) => {
                                    return <Route path={prop.path} key={key} component={prop.component} />;
                                })}
                            </Switch>
                        </Router>
                    </I18nextProvider>
                </ApolloProvider>,
            </div>
        )
    }
};

const SecuredApp = withAuthenticator(App, false, [
    <JSignIn/>,
    <JSignUp/>,
    <JForgotPassword/>,
    <JForgotPasswordReset/>,
    <JConfirmSignIn/>,
    <JConfirmSignUp/>,
]);

const Wrapped = [
    <SecuredApp className={"secure-app"}/>
];

ReactDOM.render(
    Wrapped,
    rootEl
);

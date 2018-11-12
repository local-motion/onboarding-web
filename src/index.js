import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import { setContext } from "apollo-link-context";

import indexRoutes from "routes/index.jsx";
import "assets/scss/material-kit-react.css?v=1.2.0";


import Amplify from "aws-amplify";
import {Auth} from 'aws-amplify';
// import { Hub, Logger } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

const oauth = {
    awsCognito: {
        // Domain name
        domain: 'smokefree-dev.auth.eu-west-1.amazoncognito.com',

        // Authorized scopes
        scope: ['email', 'openid'],

        // Callback URL
        redirectSignIn: 'http://localhost:3000/onboarding/signin',

        // Sign out URL
        redirectSignOut: 'http://localhost:3000/onboarding/logout',

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
        userPoolId: 'eu-west-1_WsTxYUHyC',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '3nkh1qomocr39s893jf0dp44cd',

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

/*
const alex = new Logger('Alexander_the_auth_watcher');

alex.onHubCapsule = (capsule) => {
    // eslint-disable-next-line
    switch (capsule.payload.event) {

        case 'signIn':
            alex.error('user signed in'); //[ERROR] Alexander_the_auth_watcher - user signed in
            break;
        case 'signUp':
            alex.error('user signed up');
            break;
        case 'signOut':
            alex.error('user signed out');
            break;
        case 'signIn_failure':
            alex.error('user sign in failed');
            break;
        case 'configured':
            alex.error('the Auth module is configured');

    }
}

Hub.listen('auth', alex);
*/

const config = Auth.configure();
const {
    domain,
    redirectSignIn,
    // eslint-disable-next-line
    redirectSignOut,
    responseType
} = config.oauth.awsCognito;
const clientId = config.userPoolWebClientId;
// The url of the Cognito Hosted UI
// eslint-disable-next-line
const url = 'https://' + domain + '/login?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId;
// Launch hosted UI
// debugger;
// window.location.assign(url);

let hist = createBrowserHistory();
const rootEl = document.querySelector("#root");

class MyApp extends React.Component {

    render() {
        const {auth, authData} = this.props;
        console.log(auth);
        console.log(authData);
        if (!authData) {
            return "Logging in failed: " + (auth && auth.state);
        }

        const httpLink = new HttpLink({ uri: process.env.ONBOARDING_API || 'http://localhost:8086/graphql' });
        const authLink = setContext(async (req, { headers }) => {
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
            // By default, this client will send queries to the
            //  `/graphql` endpoint on the same host
            // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
            // to a different host
            link: link,
            cache: new InMemoryCache(),
        });

        return (
            <div>
{/*
                <button onClick={this.props.OAuthSignIn}>
                    Sign in with AWS
                </button>
*/}
                <ApolloProvider client={client}>
                    <I18nextProvider i18n={i18n}>
                        <Router history={hist}>
                            <Switch>
                                {indexRoutes.map((prop, key) => {
                                    return <Route path={prop.path} key={key} component={prop.component}/>;
                                })}
                            </Switch>
                        </Router>
                    </I18nextProvider>
                </ApolloProvider>,
            </div>
        )
    }
}

const Bla = withAuthenticator(MyApp);

ReactDOM.render(
    <Bla/>,
    rootEl
);

import React from "react";
import ReactDOM from "react-dom";
import {Redirect} from 'react-router-dom'
import {createBrowserHistory} from "history";
import {Route, Router, Switch} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {onError} from "apollo-link-error";
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {setContext} from "apollo-link-context";

import indexRoutes from "routes/index.jsx";
import "assets/scss/material-kit-react.css?v=1.2.0";

import Amplify from "aws-amplify";
import {withAuthenticator} from 'aws-amplify-react';

import JSignUp from "auth/JSignUp";
import JSignIn from "auth/JSignIn";
import JConfirmSignUp from "auth/JConfirmSignUp";
import JConfirmSignIn from "auth/JConfirmSignIn";
import JForgotPassword from "./auth/JForgotPassword";
import JForgotPasswordReset from "./auth/JForgotPasswordReset";

import CookieConsent from "react-cookie-consent";


const environments = {
    "techoverflow-ta.aws.abnamro.org": {
        aws: {
            cognito: {
                region: "eu-west-1",
                userPoolId: "eu-west-1_4AWqO0oP5",
                userPoolWebClientId: "6bi2jfnffr21jp1lbmchtomuoj",
                domain: "techoverflow-ta.auth.eu-west-1.amazoncognito.com",
                redirectSignIn: "https://techoverflow-ta.aws.abnamro.org/onboarding/signin",
                redirectSignOut: "https://techoverflow-ta.aws.abnamro.org/onboarding/logout",
            }
        },
        api: {
            onboarding: "https://techoverflow-ta.aws.abnamro.org/api/graphql"
        }
    },
    "techoverflow-d.aws.nl.eu.abnamro.com": {
        aws: {
            cognito: {
                region: "eu-west-1",
                userPoolId: "eu-west-1_JPnvWqFEH",
                userPoolWebClientId: "2lftl5v394apb7rb6ckcc59bus",
                domain: "techoverflow-d.auth.eu-west-1.amazoncognito.com",
                redirectSignIn: "https://techoverflow-d.aws.nl.eu.abnamro.com/onboarding/signin",
                redirectSignOut: "https://techoverflow-d.aws.nl.eu.abnamro.com/onboarding/logout",
            }
        },
        api: {
            onboarding: "https://techoverflow-d.aws.nl.eu.abnamro.com/api/graphql"
        }
    },
    "localhost": {
        aws: {
            cognito: {
                region: "eu-west-1",
                userPoolId: "eu-west-1_WsTxYUHyC",
                userPoolWebClientId: "3nkh1qomocr39s893jf0dp44cd",
                domain: "smokefree-dev.auth.eu-west-1.amazoncognito.com",
                redirectSignIn: "http://localhost:3000/onboarding/signin",
                redirectSignOut: "http://localhost:3000/onboarding/logout",
            }
        },
        api: {
            onboarding: "http://localhost:8086/api/graphql"
        }
    }
};
const settings = environments[window.location.hostname] || environments["localhost"];
console.log("Host name is: " + window.location.hostname);
console.log("Using settings:", settings);

const uri = process.env.ONBOARDING_API || settings.api.onboarding;
console.log('Using Onboarding API at ' + uri);

// IsAuthenticated can be called to see if user is authenticated
// const isAuthenticated = () => Amplify.Auth.user != null;
const oauth = {
    awsCognito: {
        domain: settings.aws.cognito.domain,
        scope: ['email', 'openid'],
        redirectSignIn: settings.aws.cognito.redirectSignIn,
        redirectSignOut: settings.aws.cognito.redirectSignOut,
        responseType: 'token', // 'token' for Implicit grant, 'code' for Authorization code grant
    }
};

Amplify.configure({
    Auth: {
        region: settings.aws.cognito.region,
        userPoolId: settings.aws.cognito.userPoolId,
        userPoolWebClientId: settings.aws.cognito.userPoolWebClientId,
        mandatorySignIn: false,
        oauth: oauth
    }
});

let hist = createBrowserHistory();
const rootEl = document.querySelector("#root");

const App = class App extends React.Component {
    render() {
        const {auth, authData} = this.props;
        console.log('Auth: ', auth);
        console.log('Auth data: ', authData);
        if (!authData) {
            return "Login failed: " + (auth && auth.state);
        }

        const errorLink = onError(apolloError => {
            const graphQLErrors = apolloError.graphQLErrors;
            const networkError = apolloError.networkError;
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path, extensions }) =>
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}, Extensions: ${JSON.stringify(extensions)}`)

                    // TODO: Consider using extensions.code === 'UNAUTHENTICATED' to trigger JWT refresh
                );
            }

            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        });
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
        const httpLink = new HttpLink({uri: uri});
        const client = new ApolloClient({
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-and-network',
                    errorPolicy: 'all',
                },
                query: {
                    fetchPolicy: 'cache-and-network',
                    errorPolicy: 'all',
                },
                mutate: {
                    errorPolicy: 'all',
                },
            },
            link: ApolloLink.from([
                errorLink,
                authLink,
                httpLink
            ]),
            cache: new InMemoryCache(),
            connectToDevTools: true,
        });

        return (
            <div>
                <ApolloProvider client={client}>
                    <I18nextProvider i18n={i18n}>
                        <Router history={hist}>
                            <Switch>
                                <Route exact path="/onboarding/logout" render={() => {
                                    console.log("User logged out, redirecting to map of the Netherlands.");
                                    return <Redirect to='/'/>
                                }}/>
                                {indexRoutes.map((prop, key) => {
                                    return <Route path={prop.path} key={key} component={prop.component}/>;
                                })}
                            </Switch>
                        </Router>
                    </I18nextProvider>
                </ApolloProvider>
                <CookieConsent
                    location="bottom"
                    buttonText="Accepteren"
                    cookieName="myAwesomeCookieName2"
                    style={{background: "#2B373B"}}
                    buttonStyle={{color: "#4e503b", fontSize: "13px"}}
                    expires={150}
                >
                    Deze website gebruikt cookies om te kunnen functioneren.{" "}
                        <span style={{fontSize: "10px"}}>
                            Door gebruik te maken van de site stemt u in met het plaatsen van dergelijke cookies
                        </span>
                </CookieConsent>
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

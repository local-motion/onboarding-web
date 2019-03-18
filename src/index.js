import React from "react";
import ReactDOM from "react-dom";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {setContext} from "apollo-link-context";

import "assets/scss/material-kit-react.css?v=1.2.0";

import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './RootReducer';
import { getJwtToken } from "./components/UserProfile/UserProfileReducer";
import { userSignedIn } from "./components/UserProfile/UserProfileActions";
import { closeConfirmationDialog } from "./components/ConfirmationDialog/ConfirmationDialogActions";

// Components to route to
import { ensurePlaygrounds } from "./components/Playground/PlaygroundActions";
import { publishGraphQLClient, publishApiBaseURL, PUBLISH_ENVIRONMENT } from "./misc/ConfigActions";
import { executeQuery, REST_GET } from "./api/QueryActions";
import { CONFIGURATION_PATH } from "./misc/Paths";
import App from "./App";


const environments = {
    "techoverflow-p.aws.abnamro.org": {
        aws: {
            cognito: {
                region: "eu-west-1",
                userPoolId: "eu-west-1_IvXqOMf7v",
                userPoolWebClientId: "5c2h1fooc1lvn4ir13k679cj9e",
                domain: "techoverflow-p.auth.eu-west-1.amazoncognito.com",
                redirectSignIn: "https://techoverflow-p.aws.abnamro.org/onboarding/signin",
                redirectSignOut: "https://techoverflow-p.aws.abnamro.org/onboarding/logout",
            }
        },
        api: {
            onboarding: "https://techoverflow-p.aws.abnamro.org/api/graphql",
            chatbox: "https://techoverflow-p.aws.abnamro.org/api/chatbox",
        }
    },
    "techoverflow-ta.aws.abnamro.org": {
        aws: {
            cognito: {
                region: "eu-west-1",
                userPoolId: "eu-west-1_jnPKAXCKm",
                userPoolWebClientId: "4334v709m540earh0e9h23mpie",
                domain: "techoverflow-ta.auth.eu-west-1.amazoncognito.com",
                redirectSignIn: "https://techoverflow-ta.aws.abnamro.org/onboarding/signin",
                redirectSignOut: "https://techoverflow-ta.aws.abnamro.org/onboarding/logout",
            }
        },
        api: {
            onboarding: "https://techoverflow-ta.aws.abnamro.org/api/graphql",
            chatbox: "https://techoverflow-ta.aws.abnamro.org/api/chatbox",
        }
    },
    "techoverflow-d.aws.nl.eu.abnamro.com": {
        aws: {
            cognito: {
                region: "eu-west-1",
                userPoolId: "eu-west-1_sgRa8Mtz4",
                userPoolWebClientId: "87d8qhatpdtpm3jnlv4ir7gqu",
                domain: "techoverflow-d.auth.eu-west-1.amazoncognito.com",
                redirectSignIn: "https://techoverflow-d.aws.nl.eu.abnamro.com/onboarding/signin",
                redirectSignOut: "https://techoverflow-d.aws.nl.eu.abnamro.com/onboarding/logout",
            }
        },
        api: {
            onboarding: "https://techoverflow-d.aws.nl.eu.abnamro.com/api/graphql",
            chatbox: "https://techoverflow-d.aws.nl.eu.abnamro.com/api/chatbox",
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
            onboarding: "http://localhost:8086/api/graphql",
            chatbox: "http://localhost:8086/api/chatbox",
        }
    }
};
const settings = environments[window.location.hostname] || environments["localhost"];
console.log("Host name is: " + window.location.hostname);
// console.log("Using settings:", settings);

const hostName = window.location.hostname
const baseUrl = hostName === 'localhost' ? 'http://localhost:3000/' : 'https://' + hostName + '/'
const apiBaseUrl = hostName === 'localhost' ? 'http://localhost:8086/api/' : 'https://' + hostName + '/api/'
console.log("apiBaseUrl is: " + apiBaseUrl);

const uri = process.env.ONBOARDING_API || settings.api.onboarding;
console.log('Using Onboarding API at ' + uri);



// Set up the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk))
store.dispatch(publishApiBaseURL(apiBaseUrl))

// Trigger a close of the confirmation dialog each time the history changes
window.onpopstate = () => {
    store.dispatch(closeConfirmationDialog())
}

// Fetch the configuration from the server, proceed after getting a successful result

store.dispatch(executeQuery({
    type: REST_GET,
    baseActionIdentifier: PUBLISH_ENVIRONMENT,
    query: apiBaseUrl + CONFIGURATION_PATH,
    onSuccess: configuration => {
        console.log("fetched config: ", configuration)

        const cognitoConfig = configuration.cognitoSettings

        // Set up the Cognito client
        const oauth = {
            awsCognito: {
                // domain: settings.aws.cognito.domain,
                domain: cognitoConfig.domain,
                scope: ['email', 'openid'],
                redirectSignIn: baseUrl + (hostName === 'localhost' ? 'onboarding/signin' : ''),    // TODO patch until userpool for local testing is updated
                redirectSignOut: baseUrl + (hostName === 'localhost' ? 'onboarding/logout' : ''),   // TODO patch until userpool for local testing is updated
                responseType: 'token', // 'token' for Implicit grant, 'code' for Authorization code grant
            }
        }
        Amplify.configure({
            Auth: {
                // region: settings.aws.cognito.region,
                // userPoolId: settings.aws.cognito.userPoolId,
                // userPoolWebClientId: settings.aws.cognito.userPoolWebClientId,
                region: cognitoConfig.region,
                userPoolId: cognitoConfig.userPoolId,
                userPoolWebClientId: cognitoConfig.userPoolWebClientId,
                mandatorySignIn: false,
                oauth: oauth
            }
        })

        // Set up the graphQL client
        const authLink = setContext( (req, {headers}) => {
            const jwtToken = getJwtToken(store.getState())

            return {
                headers: {
                    ...headers,
                    Authorization: jwtToken ? `Bearer ${jwtToken}` : ''
                }
            }
        })
        const httpLink = new HttpLink({uri: uri});
        const client = new ApolloClient({
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'no-cache',                // We are not using graphQL caching, but keep the state in the Redux store instead
                    errorPolicy: 'all',
                },
                query: {
                    fetchPolicy: 'no-cache',                // We are not using graphQL caching, but keep the state in the Redux store instead
                    // fetchPolicy: 'network-only',
                    errorPolicy: 'all',
                },
                mutate: {
                    errorPolicy: 'all',
                },
            },
            link: ApolloLink.from([
                // errorLink,
                authLink,
                httpLink
            ]),
            cache: new InMemoryCache(),
            connectToDevTools: true,
        })

        store.dispatch(publishGraphQLClient(client))            // Register the graphQL client in the global state


        // initialise global streams
        store.dispatch(ensurePlaygrounds())


        // Wrap the main app with providers
        const Wrapped = [
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <I18nextProvider i18n={i18n}>
                        <App className={"secure-app"}/>
                    </I18nextProvider>
                </ApolloProvider>
            </Provider>
        ]


        // Before (re)loading this page/application, check whether there is a authenticated user (which includes the session)
        // We wait for the result of the authenticatedUser call before starting the react application, so all elements are
        // initialised with the proper userinfo (especially Apollo's authLink)
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log('Found authenticated user: ', user)
                store.dispatch(userSignedIn(user))
            })
            .catch(error => {
                console.log('No authenticated user', error)
            })
            .finally(() => {
                const rootElement = document.querySelector("#root")
                ReactDOM.render(
                    Wrapped,
                    rootElement
                )
            })
    }
}))

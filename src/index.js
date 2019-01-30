import React from "react";
import ReactDOM from "react-dom";
import {Redirect} from 'react-router-dom'
// import {createBrowserHistory} from "history";
import {Route, Router, Switch} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {setContext} from "apollo-link-context";

import indexRoutes from "routes/index.jsx";
import "assets/scss/material-kit-react.css?v=1.2.0";

import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";

import CookieConsent from "react-cookie-consent";

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './RootReducer';
import { publishEnvironment, publishGraphQLClient } from "./GlobalActions";
import { history } from "./setup";
import { getJwtToken } from "./components/UserProfile/UserProfileReducer";
import CustomAuthenticator from "./auth/CustomAuthenticator";
import { userSignedIn } from "./components/UserProfile/UserProfileActions";


const environments = {
    "techoverflow-p.aws.abnamro.org": {
        aws: {
            cognito: {
                region: "eu-west-1",
                userPoolId: "eu-west-1_GKcEm18s8",
                userPoolWebClientId: "5aiel7vttkv6o359qpqbp5fuf0",
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
                userPoolId: "eu-west-1_bLoyM90KP",
                userPoolWebClientId: "6v6bpo1ka9sj18sntmec8kb7ll",
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
                userPoolId: "eu-west-1_oJjS9ieId",
                userPoolWebClientId: "61arbvommi7m6bishhq4jlrbd",
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
console.log("Using settings:", settings);

const uri = process.env.ONBOARDING_API || settings.api.onboarding;
console.log('Using Onboarding API at ' + uri);

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

// Set up the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk))
store.dispatch(publishEnvironment(settings))

// Set up the graphQL client
const authLink = setContext( (req, {headers}) => {
    const jwtToken = getJwtToken(store.getState())
    console.log("authlink fetching jwt token: ", jwtToken)

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
});

store.dispatch(publishGraphQLClient(client))            // Register the graphQL client in the global state



const App = class App extends React.Component {

    signInHandler = (username, password) => {
        console.log("App1 button is clicked ");
        Auth.signIn(username, password)
            .then(user => {
                console.log("Auth.signIn is success ", user);
                store.dispatch(userSignedIn(user))
                console.log("App1 signInHandler()");
                this.hist.push("/");
                
            })
            .catch(err => {/* this.signInError(err) */}); 
    }

    signOutHandler = () => {
        console.log("Clicked on Logout");
        this.setState({ status: "guest" });
    }

    render() {
        return (
            <div>
                <ApolloProvider client={client}>
                    <I18nextProvider i18n={i18n}>
                        <Router history={history}>
                            <Switch>
                                <Route exact path="/onboarding/logout" render={() => {
                                    console.log("User logged out, redirecting to map of the Netherlands.");
                                    return <Redirect to='/'/>
                                }}/>
                                <Route
                                    path="/login"
                                    exact
                                    key="Login"
                                    render={props => <CustomAuthenticator
                                        {...props}
                                        {...this.state}
                                        goForward={this.signInHandler}
                                        goBack={this.signOutHandler}>
                                    </CustomAuthenticator>
                                    }
                                />
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
                    cookieName="CookiesAccepted"
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

const Wrapped = [
    // <Provider store={store}><SecuredApp className={"secure-app"}/></Provider>
    <Provider store={store}><App className={"secure-app"}/></Provider>
];


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


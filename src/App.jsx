import React from "react";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import { setContext } from "apollo-link-context";
import Button from '@material-ui/core/Button';

import indexRoutes from "routes/index.jsx";
import "assets/scss/material-kit-react.css?v=1.2.0";

// https://<your_domain>/login?response_type=token&client_id=<your_app_client_id>&redirect_uri=<your_callback_url>
// https://smokefree-dev.auth.eu-west-1.amazoncognito.com/login?response_type=token&client_id=3nkh1qomocr39s893jf0dp44cd&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fonboarding%2Fsignin

const poolData = {
    UserPoolId: "eu-west-1_WsTxYUHyC", // your user pool ID
    ClientId: '3nkh1qomocr39s893jf0dp44cd', // generated in the AWS console
    Paranoia: 7 // an integer between 1 - 10
};
const CognitoUserPoolWrapper = require('cognito-user-pool')(poolData);


let hist = createBrowserHistory();

const App = class App extends React.Component {
    // TODO: Probably make SignOut a component
    logout = (event) => {
        event.preventDefault();
        // LogOut from AWS Cognito
        CognitoUserPoolWrapper.logout({
            "username": this.props.authenticatedUser,
            "idToken": this.props.authenticatedData.idToken,
            "accessToken": this.props.authenticatedData.accessToken
        }, (err, response) => {
            console.log("User Logged Out :" + JSON.stringify(response));
            if (response === "SUCCESS") {
                alert("User Logged out Successfully");
                this.props.signOut('signin');
            }
        });
    };

    render() {
        const {authenticatedUser, authenticatedData} = this.props;
        console.log(authenticatedUser);
        console.log(authenticatedData);
        if (!authenticatedData) {
            return "Logging in failed: " + authenticatedUser;
        }

        let uri = process.env.ONBOARDING_API || 'http://localhost:8086/graphql';
        console.log('ONBOARDING_API: ' + process.env.ONBOARDING_API);
        console.log('Using Onboarding API at ' + uri);

        const httpLink = new HttpLink({ uri: uri });
        const authLink = setContext(async (req, { headers }) => {
            let idToken = authenticatedData.idToken;
            // let accessToken = authenticatedData.accessToken;
            return {
                ...headers,
                headers: {
                    Authorization: `Bearer ${idToken}`
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
                <Button
                    label="Sign Out"
                    primary="true"
                    style={StyleSheet.button}
                    onClick={this.logout}
                    variant="contained"
                />
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
                </ApolloProvider>
            </div>
        )
    }
};

export default App;

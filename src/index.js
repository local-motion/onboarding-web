import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.2.0";

let hist = createBrowserHistory();

const rootEl = document.querySelector("#root");

const client = new ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
    // to a different host
    link: new HttpLink({
        // TODO: Point to loadbalancer instead
        uri: 'http://localhost:18085/graphql'
    }),
    cache: new InMemoryCache(),
});

ReactDOM.render(
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
    rootEl
);

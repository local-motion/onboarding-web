import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.2.0";

let hist = createBrowserHistory();

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} key={key} component={prop.component}/>;
                })}
            </Switch>
        </Router>
    </I18nextProvider>,
    document.getElementById("root")
);

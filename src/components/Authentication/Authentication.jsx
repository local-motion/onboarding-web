import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

//Authentication imports
import Amplify from "aws-amplify";
import {withAuthenticator} from 'aws-amplify-react';

import JSignOut from "auth/JSignOut";
import JSignUp from "auth/JSignUp";
import JSignIn from "auth/JSignIn";
import JConfirmSignUp from "auth/JConfirmSignUp";
import JConfirmSignIn from "auth/JConfirmSignIn";
import JForgotPassword from "./auth/JForgotPassword";
import JForgotPasswordReset from "./auth/JForgotPasswordReset";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

const style = {};

const SecuredApp = withAuthenticator(App, false, [
    <JSignIn />,
    <JSignUp />,
    <JForgotPassword />,
    <JForgotPasswordReset />,
    <JConfirmSignIn />,
    <JConfirmSignUp />,
    <AlwaysOn/>
]);

function Authentication({...props}) {
    const {classes } = this.props;
    return (
        <div className={"secure-app"}>
            <SecuredApp/>
        </div>
    );
}

export default withStyles(style)(Authentication);

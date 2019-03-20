import React from "react";
import JSignIn from "./JSignIn";
import JSignUp from "./JSignUp";
import JForgotPassword from "./JForgotPassword";
import JForgotPasswordReset from "./JForgotPasswordReset";
import JConfirmSignIn from "./JConfirmSignIn";
import JConfirmSignUp from "./JConfirmSignUp";
import { Authenticator } from 'aws-amplify-react';


const CustomAuthenticator = (props) => {
    console.log("CustomAuthenticator props", props, props.changeMode);
    return (

        <Authenticator
            hideDefault >

            {/* <JSignIn {...props} onSignIn={props.onSignIn} /> */}
            <JSignIn onSignIn={props.onSignIn} />
            <JSignUp />
            <JForgotPassword />
            <JForgotPasswordReset />
            <JConfirmSignIn />
            <JConfirmSignUp />
        </Authenticator>
    );
}

export default CustomAuthenticator; 
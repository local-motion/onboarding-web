import React from "react";
import { Helmet } from "react-helmet";
import { Authenticator } from 'aws-amplify-react';
import JSignIn from "./JSignIn";
import JSignUp from "./JSignUp";
import JForgotPassword from "./JForgotPassword";
import JForgotPasswordReset from "./JForgotPasswordReset";
import JConfirmSignIn from "./JConfirmSignIn";
import JConfirmSignUp from "./JConfirmSignUp";
import VerificationLinkHandler from "./VerificationLinkHandler";
import { titlePrefix } from "../misc/WorkspaceHelpers";


const CustomAuthenticator = (props) => {
    return (
      <React.Fragment>
          <Helmet>
              <title>{titlePrefix} | Inloggen</title>
          </Helmet>
          <Authenticator
            hideDefault>
              <JSignIn setCta={props.setCta} unsetCta={props.unsetCta} onSignIn={props.onSignIn}/>
              <JSignUp/>
              <JForgotPassword/>
              <JForgotPasswordReset/>
              <JConfirmSignIn/>
              <JConfirmSignUp/>
              <VerificationLinkHandler/>
          </Authenticator>
      </React.Fragment>
    );
}

export default CustomAuthenticator; 
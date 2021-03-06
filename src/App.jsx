import React from "react";
import {Redirect} from 'react-router-dom'
import {Route, Router, Switch} from "react-router-dom";

import "assets/scss/material-kit-react.css?v=1.2.0";

import CookieConsent from "react-cookie-consent";
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";

import { history } from "./setup";
import { userSignedIn } from "./components/UserProfile/UserProfileActions";
import WrappedSimpleDialog from "./components/SimpleDialog/WrappedSimpleDialog";

// Components to route to
import Workspace from "views/Workspace/Workspace.jsx";
import Onboarding from "views/Onboarding/Onboarding.jsx";
import About from "views/About/About.jsx";
import Contact from "views/About/Contact.jsx";
import FAQ from "views/About/FAQ.jsx";
import Terms from "views/Legal/Terms.jsx";
import Privacy from "views/Legal/Privacy.jsx";
import WorkspaceJoin from "./views/Workspace/Sections/WorkspaceJoin";
import UserProfile from "./views/UserProfile/UserProfile";
import { titlePrefix } from "./misc/WorkspaceHelpers";
import Authenticator from "./authentication/Authenticator";
import WrappedWarningSnackbar from "components/StatusNotification/WrappedWarningSnackbar";
import PublicBetaNotification from "./components/PublicBetaNotification/PublicBetaNotification";
import AdminJob from "views/AdminJob/AdminJob";
import DeveloperControlCenter from "views/Developer/DeveloperControlCenter";
import { logdebug } from "utils/Logging";
  

const mapDispatchToProps = (dispatch) => ({
    onUserSignedIn: user => dispatch(userSignedIn(user))
});
  
  
class App extends React.Component {

    signInHandler = (username) => {
        logdebug('signed in with ' + username);
        this.props.onUserSignedIn(username);
    };

    render() {
        return (
            <div>
                <Helmet>
                    <title>{titlePrefix} | Home</title>
                </Helmet>
                <Router history={history}>
                    <PublicBetaNotification />

                    <Switch>
                        <Route exact path="/inloggen" key="Login" render={ props => <Authenticator onSignIn={this.signInHandler} isInCard={false}/> } />

                        {/* This route is required for now to capture the links from the verification mails */}
                        <Route exact path="/login" key="Login" render={ props => <Authenticator onSignIn={this.signInHandler}  isInCard={false}/> } />

                        <Route exact path="/over-ons" key="Who are we" component={About}/>
                        <Route exact path="/contact" key="Contact us" component={Contact}/>
                        <Route exact path="/mijn-profiel" key="My Profile" component={UserProfile}/>
                        <Route exact path="/mijn-acties" key="My Acties" component={UserProfile}/>
                        <Route exact path="/privacyverklaring" key="Privacy Statement" component={Privacy}/>
                        <Route exact path="/veelgestelde-vragen" key="Frequently Asked Questions" component={FAQ}/>
                        <Route exact path="/gebruiksvoorwaarden" key="Terms of Use" component={Terms}/>

                        <Route exact path="/actie/" key="Workspace" component={Workspace}/>

                        
                        <Route exact path="/actie/inloggen" key="WorkspaceLogin" render={props => <Workspace {...props} signInHandler={this.signInHandler}/>}/>
                        <Route exact path="/actie/starten" key="WorkspaceAddFindPlayground" component={Workspace}/>

                        <Route exact path="/actie/:initiativeName/aansluiten" key="WorkspaceJoin" component={WorkspaceJoin}/>
                        <Route exact path="/actie/:initiativeName/inloggen" key="WorkspaceJoin" render={props => <Workspace {...props} signInHandler={this.signInHandler}/>}/>

                        <Route path="/actie/:initiativeName/" component={Workspace}/>

                        <Route exact path="/" key="Onboarding" component={Onboarding}/>
                        <Route exact path="/admin" key="Admin" component={AdminJob}/>
                        <Route exact path="/developer" key="Developer" component={DeveloperControlCenter}/>

                        { /* If none of the paths match, redirect to /*/ }
                        <Route path="/" render={ () => (<Redirect to='/'/>) } />

                    </Switch>
                </Router>
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

                <WrappedSimpleDialog/>
                <WrappedWarningSnackbar/>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(App)

import React from "react";
import {Redirect} from 'react-router-dom'
import {Route, Router, Switch} from "react-router-dom";

import "assets/scss/material-kit-react.css?v=1.2.0";

import CookieConsent from "react-cookie-consent";

import { history } from "./setup";
import CustomAuthenticator from "./auth/CustomAuthenticator";
import { userSignedIn } from "./components/UserProfile/UserProfileActions";
import WrappedSimpleDialog from "./components/SimpleDialog/WrappedSimpleDialog";
import { connect } from 'react-redux'

// Components to route to
import Workspace from "views/Workspace/Workspace.jsx";
import Onboarding from "views/Onboarding/Onboarding.jsx";
import About from "views/About/About.jsx";
import Contact from "views/About/Contact.jsx";
import FAQ from "views/About/FAQ.jsx";
import Terms from "views/Legal/Terms.jsx";
import Privacy from "views/Legal/Privacy.jsx";
import WorkspaceJoin from "./views/Workspace/Sections/WorkspaceJoin";
  
const mapDispatchToProps = (dispatch) => ({
    onUserSignedIn: user => dispatch(userSignedIn(user))
});
  
  
class App extends React.Component {

    signInHandler = (username) => {
        console.log('signed in with ' + username);
        this.props.onUserSignedIn(username);
    };

    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/inloggen" key="Login" render={ props => <CustomAuthenticator onSignIn={this.signInHandler}/> } />
                        {/* <Route exact path="/verify?type=:verificationType&user=:username&code=:verificationCode" key="Verify" render={ props => <CustomAuthenticator onSignIn={this.signInHandler}/> } /> */}
                        {/* <Route exact path="/verify" key="Verify" render={ props => <CustomAuthenticator onSignIn={this.signInHandler}/> } /> */}

                        <Route exact path="/over-ons" key="Who are we" component={About}/>
                        <Route exact path="/contact" key="Contact us" component={Contact}/>
                        <Route exact path="/privacyverklaring" key="Privacy Statement" component={Privacy}/>
                        <Route exact path="/veelgestelde-vragen" key="Frequently Asked Questions" component={FAQ}/>
                        <Route exact path="/gebruiksvoorwaarden" key="Terms of Use" component={Terms}/>

                        <Route exact path="/actie/" key="Workspace" component={Workspace}/>

                        {/* <Route exact path="/actie/:initiativeName" key="WorkspacePage" component={Workspace}/>
                        <Route exact path="/actie/:initiativeName/inloggen" key="WorkspaceLogin" render={ props => <Workspace {...props} signInHandler={this.signInHandler}/> } /> */}
                        
                        <Route exact path="/actie/inloggen" key="WorkspaceLogin" render={props => <Workspace {...props} signInHandler={this.signInHandler}/>}/>
                        <Route exact path="/actie/starten" key="WorkspaceAddFindPlayground" component={Workspace}/>

                        <Route exact path="/actie/:initiativeName/join" key="WorkspaceJoin" component={WorkspaceJoin}/>
                        <Route exact path="/actie/:initiativeName/inloggen" key="WorkspaceJoin" render={props => <Workspace {...props} signInHandler={this.signInHandler}/>}/>

                        <Route path="/actie/:initiativeName/" component={Workspace}/>

                        <Route exact path="/" key="Onboarding" component={Onboarding}/>

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
                
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(App)

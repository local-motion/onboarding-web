import React from "react";
import {Redirect} from 'react-router-dom'
import {Route, Router, Switch} from "react-router-dom";

import "assets/scss/material-kit-react.css?v=1.2.0";

import CookieConsent from "react-cookie-consent";

import { history } from "./setup";
import CustomAuthenticator from "./auth/CustomAuthenticator";
import { userSignedIn } from "./components/UserProfile/UserProfileActions";
import WrappedConfirmationDialog from "./components/ConfirmationDialog/WrappedConfirmationDialog";
import { connect } from 'react-redux'

// Components to route to
import Workspace from "views/Workspace/Workspace.jsx";
import Onboarding from "views/Onboarding/Onboarding.jsx";
import About from "views/About/About.jsx";
import Contact from "views/About/Contact.jsx";
import FAQ from "views/About/FAQ.jsx";
import Terms from "views/Legal/Terms.jsx";
import Privacy from "views/Legal/Privacy.jsx";
import WorkspaceWelcome from "./views/Workspace/Sections/WorkspaceWelcome/WorkspaceWelcome";
import WorkspaceJoin from "./views/Workspace/Sections/WorkspaceJoin";
import Team from "./views/Workspace/Sections/Team";

const mapStateToProps = (state) => ({
  })
  
const mapDispatchToProps = (dispatch) => ({
onUserSignedIn: user => dispatch(userSignedIn(user))
})
  
  
class App extends React.Component {

    signInHandler = (username) => {
        console.log('signed in with ' + username);
        this.props.onUserSignedIn(username);
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/login" key="Login" render={ props => <CustomAuthenticator onSignIn={this.signInHandler}/> } />

                        <Route exact path="/about" key="Who are we" component={About}/>
                        <Route exact path="/contact" key="Contact us" component={Contact}/>
                        <Route exact path="/privacy" key="Privacy Statement" component={Privacy}/>
                        <Route exact path="/faq" key="Frequently Asked Questions" component={FAQ}/>
                        <Route exact path="/terms" key="Terms of Use" component={Terms}/>

                        <Route exact path="/workspace/" key="Workspace" component={Workspace}/>
                        <Route exact path="/workspace/:initiativeId" key="WorkspacePage" component={Workspace}/>
                        <Route exact path="/workspace/:initiativeId/welcome" key="WorkspaceWelcome" component={WorkspaceWelcome}/>
                        <Route exact path="/workspace/:initiativeId/login" key="WorkspaceLogin" render={ props => <Workspace {...props} signInHandler={this.signInHandler}/> } />
                        <Route exact path="/workspace/:initiativeId/join" key="WorkspaceJoin" component={WorkspaceJoin}/>
                        <Route exact path="/workspace/:initiativeId/team" key="WorkspaceTeam" component={Team}/>
                        <Route exact path="/workspace/:initiativeId/add-team-member" key="AddTeamMember" component={Workspace}/>
                        <Route exact path="/workspace/:initiativeId/flyer" key="Flyer" component={Workspace}/>
                        <Route exact path="/workspace/:initiativeId/involve-administrator" key="InvolveAdministrator" component={Workspace}/>
                        <Route exact path="/workspace/:initiativeId/commitment" key="Commitment" component={Workspace}/>
                        <Route exact path="/workspace/:initiativeId/pick-date" key="PickDate" component={Workspace}/>
                        <Route exact path="/workspace/:initiativeId/shout" key="Shout" component={Workspace}/>
                        <Route exact path="/workspace/:initiativeId/signonfence" key="Signonfence" component={Workspace}/>
                        <Route exact path="/workspace/:initiativeId/celebrate" key="Celebrate" component={Workspace}/>
                        <Route exact path="/workspace/:initiativeId/magnify" key="Magnify" component={Workspace}/>

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

                <WrappedConfirmationDialog/>
                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

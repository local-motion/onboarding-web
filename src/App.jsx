import React from "react";
import {Redirect} from 'react-router-dom'
import {Route, Router, Switch} from "react-router-dom";

import "assets/scss/material-kit-react.css?v=1.2.0";

import { Auth } from "aws-amplify";

import CookieConsent from "react-cookie-consent";
import { connect } from 'react-redux';
import querySearch from "stringquery";

import { history } from "./setup";
import CustomAuthenticator from "./auth/CustomAuthenticator";
import { userSignedIn } from "./components/UserProfile/UserProfileActions";
import WrappedConfirmationDialog from "./components/ConfirmationDialog/WrappedConfirmationDialog";
import { joinInitiative } from "./components/Playground/PlaygroundActions";

// Components to route to
import Workspace from "views/Workspace/Workspace.jsx";
import Onboarding from "views/Onboarding/Onboarding.jsx";
import About from "views/About/About.jsx";
import Contact from "views/About/Contact.jsx";
import FAQ from "views/About/FAQ.jsx";
import Terms from "views/Legal/Terms.jsx";
import Privacy from "views/Legal/Privacy.jsx";
import WorkspaceWelcome from "./views/Workspace/Sections/WorkspaceWelcome/WorkspaceWelcome";
import Team from "./views/Workspace/Sections/Team";


const mapStateToProps = (state) => ({
  playgrounds: state.playgrounds.playgrounds,
  })
  
const mapDispatchToProps = (dispatch) => ({
  onUserSignedIn: user => dispatch(userSignedIn(user)),
  joinInitiative: initiativeId => dispatch(joinInitiative(initiativeId)),
});
  
  
class App extends React.Component {

    joinAndOpenInitiative(user, history) {
        const searchQuery = querySearch(history.location.search);

        const url = searchQuery['from'];
        const id = searchQuery['id'];

        const playground = this.props.playgrounds
          .find(({ id: playgroundId }) => playgroundId === id);

        if (playground) {
          const isUserAlreadyJoinedToInitiative = playground.volunteers
            .find(({ userName }) => userName === user.username);

          if (isUserAlreadyJoinedToInitiative) {
            console.log('User is already joined to the initiative');

            history.push(url);
            return;
          }
        }

        if (url && id) {
            this.props.joinInitiative(id);
            history.push(url);
            return;
        }

        history.goBack();
    }

    signInHandler = (username, password, history) => {
        Auth.signIn(username, password)
            .then(user => {
                console.log("Auth.signIn is success ", user);
                this.props.onUserSignedIn(user)
                  .then(() => this.joinAndOpenInitiative(user, history));
                console.log("App1 signInHandler()");
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
                <Router history={history}>
                    <Switch>
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

                        <Route exact path="/about" key="Who are we" component={About}/>
                        <Route exact path="/contact" key="Contact us" component={Contact}/>
                        <Route exact path="/privacy" key="Privacy Statement" component={Privacy}/>
                        <Route exact path="/faq" key="Frequently Asked Questions" component={FAQ}/>
                        <Route exact path="/terms" key="Terms of Use" component={Terms}/>
                        
                        <Route exact path="/workspace/:initiativeId" key="WorkspaceWelcome" component={WorkspaceWelcome}/>
                        <Route exact path="/workspace/:initiativeId/team" key="Team" component={Team}/>
                        <Route exact path="/workspace/:initiativeId/phase/:phaseId" key="Workspace" component={Workspace}/>

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

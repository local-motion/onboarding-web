import React, { PureComponent } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import classNames from "classnames";

import { StyledStepButton, StyledStepLink } from "../../../components/Step/Step";
import ExpansionPhase from "../../../components/ExpansionPhase/ExpansionPhase";
import CustomAuthenticator from "../../../auth/CustomAuthenticator";
import GetSupportCard from "../Cards/GetSupportCard";
import FlyersCard from "../Cards/FlyersCard";
import InvolveManagerCard from "../Cards/InvolveManagerCard";
import DecideSmokefreeCard from "../Cards/DecideSmokefreeCard";
import SetADateCard from "../Cards/SetADateCard";
import ShareDecisionCard from "../Cards/ShareDecisionCard";
import MakeItVisibleCard from "../Cards/MakeItVisibleCard";
import ShareSmokefreeCard from "../Cards/ShareSmokefreeCard";
import ValidateCard from "../Cards/ValidateCard";
import AddPlayground from "../../Onboarding/Sections/AddPlayground";
import Header from "../../../components/Header/Header";
import HeaderLinks from "../../../components/Header/HeaderLinks";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Footer from "../../../components/Footer/Footer";
import WorkspaceWelcome from "./WorkspaceWelcome/WorkspaceWelcome";


class WorkspacePage extends PureComponent {
    constructor(props) {
        super(props);

        this.toggleAddPlayground = this.toggleAddPlayground.bind(this);
        this.selectPhase = this.selectPhase.bind(this);
    }

    state = {
        isAddPlaygroundOpen: false,
        expandedPhase: 'none',
    };

    componentDidMount() {
        this.selectPhase(this.props.activePhase);
    }

    selectPhase(phase) {
        this.setState(({ expandedPhase }) =>
          ({ expandedPhase: expandedPhase !== phase ? phase : 'none' }));
    }

    gotoWorkspaceWelcomePage = () => {
        this.props.history.push(`/workspace/${this.props.match.params.initiativeId}`);
    };

    toggleAddPlayground() {
        this.setState(({ isAddPlaygroundOpen }) => ({ isAddPlaygroundOpen: !isAddPlaygroundOpen }));
    }

    render() {
        const { phases, playground, user, classes, ...rest } = this.props;
        const { expandedPhase, isAddPlaygroundOpen } = this.state;

        return (
          <React.Fragment>
              <Header
                playground={playground}
                rightLinks={<HeaderLinks />}
                showStats
                fixed
                color="white"
                changeColorOnScroll={{
                    height: 50,
                    color: "white"
                }}
                {...rest}
              />

              <div className={classNames(classes.container + " phase-explainer-container")}>

                  <GridContainer className={"grid-container"}>
                      <GridItem xs={12} sm={12} md={12} className={"workspace-phase-explainer"}>
                          <div className={"title-wrapper"}>
                              <h2 className={classes.playgroundTitle}>{playground.name}</h2>
                              <div className={"explainer-actions"}>
                                  <Button
                                    className={"btn btn-highlight"}
                                    onClick={this.gotoWorkspaceWelcomePage}
                                    style={{textAlign: 'center'}}
                                  >
                                      <span>Ga terug naar de startpagina</span>
                                  </Button>
                              </div>
                          </div>
                      </GridItem>

                      <Paper className={classes.workspacePaper}>
                          <GridItem xs={4} sm={4} md={3} className={"workspace-menu-column"}>
                              <ExpansionPhase
                                title={phases.firstPhase.title}
                                icon={phases.firstPhase.icon}
                                expandedIcon={phases.firstPhase.expandedIcon}
                                expandedPhase={expandedPhase}
                                onChange={this.selectPhase}
                              >
                                  {!playground && <StyledStepButton onClick={this.toggleAddPlayground} name="Speeltuin toevoegen" />}
                                  {!user && <StyledStepLink link={`/workspace/${playground.id}/login`} disabled={user} name="Inloggen" />}

                                  {phases.firstPhase.steps.map(step=> <StyledStepLink key={step.name} {...step} />)}
                              </ExpansionPhase>
                              <ExpansionPhase
                                title={phases.secondPhase.title}
                                icon={phases.secondPhase.icon}
                                expandedIcon={phases.secondPhase.expandedIcon}
                                expandedPhase={expandedPhase}
                                onChange={this.selectPhase}
                              >
                                  {phases.secondPhase.steps.map(step => <StyledStepLink key={step.name} {...step} />)}
                              </ExpansionPhase>
                              <ExpansionPhase
                                title={phases.thirdPhase.title}
                                icon={phases.thirdPhase.icon}
                                expandedIcon={phases.thirdPhase.expandedIcon}
                                expandedPhase={expandedPhase}
                                onChange={this.selectPhase}
                              >
                                  {phases.thirdPhase.steps.map(step => <StyledStepLink key={step.name} {...step} />)}
                              </ExpansionPhase>
                          </GridItem>

                          <GridItem xs={8} sm={8} md={9} className={"workspace-content-column"}>
                              <Switch>
                                  <Route exact path="/workspace/:initiativeId/login" key="WorkspaceLogin"
                                         render={(props) => <CustomAuthenticator {...props} onSignIn={this.props.signInHandler}/>} />

                                  <Route exact path="/workspace/:initiativeId" key="WorkspaceWelcome"
                                         render={(props) => <WorkspaceWelcome {...props} playground={playground} user={user} />}/>

                                  <Route exact path="/workspace/:initiativeId/add-team-member" key="AddTeamMember"
                                         render={(props) => <GetSupportCard {...props} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/flyer" key="Flyer"
                                         render={(props) => <FlyersCard {...props} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/involve-administrator" key="InvolveAdministrator"
                                         render={(props) => <InvolveManagerCard {...props} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/commitment" key="Commitment"
                                         render={(props) => <DecideSmokefreeCard {...props} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/pick-date" key="PickDate"
                                         render={(props) => <SetADateCard {...props} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/shout" key="Shout"
                                         render={(props) => <ShareDecisionCard {...props} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/signonfence" key="Signonfence"
                                         render={(props) => <MakeItVisibleCard {...props} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/celebrate" key="Celebrate"
                                         render={(props) => <ShareSmokefreeCard {...props} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/magnify" key="Magnify"
                                         render={(props) => <ValidateCard {...props} playground={playground} user={user} />}/>
                              </Switch>
                          </GridItem>
                      </Paper>
                  </GridContainer>
              </div>

              <AddPlayground isOpen={isAddPlaygroundOpen} toggleOpen={this.toggleAddPlayground} />
              <Footer />
          </React.Fragment>
        );
    }
}

export default withRouter(WorkspacePage);
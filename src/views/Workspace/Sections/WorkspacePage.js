import React, { PureComponent } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
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
import WorkspaceWelcomeContent from "./WorkspaceWelcome/WorkspaceWelcomeContent";
import PlaygroundChatBox from "../../../components/Chatbox/PlaygroundChatBox";
import {
    getNextStep,
    getOpenedStepTitle,
    getPrevStep,
    playgroundLabels,
} from "../../../misc/WorkspaceHelpers";

const PaginationIcon = (props) => (
  <SvgIcon {...props} width="80" height="160" viewBox="0 0 100 200">
      <g transform="translate(0,180) scale(0.1,-0.1)" fill="#00197a" stroke="none">
          <path d="M631 1573 c-36 -34 -590 -669 -614 -703 -19 -28 -23 -101 -6 -131 12
-24 576 -671 620 -711 23 -22 39 -28 73 -28 37 0 48 5 70 31 26 31 35 93 19
135 -4 10 -127 155 -275 323 -147 168 -268 308 -268 311 0 3 124 146 275 319
l275 313 0 53 c0 43 -5 60 -26 84 -22 26 -33 31 -70 31 -34 0 -50 -6 -73 -27z"></path>
      </g>
  </SvgIcon>
);

class WorkspacePage extends PureComponent {
    constructor() {
        super();

        this.toggleAddPlayground = this.toggleAddPlayground.bind(this);
        this.clickPhase = this.clickPhase.bind(this);
        this.gotoPrevStep = this.gotoPrevStep.bind(this);
        this.gotoNextStep = this.gotoNextStep.bind(this);
    }

    state = {
        isAddPlaygroundOpen: false,
        expandedPhase: 'none',
    };

    componentDidMount() {
        this.selectActivePhase();
    }

    getActivePhase() {
        const { location: { pathname }, phases } = this.props;

        const openedStepTitle = getOpenedStepTitle(phases, pathname);

        return openedStepTitle !== null
          ? openedStepTitle
          : playgroundLabels[0];
    }

    selectActivePhase() {
        const activePhase = this.getActivePhase();

        this.selectPhase(activePhase);
    }

    selectPhase(phase) {
        this.setState(({ expandedPhase: phase }));
    }

    clickPhase(phase) {
        this.selectPhase(this.state.expandedPhase !== phase ? phase : 'none');
    }

    toggleAddPlayground() {
        this.setState(({ isAddPlaygroundOpen }) => ({ isAddPlaygroundOpen: !isAddPlaygroundOpen }));
    }

    gotoPrevStep(prev) {
        const { history, startPathUrl } = this.props;
        const url = startPathUrl + prev.stepLink;

        history.push(url);
        this.selectPhase(prev.title);
    }

    gotoNextStep(next) {
        const { history, startPathUrl } = this.props;
        const url = startPathUrl + next.stepLink;

        history.push(url);
        this.selectPhase(next.title);
    }

    render() {
        const { phases, playground, user, location: { pathname }, startPathUrl, classes, ...rest } = this.props;
        const { expandedPhase, isAddPlaygroundOpen } = this.state;

        const prev = getPrevStep(phases, pathname);
        const next = getNextStep(phases, pathname);

        const openedStepTitle = getOpenedStepTitle(phases, pathname);

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
                          </div>
                      </GridItem>

                      <Paper className={classes.workspacePaper}>
                          <GridItem xs={4} sm={4} md={3} className={"workspace-menu-column"}>
                              <ExpansionPhase
                                title={phases.firstPhase.title}
                                icon={phases.firstPhase.icon}
                                expandedIcon={phases.firstPhase.expandedIcon}
                                expandedPhase={expandedPhase}
                                onChange={this.clickPhase}
                              >
                                  {!playground && <StyledStepButton onClick={this.toggleAddPlayground} name="Speeltuin toevoegen" />}

                                  {phases.firstPhase.steps.map(step=> <StyledStepLink user={user} startPathUrl={startPathUrl} key={step.name} {...step} />)}
                              </ExpansionPhase>
                              <ExpansionPhase
                                title={phases.secondPhase.title}
                                icon={phases.secondPhase.icon}
                                expandedIcon={phases.secondPhase.expandedIcon}
                                expandedPhase={expandedPhase}
                                onChange={this.clickPhase}
                              >
                                  {phases.secondPhase.steps.map(step => <StyledStepLink user={user} startPathUrl={startPathUrl} key={step.name} {...step} />)}
                              </ExpansionPhase>
                              <ExpansionPhase
                                title={phases.thirdPhase.title}
                                icon={phases.thirdPhase.icon}
                                expandedIcon={phases.thirdPhase.expandedIcon}
                                expandedPhase={expandedPhase}
                                onChange={this.clickPhase}
                              >
                                  {phases.thirdPhase.steps.map(step => <StyledStepLink user={user} startPathUrl={startPathUrl} key={step.name} {...step} />)}
                              </ExpansionPhase>
                              <ExpansionPhase
                                title={phases.community.title}
                                icon={phases.community.icon}
                                expandedIcon={phases.community.expandedIcon}
                                expandedPhase={expandedPhase}
                                onChange={this.clickPhase}
                              >
                                  {phases.community.steps.map(step => <StyledStepLink user={user} startPathUrl={startPathUrl} key={step.name} {...step} />)}
                              </ExpansionPhase>
                          </GridItem>

                          <GridItem xs={8} sm={8} md={9} className={"workspace-content-column"}>
                              <Switch>
                                  <Route exact path="/workspace/:initiativeId/login" key="WorkspaceLogin"
                                         render={(props) => <CustomAuthenticator {...props} onSignIn={this.props.signInHandler}/>} />

                                  <Route exact path="/workspace/:initiativeId" key="WorkspaceWelcome"
                                         render={(props) => <WorkspaceWelcomeContent {...props} playground={playground} user={user} />}/>

                                  <Route exact path="/workspace/:initiativeId/team" key="WorkspaceTeam"
                                         render={(props) => <PlaygroundChatBox {...props} playground={playground} user={user} />}/>
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

                              {openedStepTitle && (
                                <div className={"workspace-content-pagination"}>
                                    {prev.stepLink ? (
                                      <Button onClick={() => this.gotoPrevStep(prev)} variant="outlined" className={"pagination-button"}>
                                          <PaginationIcon />
                                      </Button>
                                    ) : <div style={{ width: '45px' }} />}

                                    {user && <Button variant="contained" className={"pagination-button-step"}>ik heb deze stap volbracht!</Button>}

                                    {next.stepLink ? (
                                      <Button onClick={() => this.gotoPrevStep(next)} variant="outlined" className={"pagination-button"}>
                                          <PaginationIcon className={"pagination-button-icon-right"} />
                                      </Button>
                                    ) : <div style={{ width: '45px' }} />}
                                </div>
                              )}
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
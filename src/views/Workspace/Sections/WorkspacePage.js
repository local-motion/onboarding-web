import React, { PureComponent } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import Check from "@material-ui/icons/Check";
import classNames from "classnames";

import { StyledStepButton, StyledStepLink } from "../../../components/Step/Step";
import ExpansionPhase from "../../../components/ExpansionPhase/ExpansionPhase";
import CustomAuthenticator from "../../../auth/CustomAuthenticator";
import RecruitVolunteersCard from "../Cards/RecruitVolunteersCard";
import CollectOpinionsCard from "../Cards/CollectOpinionsCard";
import DistributeFlyersCard from "../Cards/DistributeFlyersCard";
import ContactManagementCard from "../Cards/ContactManagementCard";
import WeWillBecomeSmokefreeCard from "../Cards/WeWillBecomeSmokefreeCard";
import ChooseProperIntroductionDateCard from "../Cards/ChooseProperIntroductionDateCard";
import CommunicateAboutSmokefreeAgreementCard from "../Cards/CommunicateAboutSmokefreeAgreementCard";
import ShowPlaygroundIsSmokefreeCard from "../Cards/ShowPlaygroundIsSmokefreeCard";
import WeAreSmokefreeCard from "../Cards/WeAreSmokefreeCard";
import EvaluateCard from "../Cards/EvaluateCard";
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
        this.setCta = this.setCta.bind(this);
        this.unsetCta = this.unsetCta.bind(this);
        this.gotoPrevStep = this.gotoPrevStep.bind(this);
        this.gotoNextStep = this.gotoNextStep.bind(this);
    }

    state = {
        isAddPlaygroundOpen: false,
        expandedPhase: 'none',
        ctaText: 'ik heb deze stap volbracht',
        ctaAction: () => null,
        ctaDisabled: () => true,
        ctaDone: false,
        CustomButton: null,
    };

    componentDidMount() {
        this.selectActivePhase();
    }

    selectActivePhase() {
        const { location: { pathname }, phases } = this.props;

        const activePhase = getOpenedStepTitle(phases, pathname);

        this.selectPhase(activePhase);
    }

    selectPhase(phase) {
        this.setState({ expandedPhase: phase });
    }

    clickPhase(phase) {
        this.selectPhase(this.state.expandedPhase !== phase ? phase : 'none');
    }

    setCta({ ctaText, ctaAction, ctaDisabled, ctaDone, CustomButton }) {
        this.setState({ ctaText, ctaAction, ctaDisabled, ctaDone, CustomButton });
    }

    unsetCta() {
        this.setState({
            ctaText: 'ik heb deze stap volbracht',
            ctaAction: () => null,
            ctaDisabled: () => true,
            ctaDone: false,
            CustomButton: null,
        });
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

    renderCtaButton() {
        const { ctaText, ctaAction, ctaDisabled, ctaDone, CustomButton } = this.state;

        if (CustomButton) {
            return <CustomButton />;
        }

        return (
          <Button onClick={ctaAction} variant="contained" className={"pagination-button-step"} disabled={ctaDisabled()}>
              {ctaText} {ctaDone && <Check className={this.props.classes.ctaDone} />}
          </Button>
        )
    }

    render() {
        const { phases, playground, user, location: { pathname }, startPathUrl, classes, ...rest } = this.props;
        const { expandedPhase, isAddPlaygroundOpen, ctaText } = this.state;

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

                                  <Route exact path="/workspace/:initiativeId" key="WorkspaceWelcome"
                                         render={(props) => <WorkspaceWelcomeContent {...props} playground={playground} user={user} />}/>

                                  <Route exact path="/workspace/:initiativeId/login" key="WorkspaceLogin"
                                         render={(props) => <CustomAuthenticator {...props} setCta={this.setCta} unsetCta={this.unsetCta} onSignIn={this.props.signInHandler}/>} />
                                  <Route exact path="/workspace/:initiativeId/add-team-member" key="RecruitVolunteers"
                                         render={(props) => <RecruitVolunteersCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/flyer" key="DistributeFlyers"
                                         render={(props) => <DistributeFlyersCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/meningen-inventariseren" key="CollectOpinions"
                                         render={(props) => <CollectOpinionsCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/involve-administrator" key="ContactManagement"
                                         render={(props) => <ContactManagementCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/commitment" key="WeWillBecomeSmokefree"
                                         render={(props) => <WeWillBecomeSmokefreeCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>

                                  <Route exact path="/workspace/:initiativeId/pick-date" key="ChooseProperIntroductionDate"
                                         render={(props) => <ChooseProperIntroductionDateCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/shout" key="CommunicateAboutSmokefreeAgreement"
                                         render={(props) => <CommunicateAboutSmokefreeAgreementCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/signonfence" key="ShowPlaygroundIsSmokefree"
                                         render={(props) => <ShowPlaygroundIsSmokefreeCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>

                                  <Route exact path="/workspace/:initiativeId/celebrate" key="WeAreSmokefree"
                                         render={(props) => <WeAreSmokefreeCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                  <Route exact path="/workspace/:initiativeId/magnify" key="Evaluate"
                                         render={(props) => <EvaluateCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>

                                  <Route exact path="/workspace/:initiativeId/team" key="WorkspaceTeam"
                                         render={(props) => <PlaygroundChatBox {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                              </Switch>

                              {openedStepTitle && (
                                <div className={"workspace-content-pagination"}>
                                    {prev.stepLink ? (
                                      <Button onClick={() => this.gotoPrevStep(prev)} variant="outlined" className={"pagination-button"}>
                                          <PaginationIcon />
                                      </Button>
                                    ) : <div className={classes.noButton} />}

                                    {ctaText && this.renderCtaButton()}

                                    {next.stepLink ? (
                                      <Button onClick={() => this.gotoPrevStep(next)} variant="outlined" className={"pagination-button"}>
                                          <PaginationIcon className={"pagination-button-icon-right"} />
                                      </Button>
                                    ) : <div className={classes.noButton} />}
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
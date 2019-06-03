import React, { PureComponent } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import Check from "@material-ui/icons/Check";
import classNames from "classnames";

import { StyledStepLink } from "../../../components/Step/Step";
import ExpansionPhase from "../../../components/ExpansionPhase/ExpansionPhase";
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
import Header from "../../../components/Header/Header";
import HeaderLinks from "../../../components/Header/HeaderLinks";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Footer from "../../../components/Footer/Footer";
import WorkspaceWelcomeContent from "./WorkspaceWelcome/WorkspaceWelcomeContent";
import PlaygroundChatBox from "../../../components/Chatbox/PlaygroundChatBox";
import {
    getFirstStepLinkOfPhase,
    getNextStep,
    getOpenedStepTitle,
    getPrevStep, titlePrefix
} from "../../../misc/WorkspaceHelpers";
import TeamCard from "../Cards/TeamCard";
import BackButton from "../../../components/BackButton/BackButton";
import AddFindPlayground from "../Cards/AddFindPlayground";
import {
    ensurePlaygroundDetails,
    findPlaygroundsByName,
    stopPlaygroundDetailsStream
} from "../../../components/Playground/PlaygroundActions";
import { getAllPlaygrounds } from "../../../components/Playground/PlaygroundReducer";
import Hidden from "@material-ui/core/Hidden/Hidden";
import { Helmet } from "react-helmet";
import Authenticator from "../../../authentication/Authenticator";

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

        this.clickPhase = this.clickPhase.bind(this);
        this.setCta = this.setCta.bind(this);
        this.unsetCta = this.unsetCta.bind(this);
        this.gotoPrevStep = this.gotoPrevStep.bind(this);
        this.gotoNextStep = this.gotoNextStep.bind(this);
    }

    state = {
        expandedPhase: 'none',
        ctaText: '',
        ctaAction: () => null,
        ctaDisabled: true,
        ctaDone: false,
        CustomButton: null,
        showMobileMenu: false,
    };

    componentDidMount() {
        const { match: { path }, history } = this.props;

        this.selectActivePhase();

        if (path === '/actie/') {
            history.push('/actie/starten')
        } else {
            this.ensurePlaygroundDetails();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.selectActivePhase();
        }

        if (prevProps.playgrounds.length !== this.props.playgrounds.length) {
            this.ensurePlaygroundDetails();
        }

        if (this.props.playground && (!prevProps.playground || (prevProps.playground.id === this.props.playground.id)) ) {
            this.ensurePlaygroundDetails();
        }
    }

    componentWillUnmount() {
        const { stopPlaygroundDetailsStream, match: { params: { initiativeName } }, playgrounds } = this.props;

        const initiative = findPlaygroundsByName({ playgrounds, initiativeName });

        if (initiative && initiative.id) {
            console.log('stopping stream: ', initiativeName, initiative.id);
            stopPlaygroundDetailsStream(initiative.id);
        }
    }

    ensurePlaygroundDetails() {
        const { ensurePlaygroundDetails, match: { params: { initiativeName } }, playgrounds } = this.props;

        const initiative = findPlaygroundsByName({ playgrounds, initiativeName });

        if (initiative && initiative.id) {
            console.log("starting stream playground details of " + initiativeName, initiative.id);
            ensurePlaygroundDetails(initiative.id);
        }
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
        this.selectPhase(phase);
        this.gotoFirstStep(phase);
    }

    gotoFirstStep(phase) {
        const { history, phases, playground, user } = this.props;

        const firstStepLink = getFirstStepLinkOfPhase(phase, phases, playground, user);

        if (firstStepLink) history.push(firstStepLink);
    }

    setCta({ ctaText = '', ctaAction = () => null, ctaDisabled = true, ctaDone = false, CustomButton = null }) {
        this.setState({ ctaText, ctaAction, ctaDisabled, ctaDone, CustomButton });
    }

    unsetCta() {
        this.setState({
            ctaText: '',
            ctaAction: () => null,
            ctaDisabled: true,
            ctaDone: false,
            CustomButton: null,
        });
    }

    gotoPrevStep(prev) {
        const { history, startPathUrl, playground, user, phases } = this.props;
        const url = startPathUrl + prev.stepLink;

        if (prev.visible && !prev.visible({ playground, user })) {
            return this.gotoPrevStep(getPrevStep(phases, url, playground));
        }

        if (prev.stepLink) history.push(url);
    }

    gotoNextStep(next) {
        const { history, startPathUrl, playground, user, phases } = this.props;
        const url = startPathUrl + next.stepLink;

        if (next.title !== 'Community' && !playground) return;

        if (next.visible && !next.visible({ playground, user })) {
            return this.gotoNextStep(getNextStep(phases, url, playground));
        }

        if (next.stepLink) history.push(url);
    }

    renderCtaButton() {
        const { ctaText, ctaAction, ctaDisabled, ctaDone, CustomButton } = this.state;

        if (CustomButton) {
            return <CustomButton />;
        }

        if (!ctaText) {
            return null;
        }

        return (
          <Button onClick={ctaAction} variant="contained" className={"pagination-button-step"} disabled={ctaDisabled}>
              {ctaText} {ctaDone && <Check className={this.props.classes.ctaDone} />}
          </Button>
        )
    }

    toggleShowMobileMenu = () => this.setState(({ showMobileMenu }) => ({ showMobileMenu: !showMobileMenu }));

    render() {
        const { phases, playground, user, location: { pathname }, startPathUrl, classes, ...rest } = this.props;
        const { expandedPhase, showMobileMenu } = this.state;

        const prev = getPrevStep(phases, pathname);
        const next = getNextStep(phases, pathname);

        const openedStepTitle = getOpenedStepTitle(phases, pathname);

        return (
          <React.Fragment>
              <Helmet>
                  <title>{titlePrefix} | Actiepagina</title>
              </Helmet>

              <Header
                rightLinks={<HeaderLinks />}
                fixed
                color="white"
                changeColorOnScroll={{
                    height: 50,
                    color: "white"
                }}
                toggleShowMobileMenu={this.toggleShowMobileMenu}
                {...rest}
              />

              <div className={classNames(classes.container + " phase-explainer-container")}>
                  <BackButton where="home" />

                  <GridContainer className={"grid-container"}>
                      <GridItem xs={12} sm={12} md={12} className={"workspace-phase-explainer"}>
                          <div className={"title-wrapper"}>
                              <h2 className={classes.playgroundTitle}>{playground ? playground.name : 'Actiepagina'}</h2>
                          </div>
                      </GridItem>

                      <Paper className={classes.workspacePaper}>
                          <Hidden mdDown={showMobileMenu}>
                              <GridItem xs={12} sm={12} md={3} className={"workspace-menu-column"}>
                                  <ExpansionPhase
                                    title={phases.community.title}
                                    icon={phases.community.icon}
                                    expandedIcon={phases.community.expandedIcon}
                                    expandedPhase={expandedPhase}
                                    onChange={this.clickPhase}
                                  >
                                      {phases.community.steps.map(step => step.visible({ playground, user }) && <StyledStepLink onClick={this.toggleShowMobileMenu} user={user} startPathUrl={startPathUrl} key={step.name} {...step} />)}
                                  </ExpansionPhase>

                                  {
                                      Object.keys(phases).filter(n => n !== 'community').map((phaseName) => (
                                        <ExpansionPhase
                                          title={phases[phaseName].title}
                                          icon={phases[phaseName].icon}
                                          expandedIcon={phases[phaseName].expandedIcon}
                                          expandedPhase={expandedPhase}
                                          onChange={this.clickPhase}
                                          disabled={!playground}
                                          key={phaseName}
                                        >
                                            {phases[phaseName].steps.map(step=> <StyledStepLink onClick={this.toggleShowMobileMenu} user={user} startPathUrl={startPathUrl} key={step.name} {...step} />)}
                                        </ExpansionPhase>
                                      ))
                                  }
                              </GridItem>
                          </Hidden>

                          <GridItem xs={12} sm={12} md={9} className={"workspace-content-column"}>
                              <Switch>

                                  <Route exact path="/actie/inloggen" key="WorkspaceLogin"
                                         render={(props) => <Authenticator {...props} setCta={this.setCta} unsetCta={this.unsetCta} onSignIn={this.props.signInHandler}/>} />
                                  <Route exact path="/actie/starten" key="AddFindPlayground"
                                         render={(props) => <AddFindPlayground {...props} user={user} />}/>
                                  <Route exact path="/actie/:initiativeName/inloggen" key="WorkspaceLogin"
                                         render={(props) => <Authenticator {...props} setCta={this.setCta} unsetCta={this.unsetCta} onSignIn={this.props.signInHandler}/>} />


                                  {
                                      playground && (
                                        <React.Fragment>
                                            <Route exact path="/actie/:initiativeName" key="WorkspaceWelcome"
                                                   render={(props) => <WorkspaceWelcomeContent {...props} playground={playground} user={user} />}/>
                                            <Route exact path="/actie/:initiativeName/mensen-verzamelen" key="RecruitVolunteers"
                                                   render={(props) => <RecruitVolunteersCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                            <Route exact path="/actie/:initiativeName/flyers-verspreiden" key="DistributeFlyers"
                                                   render={(props) => <DistributeFlyersCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                            <Route exact path="/actie/:initiativeName/meningen-inventariseren" key="CollectOpinions"
                                                   render={(props) => <CollectOpinionsCard {...props} setCta={this.setCta}  unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                            <Route exact path="/actie/:initiativeName/contact-leggen-met-bestuur" key="ContactManagement"
                                                   render={(props) => <ContactManagementCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                            <Route exact path="/actie/:initiativeName/wij-worden-rookvrij" key="WeWillBecomeSmokefree"
                                                   render={(props) => <WeWillBecomeSmokefreeCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>

                                            <Route exact path="/actie/:initiativeName/kies-moment-van-invoering" key="ChooseProperIntroductionDate"
                                                   render={(props) => <ChooseProperIntroductionDateCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                            <Route exact path="/actie/:initiativeName/communiceer-over-de-rookvrije-afspraak" key="CommunicateAboutSmokefreeAgreement"
                                                   render={(props) => <CommunicateAboutSmokefreeAgreementCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                            <Route exact path="/actie/:initiativeName/laat-zien-dat-de-speeltuin-rookvrij-is" key="ShowPlaygroundIsSmokefree"
                                                   render={(props) => <ShowPlaygroundIsSmokefreeCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>

                                            <Route exact path="/actie/:initiativeName/we-zijn-rookvrij" key="WeAreSmokefree"
                                                   render={(props) => <WeAreSmokefreeCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                            <Route exact path="/actie/:initiativeName/evalueren" key="Evaluate"
                                                   render={(props) => <EvaluateCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>

                                            <Route exact path="/actie/:initiativeName/team" key="WorkspaceTeam"
                                                   render={(props) => <TeamCard {...props} setCta={this.setCta} unsetCta={this.unsetCta} playground={playground} user={user} />}/>
                                            <Route exact path="/actie/:initiativeName/chat" key="WorkspaceChat"
                                                   render={(props) => <PlaygroundChatBox {...props} playground={playground} user={user} />}/>
                                        </React.Fragment>
                                      )
                                  }
                              </Switch>

                              {openedStepTitle && (
                                <div className={"workspace-content-pagination"}>
                                    {prev.stepLink ? (
                                      <Button onClick={() => this.gotoPrevStep(prev)} variant="outlined" className={"pagination-button"}>
                                          <PaginationIcon />
                                      </Button>
                                    ) : <div className={classes.noButton} />}

                                    {this.renderCtaButton()}

                                    {next.stepLink ? (
                                      <Button onClick={() => this.gotoNextStep(next)} variant="outlined" className={"pagination-button"}>
                                          <PaginationIcon className={"pagination-button-icon-right"} />
                                      </Button>
                                    ) : <div className={classes.noButton} />}
                                </div>
                              )}
                          </GridItem>
                      </Paper>
                  </GridContainer>
              </div>

              <Footer />
          </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    playgrounds: getAllPlaygrounds(state),
});

const mapDispatchToProps = dispatch => ({
    ensurePlaygroundDetails:        (initiativeId) =>     dispatch(ensurePlaygroundDetails(initiativeId)),
    stopPlaygroundDetailsStream:    (initiativeId) =>     dispatch(stopPlaygroundDetailsStream(initiativeId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspacePage));
import React from "react";
import { connect } from 'react-redux'
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
import {Route, Switch} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "@material-ui/core/Button/Button";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { history } from "../../setup.js";
import { isLoading, getFetchError } from "../../api/FetchDetailsReducer.js";
import { GET_PLAYGROUND_DETAILS, ensurePlaygroundDetails, stopPlaygroundDetailsStream } from "../../components/Playground/PlaygroundActions.js";
import { getPlaygroundDetails } from "../../components/Playground/PlaygroundReducer.js";
import { getUser } from "../../components/UserProfile/UserProfileReducer.js";
import ExpansionPhase from "../../components/ExpansionPhase/ExpansionPhase";
import AddPlayground from "../Onboarding/Sections/AddPlayground";
import { getAllPlaygrounds } from "../../components/Playground/PlaygroundReducer";
import Paper from "@material-ui/core/Paper";
import CustomAuthenticator from "../../auth/CustomAuthenticator";
import { StyledStepLink, StyledStepButton } from "../../components/Step/Step";
import FlyersCard from "./Cards/FlyersCard";
import GetSupportCard from "./Cards/GetSupportCard";
import InvolveManagerCard from "./Cards/InvolveManagerCard";
import DecideSmokefreeCard from "./Cards/DecideSmokefreeCard";
import SetADateCard from "./Cards/SetADateCard";
import ShareDecisionCard from "./Cards/ShareDecisionCard";
import MakeItVisibleCard from "./Cards/MakeItVisibleCard";
import ShareSmokefreeCard from "./Cards/ShareSmokefreeCard";
import ValidateCard from "./Cards/ValidateCard";


const mapStateToProps = (state, ownProps) => ({
    playgrounds: getAllPlaygrounds(state).map(playground => ({
          id: playground.id,
          name: playground.name,
          lat: playground.lat,
          lng: playground.lng,
          vol: playground.volunteerCount,
          votes: playground.votes,
          slug: playground.name + " Rookvrij",
          zoom: 18,
          default: false,
      })
    ),
    playground: getPlaygroundDetails(state, ownProps.match.params.initiativeId),
    playgroundLoading: isLoading(state, GET_PLAYGROUND_DETAILS, ownProps.match.params.initiativeId),
    playgroundError: getFetchError(state, GET_PLAYGROUND_DETAILS, ownProps.match.params.initiativeId),

    user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
    ensurePlaygroundDetails:        (initiativeId) =>     dispatch(ensurePlaygroundDetails(initiativeId)),
    stopPlaygroundDetailsStream:    (initiativeId) =>     dispatch(stopPlaygroundDetailsStream(initiativeId)),
})


const playgroundStatuses = ['not_started', 'in_progress', 'finished'];
const playgroundLabels = ['Voorbereiden', 'Uitvoeren', 'Onderhouden'];

class WorkspaceTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.toggleAddPlayground = this.toggleAddPlayground.bind(this);
        this.selectPhase = this.selectPhase.bind(this);
    }

    state = {
        isAddPlaygroundOpen: false,
        expandedPhase: this.getStatus(),
    };

    selectPhase(phase) {
        this.setState(({ expandedPhase }) => ({ expandedPhase: expandedPhase !== phase ? phase : 'none' }));
    }

    toggleAddPlayground() {
        this.setState(({ isAddPlaygroundOpen }) => ({ isAddPlaygroundOpen: !isAddPlaygroundOpen }));
    }


    getStatus() {
        const playgroundStatus = this.props.playground ? this.props.playground.status : '';
        const result = playgroundStatuses.find(element => element === playgroundStatus);
        return result ? playgroundLabels[playgroundStatuses.indexOf(result)] : null;
    }

    gotoWorkspaceWelcomePage = () => {
        history.push('/workspace/' + this.props.match.params.initiativeId)
    };

    componentDidMount() {
        console.log("starting stream playground details of " + this.props.match.params.initiativeId);
        this.props.ensurePlaygroundDetails(this.props.match.params.initiativeId);
    }

    componentDidUpdate(prevProps, prevState, snap) {
        if (!prevProps.playground && this.props.playground) {
            const phase = this.getStatus();
            this.selectPhase(phase);
        }
    }

    componentWillUnmount() {
        console.log('stopping stream: ', this.props.match.params.initiativeId);
        this.props.stopPlaygroundDetailsStream(this.props.match.params.initiativeId);
    }

     render() {
         const { playground, user, classes, ...rest } = this.props;
         const { isAddPlaygroundOpen } = this.state;

         // const activePhaseIdx = this.getStatusIndex();                       // the active phase represents the current state of this playground
         // const phaseIdx = this.props.match.params.phaseId - 1;               // The phase that the user has selected, if any
         // const phase = playgroundLabels[activePhaseIdx];                     // the label of phase that is displayed in the phases view

         if (!playground)
             return "loading..";

         const startPathUrl = `/workspace/${playground.id}`;

         const phases = {
             firstPhase: {
                 title: 'Voorbereiden',
                 icon: require('assets/img/icon-cooperate@2x.png'),
                 expandedIcon: require('assets/img/icon-cooperate@2x-active.png'),
                 steps: [
                     {
                         name: 'Vorm een team',
                         link: startPathUrl + '/add-team-member',
                     },
                     {
                         name: 'Flyers verspreiden',
                         link: startPathUrl + '/flyer',
                     },
                     {
                         name: 'Betrek de beheerder',
                         link: startPathUrl + '/involve-administrator',
                     },
                     {
                         name: 'Wij worden rookvrij!',
                         link: startPathUrl + '/commitment',
                     },
                 ],
             },

             secondPhase: {
                 title: 'Uitvoeren',
                 icon: require('assets/img/icon-checklist@2x.png'),
                 expandedIcon: require('assets/img/icon-checklist@2x-active.png'),
                 steps: [
                     {
                         name: 'Zet in de agenda',
                         link: startPathUrl + '/pick-date',
                     },
                     {
                         name: 'Deel het besluit',
                         link: startPathUrl + '/shout',
                     },
                     {
                         name: 'Laat het zien',
                         link: startPathUrl + '/signonfence',
                     },
                 ],
             },

             thirdPhase: {
                 title: 'Onderhouden',
                 icon: require('assets/img/icon-positivity@2x.png'),
                 expandedIcon: require('assets/img/icon-positivity@2x-active.png'),
                 steps: [
                     {
                         name: 'We zijn rookvrij!',
                         link: startPathUrl + '/celebrate',
                     },
                     {
                         name: 'Volhouden',
                         link: startPathUrl + '/magnify',
                     },
                 ],
             },
         };

        return (
            <div className={"workspace-wrapper"}>
                <Header
                    playground={playground}
                    rightLinks={<HeaderLinks/>}
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
                                <h2>{playground.name}</h2>
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
                                  expandedPhase={this.state.expandedPhase}
                                  onChange={this.selectPhase}
                                >
                                    <StyledStepButton onClick={this.toggleAddPlayground} index="1" name="Speeltuin toevoegen" />
                                    <StyledStepLink link={`/workspace/${playground.id}/login`} index="2" disabled={user} name="Inloggen" />

                                    {phases.firstPhase.steps.map((step, index)=> <StyledStepLink key={step.name} index={index + 3} {...step} />)}
                                </ExpansionPhase>
                                <ExpansionPhase
                                  title={phases.secondPhase.title}
                                  icon={phases.secondPhase.icon}
                                  expandedIcon={phases.secondPhase.expandedIcon}
                                  expandedPhase={this.state.expandedPhase}
                                  onChange={this.selectPhase}
                                >
                                    {phases.secondPhase.steps.map((step, index) => <StyledStepLink key={step.name} index={index} {...step} />)}
                                </ExpansionPhase>
                                <ExpansionPhase
                                  title={phases.thirdPhase.title}
                                  icon={phases.thirdPhase.icon}
                                  expandedIcon={phases.thirdPhase.expandedIcon}
                                  expandedPhase={this.state.expandedPhase}
                                  onChange={this.selectPhase}
                                >
                                    {phases.thirdPhase.steps.map((step, index) => <StyledStepLink key={step.name} index={index} {...step} />)}
                                </ExpansionPhase>
                            </GridItem>

                            <GridItem xs={8} sm={8} md={9} className={"workspace-content-column"}>
                                <Switch>
                                    <Route exact path="/workspace/:initiativeId/login" key="WorkspaceLogin"
                                           render={(props) => <CustomAuthenticator {...props} onSignIn={this.props.signInHandler}/>} />

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
            </div>
        );
    }
}

export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(WorkspaceTemplate));

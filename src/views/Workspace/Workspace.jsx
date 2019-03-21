import React from "react";
import { connect } from 'react-redux'
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import PhaseIndicator from "./Sections/PhaseIndicator.jsx";
import PhasePrepare from "./Sections/PhasePrepare.jsx";
import PhaseExecute from "./Sections/PhaseExecute.jsx";
import PhaseSustain from "./Sections/PhaseSustain.jsx";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "@material-ui/core/Button/Button";
import { history } from "../../setup.js";
import { isLoading, getFetchError } from "../../api/FetchDetailsReducer.js";
import { GET_PLAYGROUND_DETAILS, ensurePlaygroundDetails, stopPlaygroundDetailsStream } from "../../components/Playground/PlaygroundActions.js";
import { getPlaygroundDetails } from "../../components/Playground/PlaygroundReducer.js";
import { getUser } from "../../components/UserProfile/UserProfileReducer.js";
import {Route, Switch} from "react-router-dom";



const mapStateToProps = (state, ownProps) => ({
    playground: getPlaygroundDetails(state, ownProps.match.params.initiativeId),
    playgroundLoading: isLoading(state, GET_PLAYGROUND_DETAILS, ownProps.match.params.initiativeId),
    playgroundError: getFetchError(state, GET_PLAYGROUND_DETAILS, ownProps.match.params.initiativeId),

    user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
    ensurePlaygroundDetails:        (initiativeId) =>     dispatch(ensurePlaygroundDetails(initiativeId)),
    stopPlaygroundDetailsStream:    (initiativeId) =>     dispatch(stopPlaygroundDetailsStream(initiativeId)),
})


const playgroundStatuses = ['not_started', 'in_progress', 'finished']
const playgroundLabels = ['Voorbereiding', 'Uitvoering', 'Onderhouden']

class WorkspaceTemplate extends React.Component {

    getStatusIndex() {
        const playgroundStatus = this.props.playground ? this.props.playground.status : ''

        const result = playgroundStatuses.find(element => element === playgroundStatus)
        return result ? playgroundStatuses.indexOf(result) : -1
    }

    selectPhase = (phaseIdx) => {
        history.push('/workspace/' + this.props.match.params.initiativeId + '/phase/' + (phaseIdx+1) )
    }

    gotoWorkspaceWelcomePage = () => {
        history.push('/workspace/' + this.props.match.params.initiativeId)
    }

    componentDidMount() {
        console.log("starting stream playground details of " + this.props.match.params.initiativeId)
        this.props.ensurePlaygroundDetails(this.props.match.params.initiativeId)
    }

    componentWillUnmount() {
        console.log('stopping stream: ', this.props.match.params.initiativeId)
        this.props.stopPlaygroundDetailsStream(this.props.match.params.initiativeId)
    }

     render() {
        const {playground, user, classes, ...rest} = this.props;

        const activePhaseIdx = this.getStatusIndex()                            // the active phase represents the current state of this playground
        const phaseIdx = this.props.match.params.phaseId - 1                    // The phase that the user has selected, if any
        const phase = playgroundLabels[phaseIdx]                                // the label of phase that is displayed in the phases view


        // if (!playground || this.props.playgroundLoading) 
        //     return "loading..";
        if (!playground) 
            return "loading..";

        return (
            <div className={"workspace-wrapper"}>
                <Header
                    playground={playground}
                    rightLinks={<HeaderLinks/>}
                    fixed
                    color="white"
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />
                <Parallax className={"phase-container"}>
                    <div className={classes.container + " phase-wrapper"}>
                        <PhaseIndicator
                            onSwitch={this.selectPhase}
                            selectedPhase={phaseIdx}
                            activePhase={activePhaseIdx}
                        />
                    </div>
                </Parallax>

                <div className={classNames(classes.container + " phase-explainer-container")}>
                    <GridContainer className={"grid-container"}>
                        <GridItem xs={12} sm={12} md={12} className={"workspace-phase-explainer"}>
                            <div className={"title-wrapper"}>
                                <h2>{playground.name}</h2>
                                    <div className={"explainer-actions"}>
                                        <h3>Welkom bij Stap {phase}</h3>
                                        <Button
                                            className={"btn btn-highlight"}
                                            onClick={() => this.gotoWorkspaceWelcomePage()}
                                            style={{textAlign: 'center'}}
                                        >
                                            <span>Ga terug naar de startpagina</span>
                                        </Button>
                                    </div>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>

                <Switch>
                    <Route exact path='/workspace/:initiativeId/phase/1' render={() => ( <PhasePrepare playground={this.props.playground} user={this.props.user}/> )}/>
                    <Route exact path='/workspace/:initiativeId/phase/2' render={() => ( <PhaseExecute playground={this.props.playground} user={this.props.user}/> )}/>
                    <Route exact path='/workspace/:initiativeId/phase/3' render={() => ( <PhaseSustain playground={this.props.playground} user={this.props.user}/> )}/>
                </Switch>

                <Footer/>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(WorkspaceTemplate));

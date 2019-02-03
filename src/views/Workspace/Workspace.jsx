import React from "react";
import { connect } from 'react-redux'
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import CustomDialog from 'components/Dialogs/CustomDialog.jsx';
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
import Dashboard from "./Sections/Dashboard.jsx";
import PhasePrepare from "./Sections/PhasePrepare.jsx";
import PhaseExecute from "./Sections/PhaseExecute.jsx";
import PhaseSustain from "./Sections/PhaseSustain.jsx";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "@material-ui/core/Button/Button";
import { history } from "../../setup.js";
import { isLoading, getFetchError } from "../../api/FetchDetailsReducer.js";
import { GET_PLAYGROUND_DETAILS, ensurePlaygroundDetails } from "../../components/Playground/PlaygroundActions.js";
import { getPlaygroundDetails } from "../../components/Playground/PlaygroundReducer.js";
import { getUser } from "../../components/UserProfile/UserProfileReducer.js";



const mapStateToProps = state => ({
    playground: getPlaygroundDetails(state, getPlaygroundId()),
    playgroundLoading: isLoading(state, GET_PLAYGROUND_DETAILS, getPlaygroundId()),
    playgroundError: getFetchError(state, GET_PLAYGROUND_DETAILS, getPlaygroundId()),

    user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
    ensurePlaygroundDetails:    () =>     dispatch(ensurePlaygroundDetails(getPlaygroundId())),
})


const getPlaygroundId = () => history.location.pathname.split("/").pop()

const playgroundStatuses = ['not_started', 'in_progress', 'finished']
const playgroundLabels = ['Voorbereiding', 'Uitvoering', 'Onderhouden']

class WorkspaceTemplate extends React.Component {
    state = {
        selectedPhase: null
    }

    getStatusLabelAndIndex() {
        const playgroundStatus = this.props.playground ? this.props.playground.status : ''

        const result = playgroundStatuses.find(element => element === playgroundStatus)
        const index = result ? playgroundStatuses.indexOf(result) : -1
        
        return result ? { status: playgroundLabels[index], index: index } :{ status: 'unknown', index: -1 }
    }

    selectPhase = (phaseIdx) => {
        this.setState({ selectedPhase: phaseIdx })
    }

    componentDidMount() {
        this.props.ensurePlaygroundDetails()
      }

    getPhaseComponents() {
        return [
            <PhasePrepare playground={this.props.playground}/>,
            <PhaseExecute playground={this.props.playground} user={this.props.user}/>,
            <PhaseSustain playground={this.props.playground}/>
        ]
    }

    render() {
        const {playground, user, classes, ...rest} = this.props;

        const activePhaseIdx = this.getStatusLabelAndIndex().index              // the phase represents the current state of this playground
        const {selectedPhase} = this.state;                                     // The phase that the user has selected, if any
        const phasesView = selectedPhase !== null                               // true if phase has been selected resulting in the phases view, otherwise the dashbaord is displayed
        const phaseIdx = phasesView ? selectedPhase : activePhaseIdx            // the phase that will be displayed in the phases view
        const phase = playgroundLabels[phaseIdx]                                // the label of phase that is displayed in the phases view


        if (!playground || this.props.playgroundLoading) 
            return "loading..";

        return (
            <div className={"workspace-wrapper"}>
                <Header
                    brand={playground.name}
                    rightLinks={<HeaderLinks/>}
                    fixed
                    textBrand
                    color="white"
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />
                <Parallax image={require("assets/img/backgrounds/bg-zand.jpg")}
                          className={ !phasesView ? "phase-container empty" : "phase-container"}>
                    <div className={classes.container + " phase-wrapper"}>
                        { phasesView &&
                            <PhaseIndicator
                                onSwitch={this.selectPhase}
                                playground={this.props.playground}
                                selectedPhase={phaseIdx}
                                activePhase={activePhaseIdx}
                            />
                        }

                    </div>
                </Parallax>

                <div className={classNames(classes.mainRaised, classes.container + " phase-explainer-container")}>
                    <GridContainer className={"grid-container"}>
                        <GridItem xs={12} sm={12} md={12} className={"workspace-phase-explainer"}>
                            <div className={"title-wrapper"}>
                                <h2>{ !phasesView ? " Overzichtpagina" : "Stap " + phase} </h2>
                                {!!playground && !phasesView ?
                                    <div className={"explainer-actions"}>
                                        <h3>
                                            Op deze pagina vind je alle informatie die je nodig hebt
                                            om {playground.name} rookvrij te maken.
                                        </h3>
                                        <Button
                                            className={"btn btn-highlight"}
                                            onClick={() => this.selectPhase(activePhaseIdx)}
                                            style={{textAlign: 'center'}}
                                        >
                                            <span>Ga naar de actieve stap</span>
                                        </Button>
                                    </div>

                                    :
                                    <div className={"explainer-actions"}>
                                        <h3>Welkom bij Stap {phase}</h3>
                                        <Button
                                            className={"btn btn-highlight"}
                                            onClick={() => this.selectPhase(null)}
                                            style={{textAlign: 'center'}}
                                        >
                                            <span>Ga terug naar de startpagina</span>
                                        </Button>
                                    </div>
                                }
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>

                { phasesView ? 
                    this.getPhaseComponents()[phaseIdx] : 
                    <Dashboard playground={this.props.playground} user={this.props.user}/>
                }

                <Footer/>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(WorkspaceTemplate));

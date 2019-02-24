import React from "react";
//import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SimpleCard from "components/CustomCard/Card.jsx"
import CollapseCard from "components/CustomCard/CollapseCard.jsx"

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import PlaygroundManagers from "./PlaygroundManagers";
import PlaygroundVotes from "../Cards/PlaygroundVotes";

import { connect } from 'react-redux'
import { claimManagerRole, GET_PLAYGROUND_DETAILS, ensurePlaygroundDetails } from "../../../components/Playground/PlaygroundActions";
import PlaygroundChatBox from "../../../components/Chatbox/PlaygroundChatBox";

import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "@material-ui/core/Button/Button";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import { getPlaygroundDetails } from "../../../components/Playground/PlaygroundReducer";
import { isLoading, getFetchError } from "../../../api/FetchDetailsReducer";
import { getUser } from "../../../components/UserProfile/UserProfileReducer";
import { history } from "../../../setup";

const mapStateToProps = (state, ownProps) => ({
    playground: getPlaygroundDetails(state, ownProps.match.params.initiativeId),
    playgroundLoading: isLoading(state, GET_PLAYGROUND_DETAILS, ownProps.match.params.initiativeId),
    playgroundError: getFetchError(state, GET_PLAYGROUND_DETAILS, ownProps.match.params.initiativeId),

    user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
    claimManagerRole:    (initiativeId, onSuccessCallback) =>     dispatch(claimManagerRole(initiativeId, onSuccessCallback)),
    ensurePlaygroundDetails:    (initiativeId) =>     dispatch(ensurePlaygroundDetails(initiativeId)),
})

const playgroundStatuses = ['not_started', 'in_progress', 'finished']

class WorkspaceWelcome extends React.Component {

    onClickClaim () {
        this.props.claimManagerRole(this.props.playground.id)
    }

    componentDidMount() {
        console.log("ensuring playground details of " + this.props.match.params.initiativeId)
        this.props.ensurePlaygroundDetails(this.props.match.params.initiativeId)
    }

    gotoActivePhase() {
        const result = playgroundStatuses.find(element => element === this.props.playground.status)
        const index = result ? playgroundStatuses.indexOf(result) : 0
        history.push('/workspace/' + this.props.match.params.initiativeId + '/phase/' + (index + 1) )
    }

    render() {
        const {playground, user, classes, ...rest} = this.props;


        if (!playground || this.props.playgroundLoading) 
            return "loading.."


        const isManager = user && playground.managers && !!playground.managers.filter(manager => {
            return manager.id === user.id
        }).length;

        console.log(`Displaying workspace welcome for playground ${playground.id} and ${isManager ? 'manager' : 'user'} ${user ? user.id : 'anonymous'}`);

        // Prepare content message for the team card
        const volunteerCount = playground.volunteers.length
        const userIsVolunteer = user && playground.volunteers.filter(volunteer => volunteer.userId === user.id).length > 0
        const contentMessage = volunteerCount === 0 ?
                                "Deze speeltuin heeft nog geen team, start er één!" :
                                (
                                    volunteerCount === 1 ?
                                    "Eén vrijwilliger maakt deze speeltuin rookvrij." :
                                    volunteerCount + " vrijwilligers maken deze speeltuin rookvrij."
                                ) + (userIsVolunteer ? "" : " Doe mee!")



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
                        className={"phase-container empty"}>
                    <div className={classes.container + " phase-wrapper"}>

                    </div>
                </Parallax>

                <div className={classNames(classes.mainRaised, classes.container + " phase-explainer-container")}>
                    <GridContainer className={"grid-container"}>
                        <GridItem xs={12} sm={12} md={12} className={"workspace-phase-explainer"}>
                            <div className={"title-wrapper"}>
                                <h2>{ "Overzichtpagina"} </h2>
                                {!!playground &&
                                    <div className={"explainer-actions"}>
                                        <h3>
                                            Op deze pagina vind je alle informatie die je nodig hebt
                                            om {playground.name} rookvrij te maken.
                                        </h3>
                                        <Button
                                            className={"btn btn-highlight"}
                                            onClick={() => this.gotoActivePhase()}
                                            style={{textAlign: 'center'}}
                                        >
                                            <span>Ga naar de actieve stap</span>
                                        </Button>
                                    </div>

                                }
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>


                <div className={classes.container + " information-wrapper"}>
                    <GridContainer className={"information-container"}>
                        <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                            <CollapseCard title={"Team"}
                                        image={require("assets/img/backgrounds/team.jpg")}
                                        content={contentMessage}
                                        primaryCta={"Word lid"}
                                        MoreInformation={"Meer informatie"}
                                        ExpandContent={<PlaygroundManagers playground={playground} user={user}/>}
                            />
                            <CollapseCard title={"Petities"}
                                        image={require("assets/img/backgrounds/petities.jpg")}
                                        content={"Help mee met deze speeltuin rookvrij te maken door de petitie te tekenen"}
                                        primaryCta={"Teken Petitie"}
                                        MoreInformation={"Meer informatie"}
                                        ExpandContent={<PlaygroundVotes playground={playground} />}
                            />
                            <SimpleCard title={"Donaties"}
                                        image={require("assets/img/backgrounds/donaties.jpg")}
                                        content={"Door te doneren help je mee deze speeltuin rookvrij te maken."}
                                        primaryCta={{
                                            action: "#",
                                            text: "Doneer nu"
                                        }}
                            />
                            {
                                !isManager &&
                                        <div>
                                            <SimpleCard
                                                title={"Speeltuin beheerder?"}
                                                image={require("assets/img/backgrounds/smokefree.jpg")}
                                                content={"Ben jij de officiele beheerder van deze speeltuin? Laat het ons weten..."}
                                                primaryCta={{
                                                    click: (() => { this.onClickClaim() }),
                                                    text: "Ik ben de beheerder van deze speeltuin"
                                                }}
                                            />
                                        </div>
                            }
                        </GridItem>
                    </GridContainer>
                    <PlaygroundChatBox/>
                </div>

                <Footer/>
            </div>
        )
    }
}


export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(WorkspaceWelcome));

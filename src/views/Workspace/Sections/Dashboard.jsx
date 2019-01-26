import React from "react";
//import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SimpleCard from "components/CustomCard/Card.jsx"
import CollapseCard from "components/CustomCard/CollapseCard.jsx"

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import PlaygroundManagers from "./PlaygroundManagers";
import PlaygroundVotes from "../Cards/PlaygroundVotes";

import AlertDialog from "../../AlertDialog.jsx";
import { connect } from 'react-redux'
import { createLoadingSelector, createErrorMessageSelector } from '../../../api/Selectors';
import { claimManagerRole, CLAIM_MANAGER_ROLE } from "../../../components/Playground/PlaygroundActions";
import PlaygroundChatBox from "../../../components/Chatbox/PlaygroundChatBox";


const mapStateToProps = state => {
    const loadingSelector = createLoadingSelector([CLAIM_MANAGER_ROLE]);
    const errorMessageSelector = createErrorMessageSelector([CLAIM_MANAGER_ROLE]);
    return {
        loading: loadingSelector(state),
        error: errorMessageSelector(state),
    }
}

const mapDispatchToProps = dispatch => ({
    claimManagerRole:    (initiativeId, onSuccessCallback) =>     dispatch(claimManagerRole(initiativeId, onSuccessCallback)),
})


class Dashboard extends React.Component {

    onClickClaim () {
        this.props.claimManagerRole(this.props.playground.id)
    }

    render() {
        const { classes, playground, profile, loading, error } = this.props;
        const isManager = playground.managers && !!playground.managers.filter(manager => {
            return manager.id === profile.id
        }).length;

        console.log(`Displaying dashboard for playground ${playground.id} and ${isManager ? 'manager' : 'user'} ${profile.id}`);

        return(
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                        <CollapseCard title={"Team"}
                                      image={require("assets/img/backgrounds/team.jpg")}
                                      content={"Maak kennis met het team die deze speeltuin rookvrij maakt"}
                                      primaryCta={"Word lid"}
                                      MoreInformation={"Meer informatie"}
                                      ExpandContent={<PlaygroundManagers playground={playground} profile={profile}/>}
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
                                        {loading && <p>Loading...</p>}
                                        {error && <AlertDialog apolloError={error}/>}
                                    </div>
                        }
                    </GridItem>
                </GridContainer>
                <PlaygroundChatBox/>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SimpleCard from "components/CustomCard/Card.jsx";
import CollapseCard from "components/CustomCard/CollapseCard.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import SocialMedia from "../forms/SocialMedia.jsx";
import { createLoadingSelector } from "../../../api/Selectors";
import { connect } from 'react-redux'
import { setDecideSmokefree, SET_DECIDE_SMOKEFREE } from "../../../components/Playground/PlaygroundActions.js";
import Flyers from "../forms/Flyers.jsx";
import { getUser } from "../../../components/UserProfile/UserProfileReducer.js";

const mapStateToProps = state => {
    const loadingSelector = createLoadingSelector([SET_DECIDE_SMOKEFREE]);
    return {
        loading: loadingSelector(state),
        user: getUser(state)
    }
}

const mapDispatchToProps = dispatch => ({
    setDecideSmokefree:    (initiativeId) =>     dispatch(setDecideSmokefree(initiativeId)),
})


class PhasePrepare extends React.Component {

    onClickDecideSmokefree() {
        this.props.setDecideSmokefree(this.props.playground.id)
    }

    render() {
        const {classes, playground} = this.props

        return (
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                        <SimpleCard title={"Deel via email"}
                                    image={require("assets/img/backgrounds/email.jpg")}
                                    content={"Ken jij meer mensen die " + playground.name + " rookvrij willen krijgen? Nodig ze uit via email."}
                                    primaryCta={{
                                        action: "mailto:?subject=Maak%20speeltuin%20rookvrij&body=Ik%20wil%20graag%20speeltuin%20rookvrij%20maken.%0AHelp%20jij%20met%20me%20mee%3F",
                                        text: "Verstuur een email"
                                    }}
                        />

                        <CollapseCard title={"Deel via social media"}
                                      image={require("assets/img/backgrounds/social.jpg")}
                                      content={"Laat je volgers weten dat je Speeltuin rookvrij wilt maken."}
                                      MoreInformation={"Meer informatie"}
                                      ExpandContent={<SocialMedia playground={playground}/>}
                        />

                        <CollapseCard title={"Flyers verspreiden"}
                                      image={require("assets/img/backgrounds/flyer.jpg")}
                                      content={"Deel flyers uit in de buurt om de mensen nee te nemen in dit initiatief"}
                                      MoreInformation={"Meer informatie"}
                                      ExpandContent={<Flyers {...this.props}/>}
                        />

                        <SimpleCard
                            title={"Betrek de beheerder"}
                            image={require("assets/img/backgrounds/smokefree.jpg")}
                            content={"Beslis hier of de speeltuin rookvrij wordt gemaakt."}
                            primaryCta={{
                                click: (() => {this.onClickDecideSmokefree()}),
                                text: "Maak rookvrij"
                            }}
                        />

                        <SimpleCard
                            title={"Maak speeltuin rookvrij"}
                            image={require("assets/img/backgrounds/commitment.jpg")}
                            content={"Beslis hier of de speeltuin rookvrij wordt gemaakt."}
                            primaryCta={{
                                click: (() => {this.onClickDecideSmokefree()}),
                                text: "Maak rookvrij"
                            }}
                        />

                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(PhasePrepare));


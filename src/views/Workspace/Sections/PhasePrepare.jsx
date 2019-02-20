import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { createLoadingSelector } from "../../../api/Selectors";
import { connect } from 'react-redux'
import { setDecideSmokefree, SET_DECIDE_SMOKEFREE } from "../../../components/Playground/PlaygroundActions.js";
import { getUser } from "../../../components/UserProfile/UserProfileReducer.js";
import GetSupportCard from "../Cards/GetSupportCard.jsx";
import FlyersCard from "../Cards/FlyersCard.jsx";
import InvolveManagerCard from "../Cards/InvolveManagerCard.jsx";
import DecideSmokefreeCard from "../Cards/DecideSmokefreeCard.jsx";

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
        const {classes} = this.props

        return (
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>

                        <GetSupportCard {...this.props}/>
                        <FlyersCard  {...this.props}/>
                        <InvolveManagerCard  {...this.props}/>
                        <DecideSmokefreeCard {...this.props} />

                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(PhasePrepare));


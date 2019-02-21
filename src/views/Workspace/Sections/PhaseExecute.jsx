import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import SetADateCard from "../Cards/SetADateCard.jsx";
import ShareDecisionCard from "../Cards/ShareDecisionCard.jsx";
import MakeItVisibleCard from "../Cards/MakeItVisibleCard.jsx";
import PartyCard from "../Cards/PartyCard.jsx";

class PhaseExecute extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>

                        <SetADateCard {...this.props} />
                        <ShareDecisionCard {...this.props} />
                        <MakeItVisibleCard {...this.props} />
                        <PartyCard {...this.props} />

                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(PhaseExecute);

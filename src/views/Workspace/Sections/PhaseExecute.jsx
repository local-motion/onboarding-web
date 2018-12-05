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

class PhaseExecute extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                        <CollapseCard title={"Commiteer aan een datum"}
                                      image={require("assets/img/backgrounds/date.jpg")}
                                      content={"Selecteer de datum waarop Speeltuin rookvrij moet zijn."}
                                      MoreInformation={"Meer informatie"}
                        />
                        <SimpleCard title={"Deel beslissing via Social"}
                                    image={require("assets/img/backgrounds/social.jpg")}
                                    content={"Laat iedereen weten dat er een datum is dat Speeltuin rookvrij word"}
                                    primaryCta={{
                                        action: "#",
                                        text: "Deel datum"
                                    }}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(PhaseExecute);

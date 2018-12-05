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

class PhasePrepare extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                        <SimpleCard title={"Deel via email"}
                                    image={require("assets/img/backgrounds/email.jpg")}
                                    content={"Ken jij meer mensen die Speeltuin rookvrij willen krijgen? Nodig ze uit via email."}
                                    primaryCta={{
                                        action: "mailto:?subject=Maak%20speeltuin%20rookvrij&body=Ik%20wil%20graag%20speeltuin%20rookvrij%20maken.%0AHelp%20jij%20met%20me%20mee%3F",
                                        text: "Verstuur een email"
                                    }}
                        />
                        <CollapseCard title={"Deel via social media"}
                                      image={require("assets/img/backgrounds/social.jpg")}
                                      content={"Laat je volgers weten dat je Speeltuin rookvrij wilt maken."}
                                      MoreInformation={"Meer informatie"}
                        />
                        <CollapseCard title={"Maak speeltuin rookvrij"}
                                      image={require("assets/img/backgrounds/smokefree.jpg")}
                                      content={"Beslis hier of de speeltuin rookvrij wordt gemaakt."}
                                      MoreInformation={"Maak rookvrij"}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(PhasePrepare);

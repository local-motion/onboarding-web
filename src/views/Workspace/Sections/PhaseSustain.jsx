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

class PhaseSustain extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                        <SimpleCard title={"Deel het behalen"}
                                    image={require("assets/img/backgrounds/email.jpg")}
                                    content={"Deel het behalen van de rookvrije datum via email"}
                                    primaryCta={{
                                        action: "mailto:?subject=Maak%20speeltuin%20rookvrij&body=Ik%20wil%20graag%20speeltuin%20rookvrij%20maken.%0AHelp%20jij%20met%20me%20mee%3F",
                                        text: "Verstuur een email"
                                    }}
                        />

                        <SimpleCard title={"Validatie"}
                                    image={require("assets/img/backgrounds/smokefree.jpg")}
                                    content={"Valideer of de speeltuin nog steeds rookvrij is. "}
                                    primaryCta={{
                                        action: "#",
                                        text: "Valideer"
                                    }}
                        />

                        <CollapseCard title={"Het laatste nieuws"}
                                      image={require("assets/img/backgrounds/social.jpg")}
                                      content={"Ontdek het laatste nieuws over deze speeltuin"}
                                      MoreInformation={"Meer informatie"}
                        />

                        <CollapseCard title={"En verder..."}
                                      image={require("assets/img/backgrounds/social.jpg")}
                                      content={"Ontdek het laatste nieuws over deze speeltuin"}
                                      MoreInformation={"Meer informatie"}
                        />

                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(PhaseSustain);

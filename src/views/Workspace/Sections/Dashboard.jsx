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

class Dashboard extends React.Component {

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                        <CollapseCard title={"Team"}
                                      image={require("assets/img/backgrounds/team.jpg")}
                                      content={"Maak kennis met het team die deze speeltuin rookvrij maakt"}
                                      primaryCta={"Word lid"}
                                      MoreInformation={"Meer informatie"}
                        />
                        <CollapseCard title={"Petities"}
                                      image={require("assets/img/backgrounds/petities.jpg")}
                                      content={"Help mee met deze speeltuin rookvrij te maken door de petitie te tekenen"}
                                      primaryCta={"Teken Petitie"}
                                      MoreInformation={"Meer informatie"}
                        />
                        <SimpleCard title={"Donaties"}
                                    image={require("assets/img/backgrounds/donaties.jpg")}
                                    content={"Door te doneren help je mee deze speeltuin rookvrij te maken."}
                                    primaryCta={{
                                        action: "#",
                                        text: "Doneer nu"
                                    }}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(Dashboard);

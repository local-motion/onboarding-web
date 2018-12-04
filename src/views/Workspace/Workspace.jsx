import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import PhaseIndicator from "./Sections/PhaseIndicator.jsx";
import SimpleCard from "components/CustomCard/Card.jsx"
import CollapseCard from "components/CustomCard/CollapseCard.jsx"

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

class Workspace extends React.Component {
    render() {
        const {classes, ...rest} = this.props;
        return (
            <div className={"workspace-wrapper"}>
                <Header
                    brand="Speeltuin"
                    rightLinks={<HeaderLinks/>}
                    fixed
                    color="white"
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />
                <Parallax image={require("assets/img/bg-zand.jpg")} className={"phase-container"}>
                    <div className={classes.container + " phase-wrapper"}>
                        <PhaseIndicator/>
                    </div>
                </Parallax>

                <div className={classNames(classes.mainRaised, classes.container + " phase-explainer-container")}>
                    <GridContainer className={"grid-container"}>
                        <GridItem xs={12} sm={12} md={12} className={"workspace-phase-explainer"}>
                            <div className={"title-wrapper"}>
                                <h2>Stap 1: Voorbereiding</h2>
                                <h3>Enthousiasmerende tekst.</h3>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
                <div className={classes.container + " information-wrapper"}>
                    <GridContainer className={"information-container"}>
                        <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                            <CollapseCard title={"Team"}
                                        image={require("assets/img/backgrounds/team.jpg")}
                                        content={"Maak kennis met het team die deze speeltuin rookvrij maakt"}
                                        primaryCta={"Word lid"}
                                        secondaryCta={"Meer informatie"}
                            />
                            <CollapseCard title={"Petities"}
                                        image={require("assets/img/backgrounds/petities.jpg")}
                                        content={"Help mee met deze speeltuin rookvrij te maken door de petitie te tekenen"}
                                        primaryCta={"Teken Petitie"}
                                        secondaryCta={"Meer informatie"}
                            />
                            <SimpleCard title={"Donaties"}
                                        image={require("assets/img/backgrounds/donaties.jpg")}
                                        content={"Door te doneren help je mee deze speeltuin rookvrij te maken."}
                                        primaryCta={"Doneer nu"}
                            />
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(Workspace);

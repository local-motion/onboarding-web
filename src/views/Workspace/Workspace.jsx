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
import Dashboard from "./Sections/Dashboard.jsx";
import PhasePrepare from "./Sections/PhasePrepare.jsx";

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
                <Dashboard />
                <PhasePrepare />
                <Footer/>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(Workspace);

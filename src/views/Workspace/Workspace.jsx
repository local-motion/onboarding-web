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
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
// import SectionBasics from "./Sections/SectionBasics.jsx";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import SectionPills from "./Sections/SectionPills.jsx";

class Workspace extends React.Component {
    render() {
        const {classes, ...rest} = this.props;
        return (
            <div>
                <Header
                    brand="Smoke-free playground"
                    rightLinks={<HeaderLinks/>}
                    fixed
                    color="transparent"
                    changeColorOnScroll={{
                        height: 400,
                        color: "white"
                    }}
                    {...rest}
                />
                <Parallax image={require("assets/img/bg2.jpg")}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem>
                                <div className={classes.brand}>
                                    <h1 className={classes.title}>Linnaeushof rookvrij!</h1>
                                    <h3 className={classes.subtitle}>
                                        Je hebt aangegeven dat jij Linnaeushof rookvrij wilt helpen maken
                                    </h3>
                                    <h3>
                                        Help ons!
                                    </h3>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>

                <div className={classNames(classes.main, classes.mainRaised)}>
                    <SectionPills/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(Workspace);

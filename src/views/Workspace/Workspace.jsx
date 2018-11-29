import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import PhaseIndicator from "./Sections/PhaseIndicator.jsx";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

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
                <Parallax image={require("assets/img/bg-zand.jpg")} className={"phase-container"} >
                    <div className={classes.container}>
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
                <div className={classNames(classes.mainRaised, classes.container, "dashboard")}>
                    <GridContainer>
                        <GridItem>
                            <label>
                                <input type="checkbox" id={"smokeFree"}/>
                                Make smokeFree
                            </label>

                            <br/>

                            <label>From<br/>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(Workspace);

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
// @material-ui/icons
// core components
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import PhaseIndicator from "./Sections/PhaseIndicator.jsx";
import Dashboard from "./Sections/Dashboard.jsx";
import PhasePrepare from "./Sections/PhasePrepare.jsx";
import PhaseExecute from "./Sections/PhaseExecute.jsx";
import PhaseSustain from "./Sections/PhaseSustain.jsx";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";

const GET_PLAYGROUND = gql`
    {
        playground(id: "${window.location.pathname.split("/").pop()}") {
            id
            name
            status
        }
    }
`;

const playgroundRequest = graphql(GET_PLAYGROUND,{
    props: ({ownProps, data }) => {
        if(data.loading) return { playgroundsLoading: true };
        if(data.error) return { hasErrors: true };
        if(data.error) return { hasErrors: true };
        console.log("data", data);
        return {
            playground: data.playground
        };
    }
});

class WorkspaceTemplate extends React.Component {
    state = {
        phase: "0",
        view: "dashboard"
    };

    switchPhase = (phase) => {
        this.setState(state => ({ phase: phase }));
    };

    renderPhase = (phase) => {
        switch (phase) {
            case "1":
                return <PhasePrepare playground={this.props.playground}/>;
            case "2":
                return <PhaseExecute playground={this.props.playground}/>;
            case "3":
                return <PhaseSustain />;
            default:
                return <Dashboard />;
        }
    }

    render() {
        const {classes, playground, ...rest} = this.props;
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
                <Parallax image={require("assets/img/backgrounds/bg-zand.jpg")} className={"phase-container"}>
                    <div className={classes.container + " phase-wrapper"}>
                        <PhaseIndicator onSwitchPhase={this.switchPhase}/>
                    </div>
                </Parallax>

                <div className={classNames(classes.mainRaised, classes.container + " phase-explainer-container")}>
                    <GridContainer className={"grid-container"}>
                        <GridItem xs={12} sm={12} md={12} className={"workspace-phase-explainer"}>
                            <div className={"title-wrapper"}>
                                <h2>{ this.state.phase === "0" ? "Dashboard" : "Stap " + this.state.phase} </h2>
                                {!!playground &&
                                    <h3>{playground.name}</h3>
                                }
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>

                {this.renderPhase(this.state.phase)}

                <Footer/>
            </div>
        );
    }
}

const Workspace = playgroundRequest(WorkspaceTemplate);
export default withStyles(componentsStyle)(Workspace);

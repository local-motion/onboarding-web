import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import Dialog from '@material-ui/core/Dialog';
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
import Button from "@material-ui/core/Button/Button";

const GET_PLAYGROUND = gql`
    {
        playground(id: "${window.location.pathname.split("/").pop()}") {
            id
            name
            status
            smokeFreeDate
            volunteerCount
            votes
        }
    }
`;

const playgroundRequest = graphql(GET_PLAYGROUND,{
    props: ({ownProps, data }) => {
        if(data.loading) return { playgroundsLoading: true };
        if(data.error) return {
            hasErrors: true,
            error: data.error.toString()
        };
        const playground = data.playground;
        if (playground.smokeFreeDate) {
            playground.smokeFreeDate = new Date(playground.smokeFreeDate);
        }
        console.log("Get playground: ", playground);
        return { playground: playground };
    }
});

class WorkspaceTemplate extends React.Component {

    constructor() {
        super();
        this.state = {
            phase: "0",
            view: "dashboard",
            progress: ""
        };
    }

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
                return <PhaseSustain playground={this.props.playground}/>;
            default:
                return <Dashboard playground={this.props.playground}/>;
        }
    };

    render() {
        const { phase } = this.state;
        const {playgroundsLoading, classes, playground, ...rest} = this.props;

        if (playgroundsLoading) {
            return "loading..";
        }
        return (
            <div className={"workspace-wrapper"}>
                {this.props.hasErrors === true &&
                 <Dialog open={true} className={classes.container}>{this.props.error}</Dialog>
                }

                <Header
                    brand={playground.name}
                    rightLinks={<HeaderLinks/>}
                    fixed
                    color="white"
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />
                <Parallax image={require("assets/img/backgrounds/bg-zand.jpg")}
                          className={phase === "0" ? "phase-container empty" : "phase-container"}>
                    <div className={classes.container + " phase-wrapper"}>
                        {phase !== "0" ?
                                <PhaseIndicator onSwitchPhase={this.switchPhase}/> : <div></div>
                        }

                    </div>
                </Parallax>

                <div className={classNames(classes.mainRaised, classes.container + " phase-explainer-container")}>
                    <GridContainer className={"grid-container"}>
                        <GridItem xs={12} sm={12} md={12} className={"workspace-phase-explainer"}>
                            <div className={"title-wrapper"}>
                                <h2>{ phase === "0" ? " Overzichtpagina" : "Stap " + phase} </h2>
                                {!!playground && phase === "0" ?
                                    <div className={"explainer-actions"}>
                                        <h3>
                                            Op deze pagina vind je alle informatie die je nodig hebt om {playground.name} rookvrij te maken.
                                        </h3>
                                        <Button
                                            className={"btn btn-highlight"}
                                            onClick={() => this.switchPhase("1")}
                                            style={{textAlign: 'center'}}
                                        >
                                            <span>Ga naar Stap 1</span>
                                        </Button>
                                    </div>

                                    :
                                    <div className={"explainer-actions"}>
                                        <h3>Welkom bij Stap {phase}</h3>
                                        <Button
                                            className={"btn btn-highlight"}
                                            onClick={() => this.switchPhase("0")}
                                            style={{textAlign: 'center'}}
                                            >
                                            <span>Ga terug naar de startpagina</span>
                                        </Button>
                                    </div>
                                }
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>

                {this.renderPhase(phase)}

                <Footer/>
            </div>
        );
    }
}

const Workspace = playgroundRequest(WorkspaceTemplate);
export default withStyles(componentsStyle)(Workspace);

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

// @material-ui/icons
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
import SmokefreeDecision from "./forms/SmokefreeDecision.jsx";

const GET_PLAYGROUND = gql`
    {
        playground(id: "${window.location.pathname.split("/").pop()}") {
            id
            name
            lat
            lng
            status
            type
            status
        }
    }
`;

const withPlayground = graphql(GET_PLAYGROUND, {
    // `ownProps` are the props passed into component
    // `data` is the result data (see above)
    props: ({ownProps, data }) => {
        if(data.loading) return { playgroundsLoading: true };
        if(data.error) return { hasErrors: true };
        if(data.error) return { hasErrors: true };
        console.log("ownProps", ownProps);
        console.log("data", data);
        return {
            playground: data.playground
        };
    }
});

class WorkspaceTemplate extends React.Component {
    constructor(props) {
        super(props);
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
                <div className={classNames(classes.mainRaised, classes.container + " phase-explainer-container")}>
                    <GridContainer>
                        <GridItem>
                            <SmokefreeDecision playground={playground}/>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer/>
            </div>
        );
    }
}

const Workspace = withPlayground(WorkspaceTemplate);

export default withStyles(componentsStyle)(Workspace);

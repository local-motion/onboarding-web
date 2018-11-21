import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withNamespaces } from "react-i18next";
import Footer from "components/Footer/Footer.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import PlaygroundSearch from "./Sections/PlaygroundSearch";
import PlaygroundMap from "./Sections/PlaygroundMap";
import PlaygroundStatistics from "./Sections/PlaygroundStatistics";
import StartOrJoinInitiative from "./Sections/JoinInitiative";
import CallToAction from "./Sections/CallToAction";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

class Onboarding extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlaygroundChange = this.handlePlaygroundChange.bind(this);
        const { t } = this.props;
        this.state = {
            playground: {
                default: true,
                name: t("playground.default.area")
            }
        };
    }

    handlePlaygroundChange(playground) {
        console.log("Onboarding parent received selected playground:", playground);
        this.setState({ playground: playground });
    }

    render() {
        const { classes } = this.props;
        const { playground } = this.state;
        return (
            <div>
                <Parallax image={require("assets/img/bg-zand.jpg")} >
                    <div className={classes.container}>
                        <CallToAction playground={playground}/>
                    </div>
                </Parallax>

                <div className={classNames(classes.main, classes.mainRaised)}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <PlaygroundSearch />
                      <PlaygroundMap
                        isMarkerShown
                        onPlaygroundChange={this.handlePlaygroundChange}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <PlaygroundStatistics playground={playground} />
                      <StartOrJoinInitiative playground={playground} />
                    </GridItem>
                  </GridContainer>
                </div>
                <Footer />
            </div>
    );
  }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(Onboarding)
);

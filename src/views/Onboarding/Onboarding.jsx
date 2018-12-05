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
import NewPlayground from "./forms/NewPlayground.jsx";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

class Onboarding extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlaygroundChange = this.handlePlaygroundChange.bind(this);
        const { t } = this.props;
        this.state = {
            playground: {
                default: true,
                name: t("playground.default.area")
            },
            map: {
                latlng: {lat: 52.092876, lng: 5.10448},
                zoom: 8
            },
            view: 'default'
        };
    }

    handlePlaygroundChange(playground) {
        this.setState({
            playground: playground,
            map: {
                latlng: {lat: playground.lat, lng: playground.lng},
                zoom: 18
            }
        });
    }

    handleCreatePlayground = (e) => {
        this.setState({
            view: 'playground',
            playground: { latLng: e.latLng }
        });
    }

    render() {
        const {classes, ...rest } = this.props;
        const {playground, map} = this.state;
        var view = this.state.view === 'default' ?
            <div>
            <PlaygroundStatistics playground={playground} />
            <StartOrJoinInitiative playground={playground} />
            </div>
        :
            <NewPlayground playground={playground} />;

        return (
            <div className={"onboarding-wrapper"}>

                <Header
                    brand={"Rookvrije generatie"}
                    rightLinks={<HeaderLinks/>}
                    fixed
                    color="white"
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />

               <Parallax image={require("assets/img/bg-zand.jpg")} className={"parralax"} >
                    <div className={classes.container}>
                        <CallToAction playground={playground}/>
                    </div>
                </Parallax>

                <div className={classNames(classes.main, classes.mainRaised) + " onboarding-container"}>
                  <GridContainer className={"grid-container"}>
                    <GridItem xs={12} sm={12} md={6} className={"playground-map-container"}>
                      <PlaygroundSearch onPlaygroundChange={this.handlePlaygroundChange}/>
                      <PlaygroundMap
                        isMarkerShown
                        onPlaygroundChange={this.handlePlaygroundChange}
                        onPlaygroundCreated={this.handleCreatePlayground}
                        center={map.latlng}
                        zoom={map.zoom}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        {view}
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

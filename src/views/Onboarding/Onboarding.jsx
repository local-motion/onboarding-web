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
import PlaygroundDetails from "./Sections/PlaygroundDetails";
import CallToAction from "./Sections/CallToAction";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

class Onboarding extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlaygroundChange = this.handlePlaygroundChange.bind(this);
        this.state = {
            playground: null,
            intentToHelp: {
                cityArea: "een speeltuin"
            },
            map: {
                latlng: {lat: 52.092876, lng: 5.10448},
                zoom: 8
            }
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

    render() {
        const {classes} = this.props;
        const {playground, intentToHelp, map} = this.state;
        return (
            <div>
                {/*<Header
                  brand={t("header.brand")}
                  rightLinks={<HeaderLinks />}
                  fixed
                  color="transparent"
                  changeColorOnScroll={{
                    height: 100,
                    color: "white"
                  }}
                  {...rest}
                />*/}
                <Parallax image={require("assets/img/bg-zand.jpg")}>
                    <div className={classes.container}>
                        <CallToAction intentToHelp={intentToHelp}/>
                    </div>
                </Parallax>

                <div className={classNames(classes.main, classes.mainRaised)}>
                    {/*<div className={classes.space70} />*/}
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <PlaygroundSearch/>
                            <PlaygroundMap
                                isMarkerShown
                                onPlaygroundChange={this.handlePlaygroundChange}
                                center={map.latlng}
                                zoom={map.zoom}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <PlaygroundDetails playground={playground}/>
                        </GridItem>
                    </GridContainer>
                </div>

                <Footer/>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(Onboarding)
);

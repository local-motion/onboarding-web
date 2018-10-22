import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import PlaygroundSearch from "./Sections/PlaygroundSearch";
import PlaygroundMap from "./Sections/PlaygroundMap";
import PlaygroundStatistics from "./Sections/SmokeFreeProgress";
import PlaygroundDetails from "./Sections/PlaygroundDetails";
import CallToAction from "./Sections/CallToAction";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import {withNamespaces} from "react-i18next";

class Onboarding extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlaygroundChange = this.handlePlaygroundChange.bind(this);
        this.state = {
            playground: null,
            intentToHelp: {
                cityArea: 'Haarlem-Zuid'
            }
        };
    }

    handlePlaygroundChange(playground) {
        console.log('Onboarding parent received selected playground:', playground)
        this.setState({playground: playground});
    }

    render() {
        const {classes, ...rest} = this.props;
        const {t} = this.props;
        const {playground, intentToHelp} = this.state;
        return (
            <div>
                <Header
                    brand={t('header.brand')}
                    rightLinks={<HeaderLinks/>}
                    fixed
                    color="transparent"
                    changeColorOnScroll={{
                        height: 100,
                        color: "white"
                    }}
                    {...rest}
                />
                <Parallax image={require("assets/img/bg2.jpg")}>
                    <div className={classes.container}>
                        <CallToAction intentToHelp={intentToHelp}/>
                    </div>
                </Parallax>

                <div className={classNames(classes.main, classes.mainRaised)}>
                    {/*<div className={classes.space70} />*/}
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <PlaygroundSearch onPlaygroundChange={this.handlePlaygroundChange} />
                            <PlaygroundMap isMarkerShown onPlaygroundChange={this.handlePlaygroundChange}/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <PlaygroundStatistics />
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

export default withStyles(componentsStyle)(withNamespaces("translations")(Onboarding));

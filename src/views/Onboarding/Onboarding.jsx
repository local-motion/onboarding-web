import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { withTranslation } from "react-i18next";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import Explanation from "components/Explanation/Explanation.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import PlaygroundSearch from "./Sections/PlaygroundSearch";
import PlaygroundMap from "./Sections/PlaygroundMap";
import PlaygroundStatistics from "./Sections/PlaygroundStatistics";
import CallToAction from "./Sections/CallToAction";
import AddPlayground from "./Sections/AddPlayground";
import { connect } from 'react-redux'
import { ensurePlaygrounds } from "../../components/Playground/PlaygroundActions";
import { getAllPlaygrounds } from "../../components/Playground/PlaygroundReducer";
import { getUser } from "../../components/UserProfile/UserProfileReducer";


const mapStateToProps = state => ({
        playgrounds: getAllPlaygrounds(state).map(playground => ({
                id: playground.id,
                name: playground.name,
                lat: playground.lat,
                lng: playground.lng,
                vol: playground.volunteerCount,
                votes: playground.votes,
                slug: playground.name + " Rookvrij",
                zoom: 18,
                default: false,
            })
        ),
        user: getUser(state)
})

const mapDispatchToProps = dispatch => {
    return {
        ensurePlaygrounds:    () =>     dispatch(ensurePlaygrounds()),
      }
}

// Define this variable here to set it once when the module is loaded

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

    componentDidMount() {
        this.props.ensurePlaygrounds()
    }

    handlePlaygroundChange(playground) {
        this.setState({
            view: 'default',
            playground: playground,
            map: {
                latlng: {lat: playground.lat, lng: playground.lng},
                zoom: playground.zoom
            }
        });
    }

    render() {
        const {playgrounds, classes, user, ...rest } = this.props;
        const {playground, map} = this.state;

        return (
            <div className={"onboarding-wrapper"}>

                <Header
                    brand={"Rookvrije generatie"}
                    rightLinks={<HeaderLinks/>}
                    fixed
                    color="white"
                    disableBackButton
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />

               <Parallax image={require("assets/img/backgrounds/bg-zand.jpg")} className={"parralax onboarding"} >
                    <div className={classes.container + " onboarding-header"}>
                        <CallToAction playground={playground}/>
                    </div>
                </Parallax>

                <div className={classNames(classes.main, classes.mainRaised) + " onboarding-container"}>
                    <GridContainer className={"grid-container"}>
                        <GridItem xs={12} sm={12} md={6} className={"playground-map-container"}>
                            <PlaygroundSearch onPlaygroundChange={this.handlePlaygroundChange} playgrounds={playgrounds}/>
                            <PlaygroundMap
                                isMarkerShown
                                viewOnly={true}
                                onPlaygroundChange={this.handlePlaygroundChange}
                                center={map.latlng}
                                zoom={map.zoom}
                            />
                            <AddPlayground playgrounds={playgrounds} user={user}/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} className={"playground-stat-container"}>
                            <div>
                                <PlaygroundStatistics
                                    playgrounds={playgrounds}
                                    playground={playground}
                                    onBackButton={this.handlePlaygroundChange}
                                    defaultView={playground.default}
                                />
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
                <Explanation />
                <Footer />
            </div>
        );
    }
}

export default withStyles(componentsStyle)(
    withTranslation("translations")(connect(mapStateToProps, mapDispatchToProps)(Onboarding))
);

import React from "react";
import { connect } from 'react-redux'
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";
import { withTranslation } from "react-i18next";

import Footer from "components/Footer/Footer.jsx";
import Explanation from "components/Explanation/Explanation.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import PlaygroundSearch from "./Sections/PlaygroundSearch";
import PlaygroundMap from "./Sections/PlaygroundMap";
import PlaygroundStatistics from "./Sections/PlaygroundStatistics";
import CallToAction from "./Sections/CallToAction";
import AddPlayground from "./Sections/AddPlayground";
import { ensurePlaygrounds } from "../../components/Playground/PlaygroundActions";
import { getAllPlaygrounds } from "../../components/Playground/PlaygroundReducer";
import { getUser } from "../../components/UserProfile/UserProfileReducer";
import Startscreen from "./Sections/Startscreen";
import Statistics from "./Sections/Statistics";

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
});

const mapDispatchToProps = dispatch => ({
    ensurePlaygrounds:    () =>     dispatch(ensurePlaygrounds()),
});


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
        const isPlayground = playground.id;

        this.setState({
            view: 'default',
            playground: isPlayground
                ? playground
                : {
                    default: true,
                    name: this.props.t("playground.default.area")
                },
            map: {
                latlng: {lat: playground.lat, lng: playground.lng},
                zoom: playground.zoom || 10
            }
        });
    }

    render() {
        const {playgrounds, classes, user } = this.props;
        const {playground, map} = this.state;

        return (
            <div className={"onboarding-wrapper"}>

                <Startscreen />

                <Statistics />

                <div className={classNames(classes.main) + " onboarding-container"}>
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
                            { this.state.playground.default &&
                                <AddPlayground playgrounds={playgrounds} user={user}/>
                            }
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
                <Footer onlyLinks />
            </div>
        );
    }
}

export default withStyles(componentsStyle)(
    withTranslation("translations")(connect(mapStateToProps, mapDispatchToProps)(Onboarding))
);

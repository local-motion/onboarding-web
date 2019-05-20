import React from "react";
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

import { ensurePlaygrounds } from "../../components/Playground/PlaygroundActions";
import { getAllPlaygrounds } from "../../components/Playground/PlaygroundReducer";
import { getUser } from "../../components/UserProfile/UserProfileReducer";
import Startscreen from "./Sections/Startscreen";
import Statistics from "./Sections/Statistics";
import Playgrounds from "./Sections/Playgrounds/Playgrounds";
import AboutUs from "./Sections/AboutUs";
import SmokefreePhases from "./Sections/SmokefreePhases";
import OnboardingFooter from "./Sections/OnboardingFooter";

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

        this.state = {
            playground: {
                default: true,
                name: this.props.t("playground.default.area")
            },
            map: {
                latlng: {lat: 52.092876, lng: 5.10448},
                zoom: 8
            },
            view: 'default',
            isAddPlaygroundOpen: false
        };

        this.handlePlaygroundChange = this.handlePlaygroundChange.bind(this);
        this.toggleAddPlayground = this.toggleAddPlayground.bind(this);
    }

    handlePlaygroundChange(playground) {
        const isPlayground = playground.id;

        const newState = {
            view: 'default',
            playground: isPlayground
              ? playground
              : {
                  default: true,
                  name: this.props.t("playground.default.area")
              },
        };

        if (playground.lat && playground.lng) {
            newState.map = {
                latlng: {lat: playground.lat, lng: playground.lng},
                zoom: playground.zoom || 10
            };
        }

        this.setState(newState);
    }

    toggleAddPlayground() {
        this.props.history.push('/actie/zoeken');
    }

    render() {
        const { playgrounds, user } = this.props;
        const { playground, map } = this.state;

        return (
            <div className={"onboarding-wrapper"}>
                <Startscreen onCtaClick={this.toggleAddPlayground} />

                <Statistics onCtaClick={this.toggleAddPlayground} />

                <Playgrounds
                  playgrounds={playgrounds}
                  user={user}
                  playground={playground}
                  map={map}
                  handlePlaygroundChange={this.handlePlaygroundChange}
                  onCtaClick={this.toggleAddPlayground}
                />

                <AboutUs />

                <SmokefreePhases onCtaClick={this.toggleAddPlayground} />

                <OnboardingFooter />
            </div>
        );
    }
}

export default withStyles(componentsStyle)(
    withTranslation("translations")(connect(mapStateToProps, mapDispatchToProps)(withRouter(Onboarding)))
);

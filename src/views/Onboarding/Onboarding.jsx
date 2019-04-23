import React from "react";
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";
import { withTranslation } from "react-i18next";

import Footer from "components/Footer/Footer.jsx";
import Explanation from "components/Explanation/Explanation.jsx";
import { ensurePlaygrounds } from "../../components/Playground/PlaygroundActions";
import { getAllPlaygrounds } from "../../components/Playground/PlaygroundReducer";
import { getUser } from "../../components/UserProfile/UserProfileReducer";
import Startscreen from "./Sections/Startscreen";
import Statistics from "./Sections/Statistics";
import Playgrounds from "./Sections/Playgrounds/Playgrounds";
import AddPlayground from "./Sections/Playgrounds/AddPlayground";

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

    toggleAddPlayground() {
        this.setState(({ isAddPlaygroundOpen }) => ({ isAddPlaygroundOpen: !isAddPlaygroundOpen }));
    }

    render() {
        const { playgrounds, classes, user } = this.props;
        const { playground, map, isAddPlaygroundOpen } = this.state;

        return (
            <div className={"onboarding-wrapper"}>
                <Startscreen onCtaClick={this.toggleAddPlayground} />

                <Statistics onCtaClick={this.toggleAddPlayground} />

                <Playgrounds
                  playgrounds={playgrounds}
                  classes={classes}
                  user={user}
                  playground={playground}
                  map={map}
                  handlePlaygroundChange={this.handlePlaygroundChange}
                  onCtaClick={this.toggleAddPlayground}
                />

                <Explanation />

                <Footer onlyLinks />

                <AddPlayground
                  playgrounds={playgrounds}
                  user={user}
                  toggleOpen={this.toggleAddPlayground}
                  isOpen={isAddPlaygroundOpen}
                />
            </div>
        );
    }
}

export default withStyles(componentsStyle)(
    withTranslation("translations")(connect(mapStateToProps, mapDispatchToProps)(Onboarding))
);

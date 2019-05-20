import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { getPlaygroundDetails } from "../../components/Playground/PlaygroundReducer.js";
import { getUser } from "../../components/UserProfile/UserProfileReducer.js";
import { getAllPlaygrounds } from "../../components/Playground/PlaygroundReducer";
import { getPhases, getWorkspaceStartLink, shouldWorkspaceUpdate } from "../../misc/WorkspaceHelpers";
import WorkspacePage from "./Sections/WorkspacePage";
import { createInitiative, slugifyPlaygroundName } from "../../components/Playground/PlaygroundActions";

const mapStateToProps = (state, ownProps) => ({
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
    playground: getPlaygroundDetails(state, ownProps.match.params.initiativeName),

    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    createInitiative:    (name, lat, lng, onSuccessCallback) =>     dispatch(createInitiative(name, lat, lng, onSuccessCallback)),
});


class WorkspaceTemplate extends React.Component {
    componentDidMount() {
        this.createLocalPlayground();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return shouldWorkspaceUpdate(this.props, nextProps);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.user && this.props.user) {
            this.createLocalPlayground();
        }
    }

    createLocalPlayground = () => {
        const { createInitiative, history, user } = this.props;

        const playgroundToCreate = JSON.parse(localStorage.getItem('playgroundToCreate'));

        if (user && (playgroundToCreate !== null)) {
            const { name, lat, lng } = playgroundToCreate;

            createInitiative(name, lat, lng, (data) => {
                localStorage.removeItem('playgroundToCreate');
                history.push('/actie/' + slugifyPlaygroundName(data.createInitiative));
            });
        }
    };

    render() {
        const { playground, user, classes, signInHandler, ...rest } = this.props;

        const startPathUrl = getWorkspaceStartLink(playground);

        const phases = getPhases();

        return (
            <div className={"workspace-wrapper"}>
                <WorkspacePage
                    playground={playground}
                    phases={phases}
                    startPathUrl={startPathUrl}
                    user={user}
                    classes={classes}
                    rest={rest}
                    signInHandler={signInHandler}
                />
            </div>
        );
    }
}

export default withRouter(withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(WorkspaceTemplate)));

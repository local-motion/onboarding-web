import React from "react";
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { isLoading, getFetchError } from "../../api/FetchDetailsReducer.js";
import { GET_PLAYGROUND_DETAILS, ensurePlaygroundDetails, stopPlaygroundDetailsStream } from "../../components/Playground/PlaygroundActions.js";
import { getPlaygroundDetails } from "../../components/Playground/PlaygroundReducer.js";
import { getUser } from "../../components/UserProfile/UserProfileReducer.js";
import { getAllPlaygrounds } from "../../components/Playground/PlaygroundReducer";
import {
    playgroundLabels,
    playgroundStatuses,
    getPhases,
    getOpenedStepTitle,
    shouldWorkspaceUpdate,
} from "../../misc/WorkspaceHelpers";
import WorkspacePage from "./Sections/WorkspacePage";

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
    playground: getPlaygroundDetails(state, ownProps.match.params.initiativeId),
    playgroundLoading: isLoading(state, GET_PLAYGROUND_DETAILS, ownProps.match.params.initiativeId),
    playgroundError: getFetchError(state, GET_PLAYGROUND_DETAILS, ownProps.match.params.initiativeId),

    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    ensurePlaygroundDetails:        (initiativeId) =>     dispatch(ensurePlaygroundDetails(initiativeId)),
    stopPlaygroundDetailsStream:    (initiativeId) =>     dispatch(stopPlaygroundDetailsStream(initiativeId)),
});


class WorkspaceTemplate extends React.Component {
    componentDidMount() {
        console.log("starting stream playground details of " + this.props.match.params.initiativeId);
        this.props.ensurePlaygroundDetails(this.props.match.params.initiativeId);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return shouldWorkspaceUpdate(this.props.playground, nextProps.playground);
    }

    componentWillUnmount() {
        console.log('stopping stream: ', this.props.match.params.initiativeId);
        this.props.stopPlaygroundDetailsStream(this.props.match.params.initiativeId);
    }

    getStatus() {
        const playgroundStatus = this.props.playground
          ? this.props.playground.status
          : '';

        const result = playgroundStatuses.find(element => element === playgroundStatus);

        return result
          ? playgroundLabels[playgroundStatuses.indexOf(result)]
          : null;
    }

    render() {
        const { playground, user, classes, ...rest } = this.props;

        // const activePhaseIdx = this.getStatusIndex();                        // the active phase represents the current state of this playground
        // const phaseIdx = this.props.match.params.phaseId - 1;                // The phase that the user has selected, if any
        // const phase = playgroundLabels[activePhaseIdx];                      // the label of phase that is displayed in the phases view

        if (!playground)
            return "loading..";

        const startPathUrl = `/workspace/${this.props.playground.id}`;

        const phases = getPhases(startPathUrl);

        const openedStepTitle = getOpenedStepTitle(phases, this.props.match.url);

        const activePhase = openedStepTitle !== null
          ? openedStepTitle
          : this.getStatus();

        return (
            <div className={"workspace-wrapper"}>
                <WorkspacePage
                    playground={playground}
                    phases={phases}
                    activePhase={activePhase}
                    user={user}
                    classes={classes}
                    rest={rest}
                />
            </div>
        );
    }
}

export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(WorkspaceTemplate));

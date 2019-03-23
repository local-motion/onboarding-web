import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getUser } from "../../../components/UserProfile/UserProfileReducer";
import { getPlaygroundDetails } from "../../../components/Playground/PlaygroundReducer";
import { joinInitiative } from "../../../components/Playground/PlaygroundActions";
import { getActivePhaseUrl } from "../../../misc/WorkspaceHelpers";

const mapStateToProps = (state, ownProps) => ({
    playground: getPlaygroundDetails(state, ownProps.match.params.initiativeId),
    user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
    joinInitiative: (initiativeId) => dispatch(joinInitiative(initiativeId)),
});

const WorkspaceJoin = ({ history, user, playground, joinInitiative }) => {
    if (!user || !playground)
        return "loading..";

    const activePhaseUrl = getActivePhaseUrl(playground);
    const isUserAlreadyJoined = playground.volunteers.find(({ userId }) => userId === user.id);

    if (!isUserAlreadyJoined) {
        joinInitiative(playground.id);
        console.log('join!');
    }

    history.push(activePhaseUrl);

    return <div>Join</div>;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspaceJoin));
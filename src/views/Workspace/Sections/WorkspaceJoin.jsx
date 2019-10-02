import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getUser } from "../../../components/UserProfile/UserProfileReducer";
import { getPlaygroundDetails } from "../../../components/Playground/PlaygroundReducer";
import { joinInitiative } from "../../../components/Playground/PlaygroundActions";
import { getActivePhaseUrl } from "../../../misc/WorkspaceHelpers";
import { logdebug } from "utils/Logging";

const mapStateToProps = (state, ownProps) => ({
    playground: getPlaygroundDetails(state, ownProps.match.params.initiativeName),
    user: getUser(state),
})

const mapDispatchToProps = (dispatch) => ({
    joinInitiative: (initiativeId) => dispatch(joinInitiative(initiativeId)),
})

class WorkspaceJoin extends React.Component {
    state = {
        joined: false,
    }

    tryJoinInitiative() {
        const { history, user, playground, joinInitiative } = this.props

        if (user && playground && !this.state.joined) {
            const activePhaseUrl = getActivePhaseUrl(playground);
            const isUserAlreadyJoined = playground.volunteers.find(({ userId }) => userId === user.id)

            if (!isUserAlreadyJoined) {
                joinInitiative(playground.id)
                logdebug('Joining initiative ' + playground.id)
            }
            this.setState( {joined: true} )
            history.push(activePhaseUrl)
        }
    }

    componentDidMount() {
        this.tryJoinInitiative()
    }
    componentDidUpdate() {
        this.tryJoinInitiative()
    }

    render() {
        return <div>Join</div>;
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspaceJoin));
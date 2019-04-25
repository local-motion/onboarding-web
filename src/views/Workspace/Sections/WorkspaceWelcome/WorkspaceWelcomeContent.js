import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import PlaygroundIcon from "../../../../components/PlaygroundIcons/PlaygroundIcons";
import workspaceWelcomeStyle from "./WorkspaceWelcomeStyle";
import { getActivePhaseUrl, getStatus, getWorkspaceStartLink } from "../../../../misc/WorkspaceHelpers";
import { playgroundIcons } from "../../../../components/PlaygroundIcons/playgroundIconsConstants";
import Statistics from "../../../../components/Statistics/Statistics";

class WorkspaceWelcomeContent extends Component {
    constructor(props) {
        super(props);

        this.getPhaseIcon = this.getPhaseIcon.bind(this);
    }

    componentDidMount() {
        this.goToActivePhaseIfJoined();
    }

    goToActivePhase() {
        const { playground, history } = this.props;
        const activePhaseUrl = getActivePhaseUrl(playground);

        history.push(activePhaseUrl);
    }

    goToActivePhaseIfJoined() {
        const { user } = this.props;

        if (!user)
            return;

        if (this.isUserAlreadyJoined()) {
            this.goToActivePhase();
        }
    }

    isUserAlreadyJoined() {
        const { playground, user } = this.props;

        return playground.volunteers.find(({ userId }) => userId === user.id);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.user && this.props.user) {
            this.goToActivePhaseIfJoined();
        }
    }

    goToJoinPage() {
        const { playground, user, history } = this.props;

        const startUrl = getWorkspaceStartLink(playground);
        const loginUrl = `/login?target=${startUrl}`;

        history.push(
          `${startUrl}${user ? '' : loginUrl}/join`
        );
    }

    getPhaseIcon() {
        const status = getStatus(this.props.playground);

        return playgroundIcons.find(({ title }) => title === status);
    }

    render() {
        const { classes, playground, user } = this.props;

        const mainButtonText = user
          ? 'Doe mee, ga naar de actieve stap!'
          : 'Doe mee en meld je aan!';

        return (
          <div className={classes.workspaceWelcomeContent}>
              <div className={classes.mainImage}>
                  <img src={require('assets/img/backgrounds/workspace-welcome-bg.jpg')} alt="WorkspaceWelcome" />
              </div>

              <div className={classes.icons}>
                  <PlaygroundIcon icon={this.getPhaseIcon()} />
              </div>

              <Statistics playground={playground} />

              <div className={classes.buttonContainer}>
                  <button
                    className={classes.button}
                    onClick={() => this.goToJoinPage()}>
                      {mainButtonText}
                  </button>
              </div>
          </div>
        );
    }
}

export default withRouter(withStyles(workspaceWelcomeStyle)(WorkspaceWelcomeContent));
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import PlaygroundIcon from "../../../../components/PlaygroundIcons/PlaygroundIcons";
import workspaceWelcomeStyle from "./WorkspaceWelcomeStyle";
import { getActivePhaseUrl, getStatus } from "../../../../misc/WorkspaceHelpers";
import { playgroundIcons } from "../../../../components/PlaygroundIcons/playgroundIconsConstants";

class WorkspaceWelcomeContent extends Component {
    constructor(props) {
        super(props);

        this.getPhaseIcon = this.getPhaseIcon.bind(this);
    }
    goToJoinPage() {
        this.props.history.push(
          `${this.props.user ? '' : '/login?target='}/workspace/${this.props.match.params.initiativeId}/join`
        );
    }

    gotoActivePhase() {
        const activePhaseUrl = getActivePhaseUrl(this.props.playground);

        this.props.history.push(activePhaseUrl);
    }

    getPhaseIcon() {
        const status = getStatus(this.props.playground);

        return playgroundIcons.find(({ title }) => title === status);
    }

    render() {
        const { classes } = this.props;

        return (
          <div className={classes.workspaceWelcomeContent}>
              <div className={classes.mainImage}>
                  <img src={require('assets/img/backgrounds/workspace-welcome-bg.jpg')} alt="WorkspaceWelcome" />
              </div>
              <div className={classes.icons}>
                  <PlaygroundIcon playgroundIcon={this.getPhaseIcon()} />
              </div>
              <div className={classes.buttonContainer}>
                  <button
                    className={classes.button}
                    onClick={() => this.goToJoinPage()}>
                      Ga direct aan de slag
                  </button>
              </div>
          </div>
        );
    }
}

export default withRouter(withStyles(workspaceWelcomeStyle)(WorkspaceWelcomeContent));
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import PlaygroundIcons from "../../../../components/PlaygroundIcons/PlaygroundIcons";
import workspaceWelcomeStyle from "./WorkspaceWelcomeStyle";
import { getActivePhaseUrl, getStatus } from "../../../../misc/WorkspaceHelpers";
import { playgroundIcons } from "../../../../components/PlaygroundIcons/playgroundIconsConstants";

class WorkspaceWelcomeContent extends Component {
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
        const currentPhaseIcons = playgroundIcons.find(({ title }) => title === status);
    }

    render() {
        const { classes, playground } = this.props;

        return (
          <React.Fragment>
              <div className={classes.icons}>
                  <PlaygroundIcons />
              </div>
              <div className={classes.buttonContainer}>
                  <button
                    className={classes.button}
                    onClick={() => this.goToJoinPage()}>
                      Ga direct aan de slag
                  </button>
                  <button className={classes.skip} onClick={() => this.gotoActivePhase()}>
                      Ga direct naar de pagina
                  </button>
              </div>
          </React.Fragment>
        );
    }
}

export default withRouter(withStyles(workspaceWelcomeStyle)(WorkspaceWelcomeContent));
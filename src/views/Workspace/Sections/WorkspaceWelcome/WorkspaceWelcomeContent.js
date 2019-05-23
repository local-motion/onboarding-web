import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Close from "@material-ui/icons/Close";

import PlaygroundIcon from "../../../../components/PlaygroundIcons/PlaygroundIcons";
import workspaceWelcomeStyle from "./WorkspaceWelcomeStyle";
import { getActivePhaseUrl, getStatus, getWorkspaceStartLink, titlePrefix } from "../../../../misc/WorkspaceHelpers";
import { playgroundIcons } from "../../../../components/PlaygroundIcons/playgroundIconsConstants";
import Statistics from "../../../../components/Statistics/Statistics";
import { Helmet } from "react-helmet";

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
        const { user, playground } = this.props;

        if (!user || !playground.volunteers)
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
        // const startUrl = `/workspace/${playground.id}`;
        const loginUrl = `/login?target=${startUrl}`;

        history.push(
          `${startUrl}${user ? '' : loginUrl}/join`
        );
    }

    goToWorkspaceWelcomePage() {
        const { playground, history } = this.props;

        history.push(`/workspace/${playground.id}`);
    }

    getPhaseIcon() {
        const status = getStatus(this.props.playground);

        return playgroundIcons.find(({ title }) => title === status);
    }

    render() {
        const { classes, playground, user, view, onClosePopup } = this.props;

        const isViewSmall = view === 'small';
        const getSmallClassFor = name => isViewSmall ? classes[name] : '';

        const mainButtonText = user
          ? 'Doe mee, ga naar de actieve stap!'
          : 'Doe mee en meld je aan!';

        const buttonText = isViewSmall
          ? 'Bekijk speeltuin'
          : mainButtonText;

        return (
          <div className={`${classes.workspaceWelcomeContent} ${getSmallClassFor('smallWorkspaceWelcomeContent')}`}>
              <Helmet>
                  <title>{titlePrefix} | Welkom bij {playground.name}</title>
              </Helmet>

              {
                  isViewSmall && (
                    <div className={classes.headerTitleWrapper}>
                        <div className={classes.headerTitle}>{playground.name}</div>

                        {onClosePopup && (
                          <div
                            className={classes.closeIconWrapper}
                            onClick={onClosePopup}
                          >
                              <Close className={classes.closeIcon} />
                          </div>
                        )}
                    </div>
                  )
              }
              <div className={`${classes.mainImage} ${getSmallClassFor('smallMainImage')}`} />

              <div className={`${classes.icons} ${getSmallClassFor('smallIcons')}`}>
                  <PlaygroundIcon view={view} icon={this.getPhaseIcon()} />
              </div>

              <Statistics playground={playground} view={view} />

              <div className={`${classes.buttonContainer} ${getSmallClassFor('smallButtonContainer')}`}>
                  <button
                    className={`${classes.button} ${getSmallClassFor('smallButton')}`}
                    onClick={() => {
                        isViewSmall
                          ? this.goToWorkspaceWelcomePage()
                          : this.goToJoinPage();
                    }}>
                      {buttonText}
                  </button>
              </div>
          </div>
        );
    }
}

export default withRouter(withStyles(workspaceWelcomeStyle)(WorkspaceWelcomeContent));
import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import playgroundIconsStyle from "./PlaygroundIconsStyle.jsx";

class PlaygroundIcons extends React.PureComponent {
    render() {
        const { classes, icon, view } = this.props;

        const isViewSmall = view === 'small';
        const getSmallClassFor = name => isViewSmall ? classes[name] : '';

        return (
          <div className={classes.icon}>
              <div
                style={{
                    backgroundImage: `url(${icon.bg})`
                }}
                className={`${classes.iconBgImage} ${getSmallClassFor('smallIconBgImage')}`}>
                  <div
                    style={{
                        backgroundImage: `url(${icon.icon})`
                    }}
                    className={`${classes.iconImage} ${getSmallClassFor('smallIconImage')}`}
                  />
              </div>
              <div className={`${classes.iconTitle} ${getSmallClassFor('smallIconTitle')}`}>{icon.title}</div>
              <div className={`${classes.iconText} ${getSmallClassFor('smallIconText')}`}>Actieve fase</div>
          </div>
        );
    }
}


export default withStyles(playgroundIconsStyle)(PlaygroundIcons);

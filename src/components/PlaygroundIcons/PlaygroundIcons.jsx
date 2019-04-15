import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import playgroundIconsStyle from "./PlaygroundIconsStyle.jsx";

class PlaygroundIcons extends React.PureComponent {
    render() {
        const { classes, icon } = this.props;

        return (
          <div className={classes.icon}>
              <div
                style={{
                    backgroundImage: `url(${icon.bg})`
                }}
                className={classes.iconBgImage}>
                  <div
                    style={{
                        backgroundImage: `url(${icon.icon})`
                    }}
                    className={classes.iconImage}
                  />
              </div>
              <div className={classes.iconTitle}>{icon.title}</div>
              <div className={classes.iconText}>Actieve fase</div>
          </div>
        );
    }
}


export default withStyles(playgroundIconsStyle)(PlaygroundIcons);

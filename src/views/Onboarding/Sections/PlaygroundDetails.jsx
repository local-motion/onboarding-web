import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import { withNamespaces } from "react-i18next";

class PlaygroundDetails extends React.Component {
  render() {
    const { t, classes, playground } = this.props;
    if (!playground) return null;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <div id="navigation-pills">
            <div className={classes.title}>
              <h3>
                {t("onboarding.playground.details.title", {
                  playgroundName: playground.name
                })}
              </h3>
            </div>
            <div className={classes.title}>
              <h3>
                <small>{t("onboarding.playground.details.subtitle")}</small>
              </h3>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(pillsStyle)(
  withNamespaces("translations")(PlaygroundDetails)
);

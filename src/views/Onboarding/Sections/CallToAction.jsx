import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { withNamespaces } from "react-i18next";
import componentsStyle from "../../../assets/jss/material-kit-react/views/components";

class CallToAction extends React.Component {
  render() {
    const { intentToHelp, t, classes } = this.props;

    return (
      <GridContainer>
        <GridItem>
          <div className={classes.brand}>
            <h1 className={"grunge-title"}>
              <span>Maak </span>
              {t("onboarding.playground.calltoaction.title", {
                cityArea: intentToHelp.cityArea
              })}
              <span className="lm-red-1"> Rookvrij</span>
            </h1>
            <h3 className={classes.subtitle}>
              {t("onboarding.playground.calltoaction.subtitle", {
                cityArea: intentToHelp.cityArea
              })}
            </h3>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(componentsStyle)(
  withNamespaces("translations")(CallToAction)
);

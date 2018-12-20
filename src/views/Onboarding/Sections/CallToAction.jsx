import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import {withNamespaces} from "react-i18next";
import componentsStyle from "../../../assets/jss/material-kit-react/views/components";

class CallToAction extends React.Component {
    render() {
        const {playground, t, classes} = this.props;
        const isDefault = playground.default;
        const defaultSet = isDefault ? "default" : "specific"

        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} className={"onboarding-header-container"}>
                    <div className={classes.brand + " onboarding-header"}>
                        <h2 className={"grunge-title"}>
                            {t("onboarding.playground.calltoaction.title.name." + defaultSet + ".first", {playgroundName: playground.name})}
                            <span className="lm-red-1"> {t("onboarding.playground.calltoaction.smokefree")}</span>
                            <span> {t("onboarding.playground.calltoaction.title.name." + defaultSet + ".last")}</span>
                        </h2>
                        <h3 className={classes.subtitle + " subtitle"}>
                            {t("onboarding.playground.calltoaction.subtitle", {
                                playgroundName: playground.name
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

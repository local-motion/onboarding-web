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

        return (
            <GridContainer>
                <GridItem>
                    <div className={classes.brand}>
                        <h1 className={"grunge-title"}>
                            {t("onboarding.playground.calltoaction.title.name", {
                                playgroundName: playground.name
                            })}
                            <span className="lm-red-1"> {t("onboarding.playground.calltoaction.smokefree")}</span>
                        </h1>
                        <h3 className={classes.subtitle}>
                            {t("onboarding.playground.calltoaction.subtitle", {
                                playgroundName: playground.name
                            })}
                            {
                                isDefault ?
                                    <span>{t("onboarding.playground.calltoaction.subtitle.cta.default")}</span> :
                                    <span>{t("onboarding.playground.calltoaction.subtitle.cta.specific")}</span>
                            }
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

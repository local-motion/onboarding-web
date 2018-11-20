import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import { withNamespaces } from "react-i18next";
import GlobalProgress from "./PlaygroundStatistics";
import StartOrJoinInitiative from "./JoinInitiative";

class PlaygroundDetails extends React.Component {
    render() {
        const { t, classes, playground } = this.props;
        if(!playground) return (<GlobalProgress/>);

        return (
            <div className={classes.section}>
                <div className={classes.container}>
                    <div id="navigation-pills">
                        <div className={classes.title}>
                            <h2>
                                {t("onboarding.playground.details.title", {
                                    playgroundName: playground.name
                                })}
                            </h2>
                        </div>

                        <StartOrJoinInitiative playground={playground}/>

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

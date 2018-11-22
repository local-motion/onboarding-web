import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import {withNamespaces} from "react-i18next";

const style = {
    statTitle: {
        margin: "0"
    },
    stat: {
        fontSize: "80px",
        lineHeight: "85px"
    }
};


class PlaygroundStatistic extends React.Component {
    render() {
        const {t, classes, progress, name, measurement } = this.props;
        return (
            <div className={"statistic-container " + name}>
                <h2 className={classes.statTitle + " grunge-title"}>
                    <span className={classes.stat}>{progress[measurement]}</span>
                    {t(
                        `onboarding.playground.progress.${name}.title`
                    )}
                </h2>
            </div>
        );
    }
}

export default withStyles(style)(
    withNamespaces("translations")(PlaygroundStatistic)
);

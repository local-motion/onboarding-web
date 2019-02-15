import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import {withTranslation} from "react-i18next";

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
        const {t, classes, playground, name, stat } = this.props;
        return (
            <div className={"statistic-container " + name}>
                <h2 className={classes.statTitle + " grunge-title"}>
                    <span className={classes.stat}>{playground[stat]}</span>
                    {t(
                        `onboarding.playground.${stat}.title`
                    )}
                </h2>
            </div>
        );
    }
}

export default withStyles(style)(
    withTranslation("translations")(PlaygroundStatistic)
);

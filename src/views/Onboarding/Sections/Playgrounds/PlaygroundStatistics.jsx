import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import DefaultStatistic from "components/PlaygroundStatistic/DefaultStatistic.jsx";
import PlaygroundStatistic from "components/PlaygroundStatistic/PlaygroundStatistic.jsx";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button/Button";
import { history } from "../../../../setup.js";

import {withTranslation} from "react-i18next";
import { getStatistics } from "../../../../components/Playground/PlaygroundReducer.js";
import { connect } from 'react-redux'
import { getWorkspaceStartLink } from "../../../misc/WorkspaceHelpers";


const mapStateToProps = state => ({
        progress: getStatistics(state).progress
})

class PlaygroundStatistics extends React.Component {

    render() {
        const {progress, t, classes, playground, defaultView} = this.props;
        const generalStatistics = defaultView;

        const defaultPlayground = {
            name: t("playground.default.area"),
            lng: 5.10448,
            lat: 52.092876,
            zoom: 8,
            default: true,
        }

        return (
            <div className={classes.section + " playground-statistics wrapper"}>
                <div className={classes.container + " playground-statistics container"}>
                    <h2 className="playground-statistics title">
                        {playground.name}
                    </h2>
                    <div>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} lg={6} className="grid-item">
                                <p className="explainer">
                                    {
                                        generalStatistics ?
                                            t("onboarding.playground.progress.intro.default", {
                                                cityArea: playground.name,
                                                playgroundCount: progress.smoking.count
                                            }) :
                                            t("onboarding.playground.progress.intro.specific", {playgroundName: playground.name})
                                    }
                                </p>
                                <div className="statistics-wrapper default"
                                     style={
                                         {display: generalStatistics ? 'block' : 'none'}
                                     }>
                                    <DefaultStatistic progress={progress.smokeFree} playground={playground}
                                                      name={"smokefree"}
                                                      measurement={"percentage"}/>
                                    <DefaultStatistic progress={progress.workingOnIt} playground={playground}
                                                      name={"workingonit"} measurement={"percentage"}/>
                                    <DefaultStatistic progress={progress.smoking} playground={playground}
                                                      name={"smoking"}
                                                      measurement={"percentage"}/>
                                </div>
                                <div className="statistics-wrapper specific"
                                     style={{display: generalStatistics ? 'none' : 'block'}}>
                                    <PlaygroundStatistic playground={playground} name={playground.name} stat={"volunteerCount"}/>
                                    <PlaygroundStatistic playground={playground} name={playground.name} stat={"votes"}/>
                                </div>

                                <div style={{display: generalStatistics ? 'none' : 'block'}}>
                                    <Button
                                        className={"btn btn-highlight pr-25 pull-left"}
                                        onClick={() => history.push(getWorkspaceStartLink(playground)) }
                                    >
                                        <span>Bezoek deze speeltuin</span>
                                    </Button>

                                    <Button
                                        style={{display: generalStatistics ? 'none' : 'inline-flex'}}
                                        onClick={
                                            this.props.onBackButton.bind(this, defaultPlayground)
                                        }
                                        className={"btn btn-highlight pr-25 pull-right"}
                                    >
                                        <ArrowBack className={"mr-5"}/>
                                        <span>Ga terug</span>
                                    </Button>
                                </div>

                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(pillsStyle)(
    withTranslation("translations")(connect(mapStateToProps)(PlaygroundStatistics))
);

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
import FormDialog from "components/FormDialog/FormDialog.jsx";
import Button from "@material-ui/core/Button/Button";
import JoinInitiative from "./JoinInitiative.jsx"

import {withNamespaces} from "react-i18next";
import {graphql} from "react-apollo";
import gql from "graphql-tag";


const GET_SMOKEFREE_PROGRESS = gql`
  {
    progress {
      smokeFree {
        count
        percentage
      }
      workingOnIt {
        count
        percentage
      }
      smoking {
        count
        percentage
      }
    }
  }
`;

const withPlaygroundProgress = graphql(GET_SMOKEFREE_PROGRESS, {
    props: ({ownProps, data}) => {
        if (data.loading) return {statsLoading: true};
        if (data.error) return {hasErrors: true};

        console.log(data.progress);
        return {
            progress: data.progress
        };
    }
});

class PlaygroundStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generalStatistics: true
        }
    };

    render() {
        const {statsLoading, progress, t, classes, playground} = this.props;
        const { generalStatistics } = this.state;
        const isDefault = playground.default;
        //eerst true, daarna false op een specifieke playground
        //bij het setten van false moet dus de state geupdate worden.


        if (statsLoading || !progress) {
            return "Loading...";
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
                                        isDefault ?
                                            t("onboarding.playground.progress.intro.default", {
                                                cityArea: playground.name,
                                                playgroundCount: progress.smoking.count
                                            }) :
                                            t("onboarding.playground.progress.intro.specific", {playgroundName: playground.name})
                                    }
                                </p>
                                <div className="statistics-wrapper default"
                                     style={
                                         {display: isDefault ? 'block' : 'none'}
                                     }>
                                    <DefaultStatistic progress={progress.smokeFree} playground={playground}
                                                      name={"smokefree"}
                                                      measurement={"percentage"}/>
                                    <DefaultStatistic progress={progress.workingOnIt} playground={playground}
                                                      name={"workingonit"} measurement={"percentage"}/>
                                    <DefaultStatistic progress={progress.smoking} playground={playground}
                                                      name={"smoking"}
                                                      measurement={"count"}/>
                                </div>
                                <div className="statistics-wrapper specific"
                                     style={{display: isDefault ? 'none' : 'block'}}>
                                    <PlaygroundStatistic playground={playground} name={playground.name} stat={"vol"}/>
                                    <PlaygroundStatistic playground={playground} name={playground.name} stat={"votes"}/>
                                </div>
                                <div style={{display: isDefault ? 'block' : 'none'}}>
                                    <FormDialog />
                                </div>
                                <div style={{display: isDefault ? 'none' : 'block'}}>
                                    <JoinInitiative playground={playground}/>
                                    <Button
                                        style={{display: isDefault ? 'none' : 'inline-flex'}}
                                        onClick={() => this.setState({generalStatistics: true }) }
                                        className={"btn btn-highlight pr-25 pull-right"}
                                    >
                                        <ArrowBack className={"mr-5"} />
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

const SmokeFreePlaygroundProgress = withPlaygroundProgress(PlaygroundStatistics);

export default withStyles(pillsStyle)(
    withNamespaces("translations")(SmokeFreePlaygroundProgress)
);

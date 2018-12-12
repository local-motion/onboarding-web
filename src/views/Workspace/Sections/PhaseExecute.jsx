import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SimpleCard from "components/CustomCard/Card.jsx";
import CollapseCard from "components/CustomCard/CollapseCard.jsx";
import SmokefreeDate from "../forms/SmokefreeDate.jsx";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

class PhaseExecute extends React.Component {

    render() {
        const {classes, playground, profile} = this.props;
        const onSmokeFreeDateChange = date => {
            console.log('Changed smoke-free date...', date);
            playground.smokeFreeDate = date;
        };
        const isManager = playground.managers && !!playground.managers.filter(manager => {
            return manager.id === profile.id
        }).length;

        return (
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                        {   isManager &&
                            playground.smokeFreeDate &&
                            <CollapseCard title={`${playground.name} is rookvrij per ${playground.smokeFreeDate.toLocaleDateString()}`}
                                          image={require("assets/img/backgrounds/date.jpg")}
                                          content={"Is dit niet de juiste datum, verander deze hier"}
                                          MoreInformation={"Meer informatie"}
                                          ExpandContent={<SmokefreeDate startDate={playground.smokeFreeDate} onChange={onSmokeFreeDateChange}/>}
                            />
                        }

                        {   isManager &&
                            !playground.smokeFreeDate &&
                            <CollapseCard title={"Committeer aan een datum"}
                                          image={require("assets/img/backgrounds/date.jpg")}
                                          content={"Selecteer de datum waarop Speeltuin rookvrij moet zijn."}
                                          MoreInformation={"Meer informatie"}
                                          ExpandContent={<SmokefreeDate onChange={onSmokeFreeDateChange}/>}
                            />
                        }

                        <SimpleCard title={"Deel beslissing via Social"}
                                    image={require("assets/img/backgrounds/social.jpg")}
                                    content={"Laat iedereen weten dat er een datum is dat Speeltuin rookvrij word"}
                                    primaryCta={{
                                        action: "#",
                                        text: "Deel datum"
                                    }}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(PhaseExecute);

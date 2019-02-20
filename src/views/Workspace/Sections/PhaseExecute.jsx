import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import SetADateCard from "../Cards/SetADateCard.jsx";
import ShareDecisionCard from "../Cards/ShareDecisionCard.jsx";
import MakeItVisibleCard from "../Cards/MakeItVisibleCard.jsx";
import PartyCard from "../Cards/PartyCard.jsx";

class PhaseExecute extends React.Component {

    render() {
        const {classes} = this.props;
        // const onSmokeFreeDateChange = date => {
        //     console.log('Changed smoke-free date...', date);
        //     playground.smokeFreeDate = date;
        // };
        // const isManager = user && playground.managers && !!playground.managers.filter(manager => {
        //     return manager.id === user.id
        // }).length;

        return (
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                        {/* {  playground.smokeFreeDate &&
                            <CollapseCard title={`${playground.name} is rookvrij per ${playground.smokeFreeDate.toLocaleDateString()}`}
                                          image={require("assets/img/backgrounds/date.jpg")}
                                          content={"Is dit niet de juiste datum, verander deze hier"}
                                          MoreInformation={"Verander datum"}
                                          ExpandContent={<SmokefreeDate startDate={playground.smokeFreeDate} onChange={onSmokeFreeDateChange}/>}
                            />
                        }

                        {   !playground.smokeFreeDate &&
                            <CollapseCard title={"Zet in de agenda"}
                                          image={require("assets/img/backgrounds/date.jpg")}
                                          content={"Selecteer de datum waarop Speeltuin rookvrij wordt."}
                                          MoreInformation={"Stel een datum"}
                                          ExpandContent={<SmokefreeDate onChange={onSmokeFreeDateChange}/>}
                            />
                        } */}

                        <SetADateCard {...this.props} />

                        {/* <SimpleCard title={"Deel beslissing via Social"}
                                    image={require("assets/img/backgrounds/social.jpg")}
                                    content={"Laat iedereen weten dat er een datum is dat Speeltuin rookvrij word"}
                                    primaryCta={{
                                        action: "#",
                                        text: "Deel datum"
                                    }}
                        /> */}


                        <ShareDecisionCard {...this.props} />

                        {/* <CollapseCard title={"Laat het zien"}
                                        image={require("assets/img/backgrounds/date.jpg")}
                                        content={"Selecteer de datum waarop Speeltuin rookvrij wordt."}
                                        MoreInformation={"Stel een datum"}
                                        ExpandContent={<SmokefreeDate onChange={onSmokeFreeDateChange}/>}
                        /> */}

                        <MakeItVisibleCard {...this.props} />

                        

                        {/* <CollapseCard title={"Feestje!"}
                                        image={require("assets/img/backgrounds/party.jpg")}
                                        content={"Open de rookvrije speeltuin met een straatfeest"}
                                        MoreInformation={"Stel een datum"}
                                        ExpandContent={<SmokefreeDate onChange={onSmokeFreeDateChange}/>}
                        /> */}

                        <PartyCard {...this.props} />


                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(PhaseExecute);

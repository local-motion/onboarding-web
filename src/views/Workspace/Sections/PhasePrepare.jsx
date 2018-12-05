import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SimpleCard from "components/CustomCard/Card.jsx";
import CollapseCard from "components/CustomCard/CollapseCard.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

import Card from "components/Card/Card.jsx";

const SET_SMOKEFREE = gql`
    mutation DecideToBecomeSmokeFreeCommand {
        initiativeId
    }
`;

class PhasePrepare extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>
                        <SimpleCard title={"Deel via email"}
                                    image={require("assets/img/backgrounds/email.jpg")}
                                    content={"Ken jij meer mensen die Speeltuin rookvrij willen krijgen? Nodig ze uit via email."}
                                    primaryCta={{
                                        action: "mailto:?subject=Maak%20speeltuin%20rookvrij&body=Ik%20wil%20graag%20speeltuin%20rookvrij%20maken.%0AHelp%20jij%20met%20me%20mee%3F",
                                        text: "Verstuur een email"
                                    }}
                        />

                        <CollapseCard title={"Deel via social media"}
                                      image={require("assets/img/backgrounds/social.jpg")}
                                      content={"Laat je volgers weten dat je Speeltuin rookvrij wilt maken."}
                                      MoreInformation={"Meer informatie"}
                        />

                        <Mutation
                            mutation={SET_SMOKEFREE}
                            update={null}
                        >
                            {(setSmokeFree) => (
                                <SimpleCard
                                    title={"Maak speeltuin rookvrij"}
                                    image={require("assets/img/backgrounds/smokefree.jpg")}
                                    content={"Beslis hier of de speeltuin rookvrij wordt gemaakt."}
                                    onClick={() => setSmokeFree({ variables: { input: true } })}
                                    primaryCta={{
                                        click: (() => {console.log('foo'); setSmokeFree({ variables: { input: true } })}),
                                        text: "Maak rookvrij"
                                    }}
                                />
                            )}
                        </Mutation>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(PhasePrepare);

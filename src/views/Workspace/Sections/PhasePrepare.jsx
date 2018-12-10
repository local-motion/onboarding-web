import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
// core components
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SimpleCard from "components/CustomCard/Card.jsx";
import CollapseCard from "components/CustomCard/CollapseCard.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import SocialMedia from "../forms/SocialMedia.jsx";

const SET_MANAGER = gql`
  mutation ClaimManagerRole($input: ClaimManagerRoleCommand!) {
    claimManagerRole(input: $input) {
      id
    }
  }
`;

const SET_SMOKEFREE = gql`
  mutation DecideToBecomeSmokeFree($input: DecideToBecomeSmokeFreeCommand!) {
    decideToBecomeSmokeFree(input: $input) {
      id
    }
  }
`;

class PhasePrepare extends React.Component {

    render() {
        const {classes} = this.props;
        const playgroundId = window.location.pathname.split("/").pop();
        let queryInput = {
            initiativeId: playgroundId
        };

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
                                      ExpandContent={<SocialMedia playground={this.props.playground}/>}
                        />

                        <Mutation
                            mutation={SET_MANAGER}
                            update={null}
                        >
                            {(setManager, { loading, error }) => (
                                <div>
                                    <SimpleCard
                                        title={"Help run this playground"}
                                        image={require("assets/img/backgrounds/smokefree.jpg")}
                                        content={"Click here to become a manager at this playground."}
                                        primaryCta={{
                                            click: (() => {setManager({ variables: { input: queryInput } })}),
                                            text: "Claim manager role"
                                        }}
                                    />
                                    {loading && <p>Loading...</p>}
                                    {error && <Dialog open={true} className={classes.container}>{error.toString()}</Dialog>}
                                </div>
                            )}
                        </Mutation>

                        <Mutation
                            mutation={SET_SMOKEFREE}
                            update={null}
                        >
                            {(setSmokeFree, { loading, error }) => (
                                <div>
                                    <SimpleCard
                                        title={"Maak speeltuin rookvrij"}
                                        image={require("assets/img/backgrounds/smokefree.jpg")}
                                        content={"Beslis hier of de speeltuin rookvrij wordt gemaakt."}
                                        primaryCta={{
                                            click: (() => {setSmokeFree({ variables: { input: queryInput } })}),
                                            text: "Maak rookvrij"
                                        }}
                                    />
                                    {loading && <p>Loading...</p>}
                                    {error && <Dialog open={true} className={classes.container}>{error.toString()}</Dialog>}
                                </div>
                            )}
                        </Mutation>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(PhasePrepare);

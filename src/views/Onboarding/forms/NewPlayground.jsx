import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { withNamespaces } from "react-i18next";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_INITIATIVE = gql`
    mutation CreateInitiative($input: CreateInitiativeInput!) {
        createInitiative(input: $input) {
            id
        }
    }
`;


class NewPlayground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            lat: this.props.playground.latLng.lat(),
            lng: this.props.playground.latLng.lng(),
            initiativeId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                // generate a uuid
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
                return v.toString(16);
            }),
            type: "smokefree",
            status: "not_started"
        };
    }

    updateName = (eEvent) => {
        this.setState({
            name: eEvent.target.value
        });
    }

    loadWorkspace = (eEvent) => {
        console.log("loadWorkspace", eEvent);
        window.location.href = `/workspace/${this.state.initiativeId}`;
    }

    render() {
        const {t, classes} = this.props;

        return (
            <div className={classes.section + " playground-form-container"}>
                <h2>Voeg een speeltuin toe</h2>
                <p>Wat goed dat je een speeltuin rookvrij wilt maken. Je staat namelijk op het punt om een speeltuin toe te voegen. We willen alleen nog weten van je hoe deze speeltuin heet.</p>

                <form className={classes.container}>
                    <TextField className={classes.textField + " form-control"} label="Hoe heet de speeltuin?" pattern="/^\w{4,}$/" onKeyUp={this.updateName} defaultValue={this.state.name}/>
                </form>

                <Mutation
                    mutation={CREATE_INITIATIVE}
                    update={this.loadWorkspace}
                >
                    {(joinInitiative) => (
                        <Button onClick={() => joinInitiative({ variables: { input: this.state } })}>
                            {t("onboarding.playground.calltoaction.button")}
                        </Button>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default withStyles(pillsStyle)(
    withNamespaces("translations")(NewPlayground)
);

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { withNamespaces } from "react-i18next";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_INITIATIVE = gql`
  mutation CreateInitiative($input: CreateInitiativeInput!) {
    CreateInitiative(input: $input) {
      id
    }
  }
`;



class NewPlayground extends React.Component {
    render() {
        const {t, classes} = this.props;

        const newInitiative = {
            name: "",
            address: "",
            latitude: "",
            longitude: "",
            contactName: "",
            contactEmail: "",
            initiativeId: null,
            type: "smokefree",
            status: "not_started"
        };

        return (
            <div>
                <h2>Add a playground</h2>
                <form className={classes.container}>
                    <TextField className={classes.textField} label="Playground name" pattern="/^\w{6,}$/" defaultValue={newInitiative.name}/>
                    <TextField className={classes.textField} label="Address" pattern="^\w{6,}$" defaultValue={newInitiative.address}/>
                    <TextField className={classes.textField} label="Contact name" pattern="^\w{6,}$" defaultValue={newInitiative.contactName}/>
                    <TextField className={classes.textField} label="Contact email" pattern='/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/' defaultValue={newInitiative.contactEmail}/>

                    <input type="hidden" id={"latitude"} defaultValue={newInitiative.latitude}/>
                    <input type="hidden" id={"longitude"} defaultValue={newInitiative.latitude}/>
                </form>

                <Mutation mutation={CREATE_INITIATIVE}>
                    {(joinInitiative) => (
                        <Button onClick={() => joinInitiative({ variables: { input: newInitiative } })}>
                            {t("onboarding.playground.calltoaction.button")}
                        </Button>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(NewPlayground)
);

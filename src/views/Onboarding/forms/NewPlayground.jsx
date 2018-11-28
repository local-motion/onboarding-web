import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { withNamespaces } from "react-i18next";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
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
            initiativeId: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] && 15 >> c / 4).toString(16)
            ),
            type: "smokefree",
            status: "not_started"
        };
    }

    updateName = (eEvent) => {
        this.setState({
            name: eEvent.target.value
        });
    }

    render() {
        const {t, classes} = this.props;

        return (
            <div>
                <h2>Add a playground</h2>

                <form className={classes.container}>
                    <TextField className={classes.textField} label="Playground name" pattern="/^\w{4,}$/" onKeyUp={this.updateName} defaultValue={this.state.name}/>
                </form>

                <Mutation mutation={CREATE_INITIATIVE}>
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

export default withStyles(componentsStyle)(
    withNamespaces("translations")(NewPlayground)
);

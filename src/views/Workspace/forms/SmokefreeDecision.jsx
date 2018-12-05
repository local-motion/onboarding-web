import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Button from "@material-ui/core/Button";
import "react-datepicker/dist/react-datepicker.css";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
// core components
import { withNamespaces } from "react-i18next";

const SET_SMOKEFREE = gql`
    mutation DecideToBecomeSmokeFreeCommand {
        initiativeId
    }
`;

class SmokefreeDecision extends React.Component {
    render() {
        return (
            <div>
                <h2>Commit to becoming smoke free</h2>

                <Mutation
                    mutation={SET_SMOKEFREE}
                    update={null}
                >
                    {(setSmokeFree) => (
                        <Button onClick={() => setSmokeFree({ variables: { input: true } })}>
                            Set as smoke free
                        </Button>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default withStyles()(
    withNamespaces("translations")(SmokefreeDecision)
);

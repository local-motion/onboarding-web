import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Button from "@material-ui/core/Button/Button";
import PersonAdd from "@material-ui/icons/PersonAdd";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

import {withNamespaces} from "react-i18next";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";


const JOIN_INITIATIVE = gql`
  mutation JoinInitiative($input: JoinInitiativeInput!) {
    joinInitiative(input: $input) {
      id
    }
  }
`;

class JoinInitiative extends React.Component {

    loadWorkspace = (eEvent) => {
        window.location.href = `/workspace/${this.props.playground.id}`;
    }

    render() {
        const {playground} = this.props;
        if (playground.default) return null;

        let initiativeInput = {
            initiativeId: playground.id
        };

        return (
            <Mutation
                mutation={JOIN_INITIATIVE}
                update={this.loadWorkspace}
            >
                {(joinInitiative) => (
                    <Button
                        className={"btn btn-highlight pr-25 pull-left"}
                        onClick={(/*event*/) =>
                            joinInitiative({variables: {input: initiativeInput}})
                        }
                    >
                        <PersonAdd className={"mr-5"}/>
                        <span>Maak deze speeltuin rookvrij</span>
                    </Button>
                )}
            </Mutation>
        );
    }
}

export default withStyles(pillsStyle)(
    withNamespaces("translations")(JoinInitiative)
);

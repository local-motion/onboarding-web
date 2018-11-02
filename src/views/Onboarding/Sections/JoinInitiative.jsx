import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";

import {withNamespaces} from 'react-i18next';
import gql from 'graphql-tag';
import {Mutation} from "react-apollo";

const JOIN_INITIATIVE = gql`
    mutation JoinInitiative($input: JoinInitiativeInput!) {
        joinInitiative(input: $input) {
            id
        }
    }
`;


class JoinInitiative extends React.Component {
    render() {
        const {t, classes, playground} = this.props;
        if (!playground) return null;

        let initiativeInput = {
            "initiativeId": playground.id
        };

        return (
            <Mutation mutation={JOIN_INITIATIVE}>
                {(joinInitiative, {data}) => (
                    <Button onClick={ event => joinInitiative({ variables: { input: initiativeInput } })} color="primary" round>
                        <Favorite className={classes.icons}/> {t('onboarding.playground.calltoaction.button')}
                    </Button>
                )}
            </Mutation>
        );
    }
}

export default withStyles(basicsStyle)(withNamespaces("translations")(JoinInitiative));

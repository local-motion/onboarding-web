import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
// @material-ui/icons
// core components
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import {withNamespaces} from "react-i18next";

/**
 * Handles parsing the 'error' portion of the payload. Local-Motion makes use
 * of error extensions to provide user friendly messages and allowing
 * functional decisions based on errors[x].extensions.code
 *
 * {
 *   "graphQLErrors" : [ {
 *     "message" : "Exception while fetching data (/decideToBecomeSmokeFree) : 2020e808-4cb1-472e-b89e-aa2e227b7103 is not a manager",
 *     "locations" : [ {
 *       "line" : 2,
 *       "column" : 3
 *     } ],
 *     "path" : [ "decideToBecomeSmokeFree" ],
 *     "extensions" : {
 *       "code" : "UNAUTHENTICATED",
 *       "niceMessage" : "This is a nice message!"
 *     }
 *   } ]
 * }
 */
class ErrorDialog extends React.Component {
    /**
     * Finds the GraphQLError and returns the 'niceMessage' of the error's extensions.
     */
    _extractMessageFromApolloError(apolloError) {
        debugger;
        const graphQLErrors = apolloError.graphQLErrors;
        const networkError = apolloError.networkError;

        if (graphQLErrors)  {
            return graphQLErrors.map(({ message, locations, path, extensions }) => {
                return extensions.niceMessage;
            });
        }

        if (networkError) {
            return networkError;
        }

        return apolloError.toString();
    }

    render() {
        const {error, classes} = this.props;
        if (!error) {
            return null;
        }
        return (
            <Dialog open={true} className={classes.container}>{this._extractMessageFromApolloError(error)}</Dialog>
        );
    }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(ErrorDialog)
);

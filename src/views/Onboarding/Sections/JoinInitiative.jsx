import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Button from "@material-ui/core/Button/Button";
import PersonAdd from "@material-ui/icons/PersonAdd";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

import {withNamespaces} from "react-i18next";
import AlertDialog from "../../AlertDialog.jsx";
import { history } from "../../../setup.js";
import { joinInitiative, JOIN_INITIATIVE } from "../../../components/Playground/PlaygroundActions.js";
import { connect } from 'react-redux'
import { createLoadingSelector, createErrorMessageSelector } from '../../../api/Selectors';

const mapStateToProps = state => {
    const loadingSelector = createLoadingSelector([JOIN_INITIATIVE]);
    const errorMessageSelector = createErrorMessageSelector([JOIN_INITIATIVE]);
    return {
        loading: loadingSelector(state),
        error: errorMessageSelector(state),
    }
}

const mapDispatchToProps = dispatch => ({
        joinInitiative:    (initiativeId, onSuccessCallback) =>     dispatch(joinInitiative(initiativeId, onSuccessCallback)),
})

class JoinInitiative extends React.Component {

    onJoinClicked = () => {
        this.props.joinInitiative(this.props.playground.id, () => history.push(`/workspace/${this.props.playground.id}`) )
    }

    render() {
        const {playground, loading, error} = this.props;
        if (playground.default) return null;

        return (
                <div>
                    <Button
                        className={"btn btn-highlight pr-25 pull-left"}
                        disabled={loading}
                        onClick={() => this.onJoinClicked()}
                    >
                        <PersonAdd className={"mr-5"}/>
                        <span>Maak deze speeltuin rookvrij</span>
                    </Button>
                    {error && <AlertDialog apolloError={error}/>}
                </div>
        );
    }
}

export default withStyles(pillsStyle)(
    withNamespaces("translations")(connect(mapStateToProps, mapDispatchToProps)(JoinInitiative))
);

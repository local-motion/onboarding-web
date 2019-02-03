import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Button from "@material-ui/core/Button/Button";
import PersonAdd from "@material-ui/icons/PersonAdd";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

import {withNamespaces} from "react-i18next";
import { history } from "../../../setup.js";
import { joinInitiative, JOIN_INITIATIVE } from "../../../components/Playground/PlaygroundActions.js";
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../../api/Selectors';
import { getUser } from "../../../components/UserProfile/UserProfileReducer.js";

const mapStateToProps = state => {
    const loadingSelector = createLoadingSelector([JOIN_INITIATIVE]);
    return {
        loading: loadingSelector(state),
        user: getUser(state)
    }
}

const mapDispatchToProps = dispatch => ({
        joinInitiative:    (initiativeId, onSuccessCallback) =>     dispatch(joinInitiative(initiativeId, onSuccessCallback)),
})

class JoinInitiative extends React.Component {

    onJoinClicked = () => {
        this.props.joinInitiative(this.props.playground.id, () => history.push(`/workspace/${this.props.playground.id}`) )
    }

    onVisitClicked = () => {
        history.push(`/workspace/${this.props.playground.id}`)
    }

    render() {
        const {playground, loading, user} = this.props;
        if (playground.default) return null;

        return (
                <div>
                    { user ?
                        <Button
                            className={"btn btn-highlight pr-25 pull-left"}
                            disabled={loading}
                            onClick={() => this.onJoinClicked()}
                        >
                            <PersonAdd className={"mr-5"}/>
                            <span>Maak deze speeltuin rookvrij</span>
                        </Button>
                    :
                        <Button
                            className={"btn btn-highlight pr-25 pull-left"}
                            disabled={loading}
                            onClick={() => this.onVisitClicked()}
                        >
                            <span>Bezoek deze speeltuin</span>
                        </Button>
                    }
    
                </div>
        );
    }
}

export default withStyles(pillsStyle)(
    withNamespaces("translations")(connect(mapStateToProps, mapDispatchToProps)(JoinInitiative))
);

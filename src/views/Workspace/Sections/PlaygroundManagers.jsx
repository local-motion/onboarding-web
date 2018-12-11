import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import { withNamespaces } from "react-i18next";

class PlaygroundManagers extends React.Component {
    render() {
        const { playground, profile } = this.props;
        if(!playground || !profile) return "Loading...";
        console.info(`Displaying ${playground.managers ? playground.managers.length : 0} managers for playground`, playground);
        return (
            <div>
                <div>
                    {playground.volunteerCount} vrijwilligers helpen met rookvrij maken.
                </div>
                <div>
                    Beheerders van deze speeltuin zijn:
                </div>
                <ul>
                    {playground.managers.map(function(manager, index){
                        return <li key={ index }>{manager.username} <b>{manager.id === profile.id ? '(You)' : ''}</b></li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default withStyles(pillsStyle)(
    withNamespaces("translations")(PlaygroundManagers)
);

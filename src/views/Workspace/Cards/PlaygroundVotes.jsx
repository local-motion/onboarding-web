import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import {withTranslation} from "react-i18next";


class PlaygroundVotes extends React.Component {
    render() {
        const {playground} = this.props;
        if (!playground) return "Loading...";
        return (
            <div>
                <h4>{playground.votes} getekende petities</h4>
                <hr />
                <p>
                    <b>Elke stem telt</b><br />
                    Teken vandaag nog de petitie om deze speeltuin rookvrij te maken. Ruim {playground.votes} anderen gingen u voor.
                </p>
            </div>
        );
    }
}

export default withStyles(pillsStyle)(
    withTranslation("translations")(PlaygroundVotes)
);

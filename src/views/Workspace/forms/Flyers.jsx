import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { Button } from "@material-ui/core";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";


class Flyers extends React.Component {

    render() {
        const {playground, user} = this.props

        return (
            <div>
                <Button disabled={!user}  variant="contained" size="small" color="primary" 
                    href={
                        "mailto:service@longfonds.nl?" + 
                        "subject=Flyers%20bestellen&" + 
                        "body=Hallo,%0A%0A" + 
                        "Ik%20wil%20graag%20flyers%20bestellen%20voor%20speeltuin%20" + playground.name + ".%0A" +
                        "Mijn%20adres%20is%20...%20VUL%20HIER%20JE%20ADRESGEGEVENS%20IN%20..."
                    }
                    >
                     Bestel flyers
                </Button>

                <br />
                <ConnectedCheckbox playground={playground} checklistItem="order_flyers" label="De flyers zijn besteld" />

                <br /><br />
                Ga nu samen de flyers uitdelen in de buurt.

                <br />
                <ConnectedCheckbox playground={playground} checklistItem="distribute_flyers" label="De flyers zijn uitgedeeld" />
            </div>
        );
    }
}

export default withStyles(componentsStyle)(Flyers)

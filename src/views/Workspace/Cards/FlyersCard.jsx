import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { Button, Typography } from "@material-ui/core";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";


class GetSupportCard extends React.Component {
    render() {
        const {playground, user} = this.props;

        if (!playground) return "Loading..."
        
        return (
            <WorkspaceCard title={"Flyers verspreiden"}
                done={playground.jointChecklistItems.includes('distribute_flyers')}
                image={require("assets/img/backgrounds/flyer.jpg")}
                content={"Deel flyers uit in de buurt om de mensen mee te nemen in dit initiatief."}
                expandContent={
                    <div>
                        <Button disabled={!isUserVolunteerOfPlayground(user, playground)}  variant="contained" size="small" color="primary" 
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
                        <Typography component="p">Ga nu samen de flyers uitdelen in de buurt.</Typography>

                        <ConnectedCheckbox playground={playground} checklistItem="distribute_flyers" label="De flyers zijn uitgedeeld" />
                    </div>
                }
            />
        )
    }
}

export default GetSupportCard


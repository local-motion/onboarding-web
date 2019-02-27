import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { Button, Typography } from "@material-ui/core";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";


class MakeItVisibleCard extends React.Component {
    render() {
        const {playground, user} = this.props;

        if (!playground) return "Loading..."
        
        return (
            <WorkspaceCard title={"Laat het zien"}
                done={  playground.jointChecklistItems.includes('adjust_regulations')   && 
                        playground.jointChecklistItems.includes('publish_regulations')  && 
                        playground.jointChecklistItems.includes('order_sign')           && 
                        playground.jointChecklistItems.includes('place_sign')               }
                image={require("assets/img/backgrounds/signonfence.jpg")}
                content={"Maak het zichtbaar dat je rookvrij bent en geef aan wat dit precies inhoudt."}
                expandContent={
                    <div>
                        <ConnectedCheckbox playground={playground} checklistItem="adjust_regulations" label="Pas je reglementen aan" />
                        <br />

                        <ConnectedCheckbox playground={playground} checklistItem="publish_regulations" label="Publiceer nieuwe regels op je website" />
                        <br />
                        <Button 
                            variant="contained" size="small" color="primary" 
                            href={"/documents/rookvrijstempel.jpg"}
                        >
                            Rookvrij stempel
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button 
                            variant="contained" size="small" color="primary" 
                            href={"/documents/websitehtml.docx"}
                        >
                            Voorbeeld html
                        </Button>

                        <br /><br />
                        <Typography component="p">Bestel het bord van de rookvrije generatie om bij de ingang van je speeltuin te hangen</Typography>
                        <br />
                        <Button disabled={!isUserVolunteerOfPlayground(user, playground)}  variant="contained" size="small" color="primary" 
                            href={
                                "mailto:service@longfonds.nl?" + 
                                "subject=Bord%20bestellen&" + 
                                "body=Hallo,%0A%0A" + 
                                "Ik%20wil%20graag%20een%20bord%20bestellen%20voor%20speeltuin%20" + playground.name + ".%0A" +
                                "Mijn%20adres%20is%20...%20VUL%20HIER%20JE%20ADRESGEGEVENS%20IN%20..."
                            }
                            >
                            Bestel
                        </Button>

                        <br />
                        <ConnectedCheckbox playground={playground} checklistItem="order_sign" label="Het bord is besteld" />

                        <br />
                        <ConnectedCheckbox playground={playground} checklistItem="place_sign" label="Hang het bord bij de ingang van de speeltuin" />
                    </div>
                }
            />
        )
    }
}

export default MakeItVisibleCard


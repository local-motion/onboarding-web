import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { Button, Typography } from "@material-ui/core";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";
import SocialMedia from "../forms/SocialMedia";


class ShareDecisionCard extends React.Component {
    render() {
        const {playground} = this.props;

        if (!playground) return "Loading..."
        
        return (
            <WorkspaceCard title={"Deel het besluit"}
                done={  playground.jointChecklistItems.includes('press_announcement') && 
                        playground.jointChecklistItems.includes('newsletter_announcement') && 
                        playground.jointChecklistItems.includes('website_announcement')    }
                image={require("assets/img/backgrounds/shout.jpg")}
                content={"Laat iedereen weten dat de speeltuin rookvrij gaat worden zodat mensen zich kunnen voorbereiden."}
                expandContent={
                    <div>
                        <ConnectedCheckbox playground={playground} checklistItem="press_announcement" label="Publiceer een persbericht" />
                        <Button 
                            variant="contained" size="small" color="primary" 
                            href={"/documents/persbericht.docx"}
                        >
                            Voorbeeld
                        </Button>

                        <ConnectedCheckbox playground={playground} checklistItem="newsletter_announcement" label="Artikel in je nieuwbrief" />
                        <Button 
                            variant="contained" size="small" color="primary" 
                            href={"/documents/nieuwsbrief.docx"}
                        >
                            Voorbeeld
                        </Button>

                        <ConnectedCheckbox playground={playground} checklistItem="website_announcement" label="Plaats het op je website" />
                        <Button 
                            variant="contained" size="small" color="primary" 
                            href={"/documents/website.docx"}
                        >
                            Voorbeeld
                        </Button>

                        <br />
                        <Typography component="p">Laat je horen op social media</Typography>
                        <SocialMedia playground={playground}/>
                    </div>
                }
            />
        )
    }
}

export default ShareDecisionCard


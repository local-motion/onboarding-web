import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { Button, Typography } from "@material-ui/core";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";
import SocialMedia from "../forms/SocialMedia";


class ShareSmokefreeCard extends React.Component {
    render() {
        const {playground} = this.props;

        if (!playground) return "Loading..."
        
        return (
            <WorkspaceCard title={"We zijn rookvrij!"}
                done={  playground.jointChecklistItems.includes('press_announcement_smokefree') }
                image={require("assets/img/backgrounds/celebrate.jpg")}
                content={"We zijn een stapje verder richting een rookvrije generatie. Deel dit fantastische resultaat met iedereen."}
                expandContent={
                    <div>
                        <ConnectedCheckbox playground={playground} checklistItem="press_announcement_smokefree" label="Publiceer een persbericht" />
                        <Button 
                            variant="contained" size="small" color="primary" 
                            href={"/documents/persberichtrookvrij.docx"}
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

export default ShareSmokefreeCard


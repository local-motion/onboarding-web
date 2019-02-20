import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import SocialMedia from "../forms/SocialMedia";
import { Button, Typography } from "@material-ui/core";


class GetSupportCard extends React.Component {
    render() {
        const {playground, user} = this.props
        
        if (!playground) return "Loading..."

        const inviteButtonHref = "mailto:?subject=Maak%20speeltuin%20rookvrij&body=Ik%20wil%20graag%20speeltuin%20rookvrij%20maken.%0AHelp%20jij%20met%20me%20mee%3F"
        const inviteButtonLabel = "Verstuur een email"
        const targetNrOfVolunteers = 2
        return (
            <WorkspaceCard title={"Vorm een team"}
                done={playground.volunteerCount >= targetNrOfVolunteers}
                image={require("assets/img/backgrounds/team.jpg")}
                content={"Samen sta je sterk. Nodig anderen uit om mee te doen. Probeer om minimaal " + targetNrOfVolunteers + " mensen te verzamelen."}
                primaryCta={{
                    action: inviteButtonHref,
                    text: inviteButtonLabel
                }}
                expandContent={
                    <div>
                        <Typography component="p">Stuur je kennissen een mailtje</Typography>
                        <Button disabled={!user} size="small" color="primary" href={inviteButtonHref}>{inviteButtonLabel}</Button>
                        <br />
                        <br />
                        <Typography component="p">Doe een oproep op social media</Typography>
                        <SocialMedia playground={playground}/>
                    </div>
                }
            />
        )
    }
}

export default GetSupportCard


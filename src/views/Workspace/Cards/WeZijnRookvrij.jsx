import React from "react";
import { Button, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";
import SocialMedia from "../forms/SocialMedia";

const styles = ({
    contentItem: {
        marginBottom: '20px',
    },
});


class WeZijnRookvrij extends React.Component {
    render() {
        const { playground, classes } = this.props;

        if (!playground) return "Loading...";

        return (
          <WorkspaceCard
            title={"We zijn rookvrij!"}
            done={playground.jointChecklistItems.includes("press_announcement_smokefree")}
            image={require("assets/img/backgrounds/celebrate.jpg")}
            content={"We zijn een stap verder richting een rookvrije generatie! Deel dit fantastische resultaat met iedereen."}
            expandContent={
                <div>
                    <div>
                        <ConnectedCheckbox
                          playground={playground}
                          checklistItem="press_announcement_smokefree"
                          label="Publiceer een persbericht"
                        />
                    </div>

                    <div className={classes.contentItem}>
                        <Typography component="p">Laat het weten via social media</Typography>
                        <SocialMedia playground={playground}/>
                    </div>

                    <Typography component="p">Het is belangrijk om afspraken te maken hoe de medewerkers of vrijwilligers omgaan met mensen die toch roken in de speeltuin. Houd er rekening mee dat het naleven van de rookvrije afspraak de eerste weken extra tijd en aandacht vraagt. Het vriendelijk aanspreken van mensen die roken op het terrein (en bij de entree!) is belangrijk. Ga er in eerste instantie vanuit dat iemand niet op de hoogte is van de afspraak. Vraag of hij/zij bekend is met de nieuwe afspraak op de speelplek. Vertel over de rookvrije afspraak en laat degene weten waar hij/zij wel of niet kan roken. Leg ook uit dat de speelplek de afspraak heeft om kinderen het goede voorbeeld te geven.</Typography>
                </div>
            }
          />
        );
    }
}

export default withStyles(styles)(WeZijnRookvrij);


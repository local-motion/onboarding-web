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
    contentItemSmallMargin: {
        marginBottom: '5px',
    },
    button: {
        '&:hover': {
            color: '#FFF',
        },
    },
});


class CommuniceerOverDeRookvrijeAfspraak extends React.Component {
    render() {
        const { playground, classes } = this.props;

        if (!playground) return "Loading...";

        return (
          <WorkspaceCard
            title={"Communiceer over de rookvrije afspraak"}
            done={
                playground.jointChecklistItems.includes("press_announcement") &&
                playground.jointChecklistItems.includes("newsletter_announcement") &&
                playground.jointChecklistItems.includes("website_announcement")
            }
            image={require("assets/img/backgrounds/shout.jpg")}
            customStyle={{ backgroundPositionY: "-90px" }}
            content={"Informeer iedereen op tijd over de rookvrije afspraak en wanneer deze ingaat. Laat mensen weten wat er van hen verwacht wordt. Benoem hierin ook duidelijk het rookvrij houden van de entree. Gebruik alle bestaande communicatiekanalen om de rookvrije afspraak bekend te maken (zoals de website, een nieuwsbrief en sociale media)."}
            expandContent={
                <div>
                    <div>
                        <ConnectedCheckbox
                          playground={playground}
                          checklistItem="newsletter_announcement"
                          label="Artikel in je nieuwbrief"
                        />
                    </div>

                    <div>
                        <ConnectedCheckbox
                          playground={playground}
                          checklistItem="website_announcement"
                          label="Plaats het op je website"
                        />
                    </div>

                    <div className={classes.contentItem}>
                        <Typography component="p">Laat je horen op social media</Typography>
                        <SocialMedia playground={playground} />
                    </div>

                    <Typography component="p" className={classes.contentItemSmallMargin}>Informeer ook externe partijen over de rookvrije afspraak, zoals de gemeente, leveranciers en sponsoren.Je kunt ook een persbericht sturen naar de lokale media.</Typography>

                    <div className={classes.contentItemSmallMargin}>
                        <ConnectedCheckbox
                          playground={playground}
                          checklistItem="press_announcement"
                          label="Publiceer een persbericht"
                        />
                    </div>

                    <Typography component="p" className={classes.contentItemSmallMargin}>Handig: bekijk de voorbeeldteksten en hang de posters op</Typography>

                    <Button
                      className={`${classes.contentItem} ${classes.button}`}
                      variant="contained" size="small" color="primary"
                      href={"/documents/website.docx"}
                    >
                        Voorbeeld
                    </Button>

                    <Typography component="p" className={classes.contentItemSmallMargin}>Handig: gebruik het voorbeeld persbericht</Typography>

                    <Button
                      className={classes.button}
                      variant="contained" size="small" color="primary"
                      href={"/documents/persberichtaankondiging.docx"}
                    >
                        Voorbeeld
                    </Button>
                </div>
            }
          />
        );
    }
}

export default withStyles(styles)(CommuniceerOverDeRookvrijeAfspraak);


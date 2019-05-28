import React from "react";
import { connect } from 'react-redux'
import { Button, Typography, withStyles } from "@material-ui/core";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import ContentDialog from "../../../components/Dialogs/ContentDialog";
import { claimManagerRole, slugifyPlaygroundName } from "../../../components/Playground/PlaygroundActions";
import { isUserManagerOfPlayground, isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";

const mapDispatchToProps = dispatch => ({
    claimManagerRole:    (initiativeId) =>     dispatch(claimManagerRole(initiativeId)),
});

const styles = theme => ({
   contentItem: {
       marginBottom: '20px',
   },
});

// step: "Contact Leggen Met Bestuur"
class ContactManagementCard extends React.Component {

    state = {
        tipsDialogOpen: false,
    };

    componentDidMount() {
        this.setCta();
    }

    componentDidUpdate(prevProps) {
        const { user, playground } = this.props;

        if (
          (!prevProps.user && user)
          || prevProps.playground.managers.length !== playground.managers.length
        ) {
            this.setCta();
        }
    }

    componentWillUnmount() {
        this.props.unsetCta();
    }

    setCta() {
        const { setCta, playground, user } = this.props;
        const inviteButtonHref = "mailto:?" +
          "subject=" + playground.name /* TODO escapen */ + "%20rookvrij%20maken&" +
          "body=Hallo,%0A%0A" +
          "Wij%20willen%20graag%20" + playground.name + "%20rookvrij%20maken.%20Hiervoor%20hebben%20we%20jouw%20hulp%20als%20beheerder%20hard%20nodig.%0A%0A" +
          "Sluit%20je%20bij%20ons%20aan%20op%20rookvrij.nl:%20" +
          "rookvrijspelen.nl/actie/" + slugifyPlaygroundName(playground) + "%0A";

        if (!isUserManagerOfPlayground(user, playground)) {
            setCta({
                ctaAction: () => window.open(inviteButtonHref),
                ctaText: 'Stuur uitnodiging',
                ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
            });
        } else {
            setCta({
                ctaAction: () => null,
                ctaText: 'Beheerder goedgekeurd',
                ctaDisabled: true,
                ctaDone: true,
            });
        }
    }

    openTipsDialog()  {  this.setState({ tipsDialogOpen: true  })   }
    closeTipsDialog() {  this.setState({ tipsDialogOpen: false })   }

    render() {
        const {playground, user, classes} = this.props;

        if (!playground) return "Loading...";

        const tipsContent = (
            <div>
                <Typography gutterBottom>
                    Google de speeltuin en kijk of ze een website of een facebookpagina hebben. Hierop kun je meestal een e-mailadres vinden.
                    Natuurlijk kun je de beheerder ook rechtstreeks op facebook benaderen.
                </Typography>
                <Typography gutterBottom>
                    Zoek de speeltuin op in het telefoonboek en geef ze een belletje.
                </Typography>
                <Typography gutterBottom>
                    Neem contact op met de gemeente. Zij weten meestal wel door wie een speeltuin beheerd wordt.
                </Typography>
            </div>
        );

        const disabled = (!user || !isUserVolunteerOfPlayground(user, playground))
          && !isUserManagerOfPlayground(user, playground);

        return (
            <WorkspaceCard title={"Contact leggen met bestuur"}
                done={playground.managers.length > 0}
                image={require("assets/img/backgrounds/gardeningtools.jpg")}
                content={"Zoek vervolgens contact met het bestuur en leg uit waarom jullie de speelplek rookvrij willen maken. De speeltuin kan alleen rookvrij gemaakt worden samen met een beheerder. Nodig de beheerder uit om samen aan de slag te gaan."}
                expandContent={
                    <div>
                        <Typography component="p" className={classes.contentItem}>Tip: benader het onderwerp altijd positief en spreek over ‘rookvrij’ en niet over een rookverbod. Het bestuur moet achter het plan staan om de speelplek rookvrij te maken, dus zorg ervoor dat het onderwerp op de agenda komt.</Typography>

                        <Typography component="p" className={classes.contentItem}>Weet je niet wie de beheerder is? Zó kom je erachter.</Typography>
                        <Button className={classes.contentItem} variant="contained" size="small" color="primary" onClick={() => this.openTipsDialog()}>tips</Button>
                        <ContentDialog
                            open={this.state.tipsDialogOpen}
                            onClose={() => this.closeTipsDialog()}
                            title="Hoe vind ik de beheerder?"
                            content={tipsContent}
                        />

                        <Typography component="p" className={classes.contentItem}>Let op: wanneer het om een gemeentelijke, onbeheerde, speeltuin gaat, is het belangrijk om ook contact te leggen met de gemeente. Een gemeente kan een speelplek op vrijwillige basis rookvrij maken, door een rookvrij informatiebord te (laten) plaatsen. Veel speelplekken krijgen subsidie van de gemeente.</Typography>

                        <div>
                            <Button
                                variant="contained" size="small" color="primary"
                                disabled={disabled}
                                onClick={() => this.props.claimManagerRole(playground.id)}
                            >
                                Ik ben de beheerder van deze speeltuin
                            </Button>
                        </div>
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(ContactManagementCard));


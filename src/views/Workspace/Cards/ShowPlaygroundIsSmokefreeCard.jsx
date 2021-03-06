import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { setCheckbox } from "../../../components/Playground/PlaygroundActions";
import { checkBox } from "../../../misc/WorkspaceHelpers";

const styles = ({
    contentItem: {
        marginBottom: '20px',
    },
    contentItemSmallMargin: {
        marginBottom: '10px',
    },
});

const mapDispatchToProps = dispatch => ({
    setCheckbox: (initiativeId, checklistItem, isChecked, user) =>
      dispatch(setCheckbox(initiativeId, checklistItem, isChecked, user)),
});


// step: "Laat Zien Dat De Speelplek Rookvrij Is"
class ShowPlaygroundIsSmokefreeCard extends React.Component {
    componentDidMount() {
        this.setCta();
    }

    componentDidUpdate(prevProps) {
        const { user, playground } = this.props;

        if (
          (!prevProps.user && user)
          || (prevProps.playground.jointChecklistItems.length !== playground.jointChecklistItems.length)
        ) {
            this.setCta();
        }
    }

    componentWillUnmount() {
        this.props.unsetCta();
    }

    setCta() {
        const { setCta, playground, user } = this.props;
        const inviteButtonHref = "mailto:service@longfonds.nl?" +
          "subject=Bord%20bestellen&" +
          "body=Hallo,%0A%0A" +
          "Ik%20wil%20graag%20een%20bord%20bestellen%20voor%20speeltuin%20" + playground.name + ".%0A" +
          "Mijn%20adres%20is%20...%20VUL%20HIER%20JE%20ADRESGEGEVENS%20IN%20...";

        switch(true) {
            case !playground.jointChecklistItems.includes("order_sign"): {
                setCta({
                    ctaAction: () => {
                        window.open(inviteButtonHref);
                        this.checkBox("order_sign");
                    },
                    ctaText: 'Bestel bord',
                    ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case !playground.jointChecklistItems.includes("place_sign"): {
                setCta({
                    ctaAction: () => {
                        this.checkBox("place_sign");
                    },
                    ctaText: 'Hang het bord bij de ingang van de tuin',
                    ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case !playground.jointChecklistItems.includes("adjust_regulations"): {
                setCta({
                    ctaAction: () => {
                        this.checkBox("adjust_regulations");
                    },
                    ctaText: 'Pas je reglementen aan',
                    ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case !playground.jointChecklistItems.includes("publish_regulations"): {
                setCta({
                    ctaAction: () => {
                        this.checkBox("publish_regulations");
                    },
                    ctaText: 'Publiceer nieuwe regels op je website',
                    ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case playground.jointChecklistItems.includes("order_sign")
            && playground.jointChecklistItems.includes("place_sign")
            && playground.jointChecklistItems.includes("adjust_regulations")
            && playground.jointChecklistItems.includes("publish_regulations"): {
                setCta({
                    ctaAction: () => null,
                    ctaText: 'Nieuwe regels zijn gepubliceerd',
                    ctaDisabled: true,
                    ctaDone: true,
                });

                return;
            }

            default: {}
        }
    }

    checkBox(name) {
        const { setCheckbox, playground, user } = this.props;

        checkBox({ setCheckbox, playground, user, name });
    }

    render() {
        const { playground, classes } = this.props;

        if (!playground) return "Loading...";

        return (
          <WorkspaceCard
            title={"Laat Zien Dat De Speelplek Rookvrij Is"}
            done={
                playground.jointChecklistItems.includes("order_sign")
                && playground.jointChecklistItems.includes("place_sign")
                && playground.jointChecklistItems.includes("adjust_regulations")
                && playground.jointChecklistItems.includes("publish_regulations")
            }
            image={require("assets/img/backgrounds/signonfence.jpg")}
            content={"Een mooi moment! Plaats de rookvrij-borden. Zo is voor iedereen zichtbaar dat de speeltuin rookvrij is. Bestel het bord van de Rookvrije Generatie om bij de ingang van de speeltuin te hangen."}
            expandContent={
                <div>
                    <div>
                        <ConnectedCheckbox
                          playground={playground}
                          checklistItem="order_sign"
                          label="Het bord is besteld"
                        />
                    </div>

                    <div>
                        <ConnectedCheckbox
                          playground={playground}
                          checklistItem="place_sign"
                          label="Hang het bord bij de ingang van de speeltuin"
                        />
                    </div>

                    <Typography component="p" className={classes.contentItem}>Neem de rookvrije afspraak op in het reglement van de speeltuin. Ga na welke aanpassingen nog nodig zijn voor het rookvrij maken van de speelplek. Haal asbakken weg en ruim alle peuken op. Vervang indien mogelijk speelmaterialen die zijn aangetast door sigaretten, zoals rubberen speeltegels.</Typography>

                    <Typography component="p">Voorbeeld rookvrije afspraak: ‘Onze speel- plek is rookvrij. Dat betekent dat niemand rookt op het speelterrein. We doen dit om- dat we het goede voorbeeld aan kinderen willen geven. Behalve gezond, is rookvrij spelen ook veilig spelen. Uit onderzoek blijkt dat als kinderen anderen zien roken zij later zelf sneller beginnen met roken. Wij vinden een rookvrije en gezonde om- geving voor iedereen belangrijk.’</Typography>

                    <div>
                        <ConnectedCheckbox
                          playground={playground}
                          checklistItem="adjust_regulations"
                          label="Pas je reglementen aan"
                        />
                    </div>

                    <div>
                        <ConnectedCheckbox
                          playground={playground}
                          checklistItem="publish_regulations"
                          label="Publiceer nieuwe regels op je website"
                        />
                    </div>

                    <Typography component="p">Mohamed Taheri, Landelijk Platform Rookvrije Speelplaatsen: ‘Bij gesprekken met ouders en de gemeente ben ik van het begin af aan stellig geweest: het ging er niet om of we rookvrij konden spelen, maar wanneer. De kans kwam met de gemeenteraadsverkiezingen.’</Typography>
                </div>
            }
          />
        );
    }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(ShowPlaygroundIsSmokefreeCard));

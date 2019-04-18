import React from "react";
import { connect } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";
import SocialMedia from "../forms/SocialMedia";
import { setCheckbox } from "../../../components/Playground/PlaygroundActions";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { checkBox } from "../../../misc/WorkspaceHelpers";

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

const mapDispatchToProps = dispatch => ({
    setCheckbox: (initiativeId, checklistItem, isChecked, user) =>
      dispatch(setCheckbox(initiativeId, checklistItem, isChecked, user)),
});

// Step: 'Communiceer Over De Rookvrije Afspraak'
class CommunicateAboutSmokefreeAgreementCard extends React.Component {
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

        switch(true) {
            case !playground.jointChecklistItems.includes("newsletter_announcement"): {
                setCta({
                    ctaAction: () => {
                        this.checkBox("newsletter_announcement");
                    },
                    ctaText: 'Artikel in nieuwsbrief',
                    ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case !playground.jointChecklistItems.includes("website_announcement"): {
                setCta({
                    ctaAction: () => {
                        this.checkBox("website_announcement");
                    },
                    ctaText: 'Plaats het op je website',
                    ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case !playground.jointChecklistItems.includes("press_announcement"): {
                setCta({
                    ctaAction: () => {
                        this.checkBox("press_announcement");
                    },
                    ctaText: 'Publiceer een persbericht',
                    ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case playground.jointChecklistItems.includes("newsletter_announcement")
            && playground.jointChecklistItems.includes("website_announcement")
            && playground.jointChecklistItems.includes("press_announcement"): {
                setCta({
                    ctaAction: () => null,
                    ctaText: 'Persbericht is gepubliceerd',
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

export default withStyles(styles)(connect(null, mapDispatchToProps)(CommunicateAboutSmokefreeAgreementCard));


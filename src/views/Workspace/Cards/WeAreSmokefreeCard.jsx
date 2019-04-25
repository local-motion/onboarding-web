import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";
import SocialMedia from "../forms/SocialMedia";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { checkBox } from "../../../misc/WorkspaceHelpers";
import { setCheckbox } from "../../../components/Playground/PlaygroundActions";

const styles = ({
    contentItem: {
        marginBottom: '20px',
    },
});

const mapDispatchToProps = dispatch => ({
    setCheckbox: (initiativeId, checklistItem, isChecked, user) =>
      dispatch(setCheckbox(initiativeId, checklistItem, isChecked, user)),
});


// step: "We Zijn Rookvrij"
class WeAreSmokefreeCard extends React.Component {
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

        setCta(
          playground.jointChecklistItems.includes("press_announcement_smokefree")
            ? {
                ctaAction: () => null,
                ctaText: 'Persbericht is gepubliceerd',
                ctaDisabled: true,
                ctaDone: true,
            } : {
                ctaAction: () => {
                    this.checkBox("press_announcement_smokefree");
                },
                ctaText: 'Publiceer een persbericht',
                ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
            }
        );
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

export default withStyles(styles)(connect(null, mapDispatchToProps)(WeAreSmokefreeCard));


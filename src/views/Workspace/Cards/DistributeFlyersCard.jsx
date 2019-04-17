import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { setCheckbox } from "../../../components/Playground/PlaygroundActions";

const mapDispatchToProps = dispatch => ({
    setCheckbox: (initiativeId, checklistItem, isChecked, user) =>
      dispatch(setCheckbox(initiativeId, checklistItem, isChecked, user)),
});


// step:  "Flyers Verspreiden"
class DistributeFlyersCard extends React.Component {
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
          "subject=Flyers%20bestellen&" +
          "body=Hallo,%0A%0A" +
          "Ik%20wil%20graag%20flyers%20bestellen%20voor%20speeltuin%20" + playground.name + ".%0A" +
          "Mijn%20adres%20is%20...%20VUL%20HIER%20JE%20ADRESGEGEVENS%20IN%20...";

        switch(true) {
            case !playground.jointChecklistItems.includes("order_flyers"): {
                setCta({
                    ctaAction: () => {
                        window.open(inviteButtonHref);
                        this.checkBox("order_flyers");
                    },
                    ctaText: 'Bestel flyers',
                    ctaDisabled: () => !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case (
              !playground.jointChecklistItems.includes("distribute_flyers")
              && playground.jointChecklistItems.includes("order_flyers")
            ): {
                setCta({
                    ctaAction: () => {
                        this.checkBox("distribute_flyers");
                    },
                    ctaText: 'Flyers uitdelen',
                    ctaDisabled: () => !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case playground.jointChecklistItems.includes("distribute_flyers")
              && playground.jointChecklistItems.includes("order_flyers"): {
                setCta({
                    ctaAction: () => null,
                    ctaText: 'Flyers zijn uitgedeeld',
                    ctaDisabled: () => true,
                    ctaDone: true,
                });

                return;
            }

            default: {}
        }
    }

    checkBox(name) {
        const { setCheckbox, playground, user } = this.props;
        const currentState = playground.jointChecklistItems.includes(name);
        setCheckbox(playground.id, name, !currentState, user);
    }

    render() {
        const {playground} = this.props;

        if (!playground) return "Loading...";
        
        return (
            <WorkspaceCard title={"Flyers verspreiden"}
                done={playground.jointChecklistItems.includes('distribute_flyers')}
                image={require("assets/img/backgrounds/flyer.jpg")}
                content={"Deel flyers uit in de buurt om de mensen mee te nemen in dit initiatief."}
                expandContent={
                    <div>
                        <ConnectedCheckbox playground={playground} checklistItem="order_flyers" label="De flyers zijn besteld" />

                        <Typography component="p">Ga nu samen de flyers uitdelen in de buurt.</Typography>

                        <ConnectedCheckbox playground={playground} checklistItem="distribute_flyers" label="De flyers zijn uitgedeeld" />
                    </div>
                }
            />
        )
    }
}

export default connect(null, mapDispatchToProps)(DistributeFlyersCard);


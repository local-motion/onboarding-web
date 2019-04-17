import React from "react";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography/Typography";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { getWorkspaceStartLink } from "../../../misc/WorkspaceHelpers";

// step: "Meningen Inventariseren"
class CollectOpinionsCard extends React.Component {
    componentDidMount() {
        this.setCta();
    }

    componentDidUpdate(prevProps) {
        const { user } = this.props;

        if (!prevProps.user && user) {
            this.setCta();
        }
    }

    componentWillUnmount() {
        this.props.unsetCta();
    }

    setCta() {
        const { setCta, playground, user, history } = this.props;

        setCta({
            ctaAction: () => history.push(`${getWorkspaceStartLink(playground)}/team`),
            ctaText: 'Chat with teammembers',
            ctaDisabled: () => !isUserVolunteerOfPlayground(user, playground),
        });
    }

    render() {
        const {playground} = this.props;

        if (!playground) return "Loading...";

        return (
          <WorkspaceCard
            title={"Meningen inventariseren"}
            done={null}
            image={require("assets/img/backgrounds/shout.jpg")}
            content={""}
            expandContent={
                <Typography component="p">Bepaal bij een positief besluit van het bestuur wanneer en hoe je dit wilt voorleggen aan andere betrokkenen, bijvoorbeeld medewerkers, vrijwilligers, ouders en/of bezoekers. Onderzoek wat mensen vinden van het rookvrij maken van de speelplek. Beantwoord hun vragen en luister naar de bezwaren. Dit kan bijvoorbeeld in een gesprek met enkele ouders en bezoekers of via een vragenlijst. Wees duidelijk over de plannen, geef eventueel tegenargumenten en neem goede ideeën mee. Deze informatie kan helpen om te bepalen of de speelplek klaar is voor een geheel rookvrij terrein of dat een aanpak in stappen beter is. Deze actiepagina biedt de mogelijkheid om een community te vormen rondom de speeltuin en hier te chatten over besluit.</Typography>
            }
          />
        )
    }
}

export default withRouter(CollectOpinionsCard);


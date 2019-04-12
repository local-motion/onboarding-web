import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";

class MeningenInventariseren extends React.Component {
    render() {
        const {playground} = this.props;

        if (!playground) return "Loading...";

        return (
          <WorkspaceCard
            title={"Meningen inventariseren"}
            done={null}
            image={require("assets/img/backgrounds/shout.jpg")}
            content={"Bepaal bij een positief besluit van het bestuur wanneer en hoe je dit wilt voorleggen aan andere betrokkenen, bijvoorbeeld medewerkers, vrijwilligers, ouders en/of bezoekers. Onderzoek wat mensen vinden van het rookvrij maken van de speelplek. Beantwoord hun vragen en luister naar de bezwaren. Dit kan bijvoorbeeld in een gesprek met enkele ouders en bezoekers of via een vragenlijst. Wees duidelijk over de plannen, geef eventueel tegenargumenten en neem goede ideeën mee. Deze informatie kan helpen om te bepalen of de speelplek klaar is voor een geheel rookvrij terrein of dat een aanpak in stappen beter is. Deze actiepagina biedt de mogelijkheid om een community te vormen rondom de speeltuin en hier te chatten over besluit."}
            expandContent={null}
          />
        )
    }
}

export default MeningenInventariseren;


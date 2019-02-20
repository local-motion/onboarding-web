import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";


class PartyCard extends React.Component {
    render() {
        const {playground} = this.props;

        if (!playground) return "Loading..."
        
        return (
            <WorkspaceCard title={"Feestje!"}
                done={  false }
                image={require("assets/img/backgrounds/party.jpg")}
                content={"Open de rookvrije speeltuin met een straatfeest."}
                expandContent={
                    <div>Hier wordt nog aan gewerkt.</div>
                }
            />
        )
    }
}

export default PartyCard


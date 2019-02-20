import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";


class WhatsNextCard extends React.Component {
    render() {
        const {playground} = this.props;

        if (!playground) return "Loading..."
        
        return (
            <WorkspaceCard title={"En verder..."}
                done={  false }
                image={require("assets/img/backgrounds/roadtofuture.jpg")}
                content={"Ontdek het laatste nieuws over deze speeltuin"}
                expandContent={
                    <div>Hier wordt nog aan gewerkt.</div>
                }
            />
        )
    }
}

export default WhatsNextCard


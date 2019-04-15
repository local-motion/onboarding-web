import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { Button } from "@material-ui/core";
import { isUserManagerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { connect } from 'react-redux'
import { setDecideSmokefree } from "../../../components/Playground/PlaygroundActions";

const mapDispatchToProps = dispatch => ({
    setDecideSmokefree:    (initiativeId) =>     dispatch(setDecideSmokefree(initiativeId)),
});

// step: "Wij Worden Rookvrij"
class WeWillBecomeSmokefreeCard extends React.Component {
    render() {
        const {playground, user} = this.props;

        if (!playground)
            return "Loading...";

        const decisionTaken  = playground.status === 'IN_PROGRESS' || playground.status === 'FINISHED';

        return (
            <WorkspaceCard 
                title={"Wij worden rookvrij"}
                playground={playground}
                done={decisionTaken}
                managerOnly={true}
                userIsManager={ user && isUserManagerOfPlayground(user, playground) }
                image={require("assets/img/backgrounds/commitment.jpg")}
                content={"Neem officieel het besluit om de speeltuin rookvrij te maken. (Alleen de beheerders van de speeltuin kunnen dit doen.)"}
                expandContent={
                    <div>
                        <Button 
                            variant="contained" size="small" color="primary" 
                            disabled={!user || !isUserManagerOfPlayground(user, playground) || decisionTaken}  
                            onClick={() => this.props.setDecideSmokefree(playground.id)}
                            >
                            { decisionTaken ?  'Ons besluit staat vast' : 'Ja, wij worden rookvrij' }
                        </Button>
                    </div>
                }
            />
        )
    }
}

export default connect(null, mapDispatchToProps)(WeWillBecomeSmokefreeCard);


import React from "react";
import { connect } from 'react-redux';

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { setDecideSmokefree } from "../../../components/Playground/PlaygroundActions";
import { isUserManagerOfPlayground } from "../../../components/Playground/PlaygroundReducer";

const mapDispatchToProps = dispatch => ({
    setDecideSmokefree:    (initiativeId) =>     dispatch(setDecideSmokefree(initiativeId)),
});

// step: "Wij Worden Rookvrij"
class WeWillBecomeSmokefreeCard extends React.Component {
    componentDidMount() {
        this.setCta();
    }

    componentDidUpdate(prevProps) {
        const { user, playground } = this.props;

        if (
          (!prevProps.user && user)
          || prevProps.playground.status !== playground.status
        ) {
            this.setCta();
        }
    }

    componentWillUnmount() {
        this.props.unsetCta();
    }

    setCta() {
        const { setCta, playground, user } = this.props;

        const decisionTaken  = user && (playground.status === 'IN_PROGRESS' || playground.status === 'FINISHED');

        if (!decisionTaken) {
            setCta({
                ctaAction: () => this.props.setDecideSmokefree(playground.id),
                ctaText: 'Ja, wij worden rookvrij',
                ctaDisabled: !isUserManagerOfPlayground(user, playground) || decisionTaken,
            });
        } else {
            setCta({
                ctaAction: () => null,
                ctaText: 'Ons besluit staat vast',
                ctaDisabled: true,
                ctaDone: true,
            });
        }
    }

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
                expandContent={null}
            />
        )
    }
}

export default connect(null, mapDispatchToProps)(WeWillBecomeSmokefreeCard);


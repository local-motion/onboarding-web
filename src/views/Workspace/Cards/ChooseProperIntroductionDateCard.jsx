import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-datepicker/dist/react-datepicker.css";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import {
    isUserManagerOfPlayground
} from "../../../components/Playground/PlaygroundReducer";
import { setSmokefreeDate } from "../../../components/Playground/PlaygroundActions";
import PickIntroductionDateButton from "../components/PickIntroductionDateButton";

const mapDispatchToProps = dispatch => ({
    setSmokefreeDate: (initiativeId, smokeFreeDate) => dispatch(setSmokefreeDate(initiativeId, smokeFreeDate))
});

const styles = ({
    contentItem: {
        marginBottom: '20px',
    },
    ctaDone: {
        marginLeft: 10,
    },
});

// step:  "Kies Een Goed Moment Van Invoering"
class ChooseProperIntroductionDateCard extends React.Component {
    constructor(props) {
        super(props);

        this.renderCustomButton = this.renderCustomButton.bind(this);
    }

    componentDidMount() {
        this.setCta();
    }

    componentDidUpdate(prevProps) {
        const { user, playground } = this.props;

        if (
          (!prevProps.user && user)
          || prevProps.playground.smokeFreeDate !== playground.smokeFreeDate
        ) {
            this.setCta();
        }
    }

    componentWillUnmount() {
        this.props.unsetCta();
    }

    setCta() {
        this.props.setCta({ CustomButton: this.renderCustomButton });
    }

    renderCustomButton() {
        const { playground, user, setSmokefreeDate } = this.props;

        return (
          <PickIntroductionDateButton
            playground={playground}
            user={user}
            setSmokefreeDate={setSmokefreeDate}
          />
        );
    }

    render() {
        const { playground, user, classes } = this.props;

        if (!playground) return "Loading...";

        const userIsManager = isUserManagerOfPlayground(user, playground);

        return (
          <WorkspaceCard
            title={playground.smokeFreeDate ? `${playground.name} is rookvrij per ${playground.smokeFreeDate.toLocaleDateString()}` : "Zet in de agenda"}
            done={playground.smokeFreeDate}
            image={require("assets/img/backgrounds/date.jpg")}
            content={"Geweldig, het bestuur heeft besloten dat de speeltuin rookvrij wordt! Nu is het belangrijk om een datum te prikken dat het nieuwe rookvrije beleid ingaat."}
            managerOnly={true}
            userIsManager={userIsManager}
            expandContent={
                <div>
                    <Typography component="p">Een goed moment is bijvoobeeld:</Typography>

                    <ul>
                        <li>de start van een nieuw seizoen, of na de wintersluiting</li>
                        <li>een verbouwing of verhuizing</li>
                        <li>een ander groot evenement of belangrijke gebeurtenis, zoals de Nationale Buitenspeeldag (<a
                          href="http://www.jantjebeton.nl">www.jantjebeton.nl</a>)</li>
                    </ul>

                    {(playground.smokeFreeDate || userIsManager) &&
                    <div className={"card-datepicker"}>
                        <Typography component="p" className={classes.contentItem}>Selecteer de datum waarop de speeltuin rookvrij wordt. (Alleen de beheerder kan deze actie uitvoeren.)</Typography>

                        <Typography component="p">Tip: organiseer of benut een feestelijk moment waarop de rookvrije afspraak ingaat.</Typography>
                    </div>
                    }
                </div>
            }
          />
        );
    }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(ChooseProperIntroductionDateCard));


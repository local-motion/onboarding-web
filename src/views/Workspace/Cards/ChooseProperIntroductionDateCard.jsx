import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { isUserManagerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { setSmokefreeDate } from "../../../components/Playground/PlaygroundActions";

const mapDispatchToProps = dispatch => ({
    setSmokefreeDate: (initiativeId, smokeFreeDate) => dispatch(setSmokefreeDate(initiativeId, smokeFreeDate))
});

const dateToString = date => {
    let year = date.getFullYear();
    let monthPadded = ("0" + (date.getMonth() + 1)).slice(-2);
    let dayPadded = ("0" + date.getDate()).slice(-2);

    return year + "-" + monthPadded + "-" + dayPadded;
};

const styles = ({
    contentItem: {
        marginBottom: '20px',
    },
});


// step:  "Kies Een Goed Moment Van Invoering"
class ChooseProperIntroductionDateCard extends React.Component {
    render() {
        const { playground, user, classes, setSmokefreeDate } = this.props;

        if (!playground) return "Loading...";

        const date = playground.smokeFreeDate || new Date();
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

                        <DatePicker
                          className={classes.contentItem}
                          disabled={!userIsManager || playground.status === "NOT_STARTED"}
                          dateFormat="dd-MM-YYYY"
                          selected={date}
                          onChange={date => setSmokefreeDate(playground.id, dateToString(date))}
                        />

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


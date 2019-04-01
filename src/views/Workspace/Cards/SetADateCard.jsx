import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { Button, Typography } from "@material-ui/core";
import ContentDialog from "../../../components/Dialogs/ContentDialog";
import { connect } from 'react-redux'
import { isUserManagerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setSmokefreeDate } from "../../../components/Playground/PlaygroundActions";

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    setSmokefreeDate:    (initiativeId, smokeFreeDate) =>     dispatch(setSmokefreeDate(initiativeId, smokeFreeDate)),
})

const dateToString = date => {
    let year = date.getFullYear();
    let monthPadded = ("0" + (date.getMonth()+1)).slice(-2);
    let dayPadded = ("0" + date.getDate()).slice(-2);
    return year + '-' + monthPadded + '-' + dayPadded
}


class SetADateCard extends React.Component {

    state = {
        tipsDialogOpen: false,
      }

    openTipsDialog()  {  this.setState({ tipsDialogOpen: true  })   }
    closeTipsDialog() {  this.setState({ tipsDialogOpen: false })   }

    render() {
        const {playground, user, setSmokefreeDate} = this.props;

        if (!playground) return "Loading..."

        const date = playground.smokeFreeDate || new Date()
        const userIsManager = isUserManagerOfPlayground(user, playground)

        const tipsContent = (
            <div>
                <Typography gutterBottom>
                    1 maart -opening van het speelseizoen
                </Typography>
                <Typography gutterBottom>
                    27 april - Koningsdag
                </Typography>
                <Typography gutterBottom>
                    juli - begin van de zomervakantie
                </Typography>
                <Typography gutterBottom>
                    augustus - wanneer de scholen weer beginnen
                </Typography>
            </div>
        )

        return (
            <WorkspaceCard 
                title={playground.smokeFreeDate ? `${playground.name} is rookvrij per ${playground.smokeFreeDate.toLocaleDateString()}` : "Zet in de agenda"}
                done={playground.smokeFreeDate}
                image={require("assets/img/backgrounds/date.jpg")}
                content={"Selecteer de datum waarop Speeltuin rookvrij wordt. Alleen de beheerder kan deze actie uitvoeren."}
                managerOnly={true}
                userIsManager={userIsManager}
                expandContent={
                    <div>
                        <Typography component="p">Heb je hulp nodig om een goed moment te kiezen?</Typography>
                        <Button variant="contained" size="small" color="primary" onClick={() => this.openTipsDialog()}>Handige momentenkalender</Button>
                        <ContentDialog 
                            open={this.state.tipsDialogOpen} 
                            onClose={() => this.closeTipsDialog()} 
                            title="Handige momentenkalender"
                            content={tipsContent}
                        />

                        { (playground.smokeFreeDate || userIsManager) &&
                            <div className={"card-datepicker"}>
                                <br />
                                <DatePicker
                                    disabled={!userIsManager || playground.status === 'NOT_STARTED'}
                                    dateFormat="dd-MM-YYYY"
                                    selected={date}
                                    onChange={date => setSmokefreeDate(playground.id, dateToString(date))}
                                />
                            </div>
                        }
                    </div>
                }
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetADateCard)


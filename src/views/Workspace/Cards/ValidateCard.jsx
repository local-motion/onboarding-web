import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { Button, Typography } from "@material-ui/core";
// import classes from "*.module.sass";
import {withStyles} from '@material-ui/core/styles';
import ContentDialog from "../../../components/Dialogs/ContentDialog";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";

const styles = theme => ({
    smokefreeButton: {
        backgroundColor: 'green',
    },
    notSmokefreeButton: {
        backgroundColor: 'red',
    },
    doneIcon: {
        color: 'green',
    },
    notDoneIcon: {
    },
});



class ValidateCard extends React.Component {

    state = {
        tipsDialogOpen: false,
        streak: 0
    }

    openTipsDialog()  {  this.setState({ tipsDialogOpen: true  })   }
    closeTipsDialog() {  this.setState({ tipsDialogOpen: false })   }

    smokefreeObservation = () => {
        this.setState( {streak: this.state.streak + 1} )
    }

    notSmokefreeObservation = () => {
        this.setState( {streak: 0})
    }

    render() {
        const {classes, playground, user} = this.props;

        if (!playground) return "Loading..."
        
        const tipsContent = (
            <div>
                <Typography gutterBottom>
                    Wees constructief en voorkom escalatie.
                </Typography>
                <Typography gutterBottom>
                    Wijs degene op de gevolgen voor kinderen: 'Zien roken doet roken'
                </Typography>
                <Typography gutterBottom>
                    ...
                </Typography>
            </div>
        )

        return (
            <WorkspaceCard title={"Volhouden"}
                done={ this.state.streak >= 10 }
                image={require("assets/img/backgrounds/magnify.jpg")}
                content={"Valideer of de speeltuin nog steeds rookvrij is. Ga elke dag kijken en geef hier aan of je iemand hebt zien roken of dat je peuken hebt zien liggen."}
                expandContent={
                    <div>
                        <Typography component="p">Als je iemand ziet roken kun je hem of haar daarop aanspreken. Hier zijn wat tips voor een constructieve dialoog.</Typography>
                        <Button variant="contained" size="small" color="primary" onClick={() => this.openTipsDialog()}>tips</Button>
                        <ContentDialog 
                            open={this.state.tipsDialogOpen} 
                            onClose={() => this.closeTipsDialog()} 
                            title="Hoe spreek ik een roker aan?"
                            content={tipsContent}
                            />

                        <br /><br />
                        <Typography component="p">Geef aan of je iemand hebt zien roken vandaag.</Typography>
                        <Button 
                            variant="contained" size="small" color="primary" 
                            disabled={!isUserVolunteerOfPlayground(user, playground)}
                            className={classes.smokefreeButton}
                            onClick={this.smokefreeObservation}
                        >
                            Rookvrij
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button 
                            variant="contained" size="small" color="primary" 
                            disabled={!isUserVolunteerOfPlayground(user, playground)}
                            className={classes.notSmokefreeButton}
                            onClick={this.notSmokefreeObservation}
                        >
                            Niet rookvrij
                        </Button>
                        <br /><br />
                        <Typography component="p">Ga voor tien op een rij, rookvrij!</Typography>

                        { [...Array(10).keys()].map(i => i < this.state.streak ?
                            <CheckCircleIcon key={i} className={classes.doneIcon}/> 
                            :
                            <CheckCircleOutlineIcon key={i} className={classes.notDoneIcon}/> 
                        )}

                    </div>
                }
            />
        )
    }
}

export default withStyles(styles)(ValidateCard)


import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { Button, Typography, TextField } from "@material-ui/core";
// import classes from "*.module.sass";
import {withStyles} from '@material-ui/core/styles';
import ContentDialog from "../../../components/Dialogs/ContentDialog";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MoodGoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { connect } from 'react-redux'
import { recordPlaygroundObservation } from "../../../components/Playground/PlaygroundActions";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
    moodGoodIcon: {
        color: 'green',
    },
    moodBadIcon: {
        color: 'red',
    },
});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    recordPlaygroundObservation:    (initiativeId, smokefree, comment, user) =>     dispatch(recordPlaygroundObservation(initiativeId, smokefree, comment, user)),
})

const isSameDate = (date1, date2) => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()


class ValidateCard extends React.Component {

    state = {
        tipsDialogOpen: false,
        commentDialogOpen: false,
        comment: ''
    }

    openTipsDialog = () => {  this.setState({ tipsDialogOpen: true  })   }
    closeTipsDialog = () => {  this.setState({ tipsDialogOpen: false })   }

    smokefreeObservation = () => {
        this.props.recordPlaygroundObservation(this.props.playground.id, true, '', this.props.user)
    }
    notSmokefreeObservation = () => {
        this.openCommentDialog()
    }

    openCommentDialog = () => {  this.setState({ commentDialogOpen: true, comment: ''  })   }
    onCommentChange = (event) => { this.setState({comment: event.target.value}) }
    confirmCommentDialog = () => {  
        this.setState({ commentDialogOpen: false })   
        this.props.recordPlaygroundObservation(this.props.playground.id, false, this.state.comment, this.props.user)
    }
    cancelCommentDialog = () => {  
        this.setState({ commentDialogOpen: false })   
    }


    calculateStats = () => {
        const observations = this.props.playground.playgroundObservations
        let streak = 0
        let totalSmokefree = 0
        let totalSmoking = 0
        for (let i = 0; i < observations.length; i++)
            if (observations[i].smokefree) {
                streak++
                totalSmokefree++
            }
            else {
                streak = 0
                totalSmoking++
            }
        return {streak, totalSmokefree, totalSmoking}
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

        const observations = this.props.playground.playgroundObservations
        let todaysObserver = null
        let todayWasSmokefree = null
        if (observations.length) {
            const lastObservation = observations[observations.length - 1]
            if (isSameDate(new Date(lastObservation.observationDate), new Date())) {
                todaysObserver = lastObservation.observerName
                todayWasSmokefree = lastObservation.smokefree
            }
        }
        

        const {streak, totalSmokefree, totalSmoking} = this.calculateStats()

        return (
            <WorkspaceCard title={"Volhouden"}
                done={ this.state.streak >= 10 }
                image={require("assets/img/backgrounds/magnify.jpg")}
                content={"Valideer of de speeltuin nog steeds rookvrij is. Ga elke dag kijken en geef hier aan of je iemand hebt zien roken of dat je peuken hebt zien liggen."}
                expandContent={
                    <div>
                        <Typography component="p">Als je iemand ziet roken kun je hem of haar daarop aanspreken. Hier zijn tips voor een constructieve dialoog.</Typography>
                        <Button variant="contained" size="small" color="primary" onClick={() => this.openTipsDialog()}>tips</Button>
                        <ContentDialog 
                            open={this.state.tipsDialogOpen} 
                            onClose={() => this.closeTipsDialog()} 
                            title="Hoe spreek ik een roker aan?"
                            content={tipsContent}
                            />

                        <br /><br />
                        { todaysObserver ?
                            <Typography component='span'>{todaysObserver + (todayWasSmokefree ? ' zag dat onze speeltuin vandaag rookvrij was!' : ' zag iemand roken vandaag :(')}</Typography>
                        :
                            <div>
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
                                </div>
                            }

                        <Dialog
                            open={this.state.commentDialogOpen}
                            onClose={this.cancelCommentDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Deel je ervaringen</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Heb je met de roker gesproken en hoe ging dat?
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    value={this.state.comment}
                                    onChange={event => this.onCommentChange(event)}
                                    onKeyUp={event => event.key === 'Enter' ? this.confirmCommentDialog() : null}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.cancelCommentDialog} color="secondary">
                                    Annuleren
                                </Button>
                                <Button onClick={this.confirmCommentDialog} color="primary">
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <br />
                        <Typography component="p">In totaal hebben we dit gezien:</Typography>
                        <Button disabled={true}>
                            <MoodGoodIcon className={classes.moodGoodIcon}/>
                            &nbsp;{totalSmokefree}
                        </Button>
                        <Button disabled={true}>
                            <MoodBadIcon className={classes.moodBadIcon}/>
                            &nbsp;{totalSmoking}
                        </Button>

                        <br /><br />
                        <Typography component="p">Ga voor tien op een rij, rookvrij!</Typography>

                        { [...Array(10).keys()].map(i => i < streak ?
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ValidateCard))

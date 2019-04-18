import React from "react";
import { connect } from "react-redux";
import { Button, Typography, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Check from "@material-ui/icons/Check";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { recordPlaygroundObservation } from "../../../components/Playground/PlaygroundActions";

const styles = theme => ({
    smokefreeButton: {
        backgroundColor: "green",
        marginRight: 15,
    },
    notSmokefreeButton: {
        backgroundColor: "red"
    },
    doneIcon: {
        color: "green"
    },
    notDoneIcon: {},
    contentItem: {
        marginBottom: 20,
    },
    contentItemSmallMargin: {
        marginBottom: 10,
    },
    ctaWrapper: {
        display: "flex",
        '& > button': {
            flexGrow: 1,
            padding: "6px 16px",
        },
    },
    ctaDone: {
        marginLeft: 10,
    },
});

const mapDispatchToProps = dispatch => ({
    recordPlaygroundObservation: (initiativeId, smokefree, comment, user) => dispatch(recordPlaygroundObservation(initiativeId, smokefree, comment, user))
});

const isSameDate = (date1, date2) => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();


// Step:  "Evalueren"
class EvaluateCard extends React.Component {
    state = {
        commentDialogOpen: false,
        comment: ""
    };

    componentDidMount() {
        this.setCta();
    }

    componentDidUpdate(prevProps) {
        const { user, playground } = this.props;

        if (
          (!prevProps.user && user)
          || prevProps.playground.playgroundObservations.length !== playground.playgroundObservations.length
        ) {
            this.setCta();
        }
    }

    componentWillUnmount() {
        this.props.unsetCta();
    }

    setCta() {
        const { setCta } = this.props;
        const todaysInfo = this.getTodaysInfo();

        setCta({ CustomButton: () => this.renderCustomButton(todaysInfo) });
    }

    renderCustomButton({ todaysObserver, todayWasSmokefree }) {
        const { classes, playground, user } = this.props;
        const disabled = !isUserVolunteerOfPlayground(user, playground) || todaysObserver;

        return (
          <div className={classes.ctaWrapper}>
              <Button
                variant="contained" size="small" color="primary"
                disabled={disabled}
                className={classes.smokefreeButton}
                onClick={this.smokefreeObservation}
              >
                  Rookvrij { todayWasSmokefree === true && <Check className={classes.ctaDone} /> }
              </Button>

              <Button
                variant="contained" size="small" color="primary"
                disabled={disabled}
                className={classes.notSmokefreeButton}
                onClick={this.notSmokefreeObservation}
              >
                  Niet rookvrij { todayWasSmokefree === false && <Check className={classes.ctaDone} /> }
              </Button>
          </div>
        );
    }

    getTodaysInfo = () => {
        const observations = this.props.playground.playgroundObservations;
        const todaysInfo = {
            todaysObserver: null,
            todayWasSmokefree: null,
        };

        if (observations.length) {
            const lastObservation = observations[observations.length - 1];
            if (isSameDate(new Date(lastObservation.observationDate), new Date())) {
                todaysInfo.todaysObserver = lastObservation.observerName;
                todaysInfo.todayWasSmokefree = lastObservation.smokefree;
            }
        }

        return todaysInfo;
    };

    smokefreeObservation = () => {
        this.props.recordPlaygroundObservation(this.props.playground.id, true, "", this.props.user);
    };

    notSmokefreeObservation = () => {
        this.openCommentDialog();
    };

    openCommentDialog = () => {
        this.setState({ commentDialogOpen: true, comment: "" });
    };

    onCommentChange = (event) => {
        this.setState({ comment: event.target.value });
    };

    confirmCommentDialog = () => {
        this.setState({ commentDialogOpen: false });
        this.props.recordPlaygroundObservation(this.props.playground.id, false, this.state.comment, this.props.user);
    };

    cancelCommentDialog = () => {
        this.setState({ commentDialogOpen: false });
    };

    calculateStats = () => {
        const observations = this.props.playground.playgroundObservations;
        let streak = 0;
        let totalSmokefree = 0;
        let totalSmoking = 0;
        for (let i = 0; i < observations.length; i++)
            if (observations[i].smokefree) {
                streak++;
                totalSmokefree++;
            }
            else {
                streak = 0;
                totalSmoking++;
            }
        return { streak, totalSmokefree, totalSmoking };
    };

    render() {
        const { classes, playground } = this.props;

        if (!playground) return "Loading...";

        const { todaysObserver, todayWasSmokefree } = this.getTodaysInfo();

        const { streak } = this.calculateStats();

        return (
            <WorkspaceCard
                title={"Evalueren"}
                done={this.state.streak >= 10}
                image={require("assets/img/backgrounds/magnify.jpg")}
                content={"Evalueer de nieuwe afspraak voor een rookvrije speelplek met het team dat betrokken is bij de invoering."}
                expandContent={
                    <div>
                        <Typography component="p">Stel hierbij de volgende vragen:</Typography>

                        <ul>
                            <li>Houden mensen zich aan de afspraak?</li>
                            <li>Zijn zij voldoende geïnformeerd en is de rookvrije afspraak voldoende zichtbaar gemaakt?</li>
                            <li>Zijn er aanpassingen nodig om de nieuwe afspraak nog beter zichtbaar te maken?</li>
                            <li>Als het terrein nog niet geheel rookvrij is, wat is dan de volgende stap hiernaartoe?</li>
                            <li>Vraag eventueel ook ouders en kinderen naar hun mening en suggesties.</li>
                        </ul>

                        {
                            todaysObserver && (
                              <Typography className={classes.contentItem} component='span'>
                                  {todaysObserver + (todayWasSmokefree ? " zag dat onze speeltuin vandaag rookvrij was!" : " zag iemand roken vandaag :(")}
                              </Typography>
                            )
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
                                    onKeyUp={event => event.key === "Enter" ? this.confirmCommentDialog() : null}
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

                        <Typography component="p" className={classes.contentItemSmallMargin}>Ga voor tien op een rij, rookvrij!</Typography>

                        {[...Array(10).keys()].map(i => i < streak ?
                            <CheckCircleIcon key={i} className={classes.doneIcon} />
                            :
                            <CheckCircleOutlineIcon key={i} className={classes.notDoneIcon} />
                        )}

                    </div>
                }
            />
        );
    }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(EvaluateCard));

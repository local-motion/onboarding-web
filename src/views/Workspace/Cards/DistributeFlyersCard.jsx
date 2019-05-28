import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";

import flyer from "../../../assets/Flyer.Rookvrij.spelen.online.def.pdf";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import ConnectedCheckbox from "../../../components/ConnectedCheckbox/ConnectedCheckbox";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { setCheckbox } from "../../../components/Playground/PlaygroundActions";
import { checkBox } from "../../../misc/WorkspaceHelpers";

const mapDispatchToProps = dispatch => ({
    setCheckbox: (initiativeId, checklistItem, isChecked, user) =>
      dispatch(setCheckbox(initiativeId, checklistItem, isChecked, user)),
});

const styles = theme => ({
    page: {
        display: 'flex',
        justifyContent: 'center',
        height: '80vh',
        width: '100%',
    },
    buttons: {
        marginBottom: 10,
    },
    button: {
        marginRight: 10,
        '&:hover': {
            color: '#FFF',
        },
    },
});


// step:  "Flyers Verspreiden"
class DistributeFlyersCard extends React.Component {
    state = {
        isOpen: false,
    };

    componentDidMount() {
        this.setCta();
    }

    componentDidUpdate(prevProps) {
        const { user, playground } = this.props;

        if (
          (!prevProps.user && user)
          || (prevProps.playground.jointChecklistItems.length !== playground.jointChecklistItems.length)
        ) {
            this.setCta();
        }
    }

    componentWillUnmount() {
        this.props.unsetCta();
    }

    setCta() {
        const { setCta, playground, user } = this.props;

        switch(true) {
            case !playground.jointChecklistItems.includes("order_flyers"): {
                setCta({
                    ctaAction: () => {
                        this.toggleOpen();
                    },
                    ctaText: 'Bestel flyers',
                    ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case (
              !playground.jointChecklistItems.includes("distribute_flyers")
              && playground.jointChecklistItems.includes("order_flyers")
            ): {
                setCta({
                    ctaAction: () => {
                        this.checkBox("distribute_flyers");
                    },
                    ctaText: 'Flyers uitdelen',
                    ctaDisabled: !isUserVolunteerOfPlayground(user, playground),
                });

                return;
            }

            case playground.jointChecklistItems.includes("distribute_flyers")
              && playground.jointChecklistItems.includes("order_flyers"): {
                setCta({
                    ctaAction: () => null,
                    ctaText: 'Ik heb flyers uitgedeeld',
                    ctaDisabled: true,
                    ctaDone: true,
                });

                return;
            }

            default: {}
        }
    }

    openSendMail = () => {
        const inviteButtonHref = "mailto:service@longfonds.nl?" +
          "subject=Flyers%20bestellen&" +
          "body=Hallo,%0A%0A" +
          "Ik%20wil%20graag%20flyers%20bestellen%20voor%20speeltuin%20" + this.props.playground.name + ".%0A" +
          "Mijn%20adres%20is%20...%20VUL%20HIER%20JE%20ADRESGEGEVENS%20IN%20...";

        window.open(inviteButtonHref);
        this.checkFlyers();
    };

    checkBox = (name) => {
        const { setCheckbox, playground, user } = this.props;

        checkBox({ setCheckbox, playground, user, name });
    };

    toggleOpen = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

    checkFlyers = () => {
        this.checkBox("order_flyers");
        this.toggleOpen();
    };

    render() {
        const { playground, classes } = this.props;
        const { isOpen } = this.state;

        if (!playground) return "Loading...";
        
        return (
            <WorkspaceCard title={"Flyers verspreiden"}
                done={playground.jointChecklistItems.includes('distribute_flyers')}
                image={require("assets/img/backgrounds/flyer.jpg")}
                content={"Deel flyers uit in de buurt om de mensen mee te nemen in dit initiatief."}
                expandContent={
                    <div>
                        <ConnectedCheckbox playground={playground} checklistItem="order_flyers" label="De flyers zijn besteld" />

                        <div className={classes.buttons}>
                            <Button
                              variant="contained"
                              href="https://webshop.rookvrijegeneratie.nl/UserContentStart.aspx?category=35"
                              target="_blank"
                              onClick={this.checkFlyers}
                              color="primary"
                              className={classes.button}
                            >
                                Bezoek webshop
                            </Button>
                            <Button variant="contained" onClick={this.openSendMail} color="secondary">
                                Verstuur e-mail
                            </Button>
                        </div>

                        <Typography component="p">Ga nu samen de flyers uitdelen in de buurt.</Typography>

                        <ConnectedCheckbox playground={playground} checklistItem="distribute_flyers" label="De flyers zijn uitgedeeld" />

                        <Dialog
                          fullWidth
                          maxWidth="sm"
                          open={isOpen}
                          onClose={this.toggleOpen}
                          aria-labelledby="form-dialog-title"
                        >
                            <DialogContent>
                                <embed
                                  src={`${window.location.origin}${flyer}`}
                                  type="application/pdf"
                                  className={classes.page}
                                  view="Fit"
                                  toolbar="1"
                                  navpanes="1"
                                />
                            </DialogContent>
                            <DialogActions className={"dialog-actions"}>
                                <Button className={classes.button} variant="contained" href={flyer} target="_blank" onClick={this.checkFlyers} color="primary">
                                    Download
                                </Button>
                                <Button onClick={this.toggleOpen} color="primary">
                                    Annuleren
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
            />
        )
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(DistributeFlyersCard));


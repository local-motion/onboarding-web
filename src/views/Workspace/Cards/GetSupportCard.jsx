import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import SocialMedia from "../forms/SocialMedia";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import GridItem from "../../../components/Grid/GridItem";
import GridContainer from "../../../components/Grid/GridContainer";

const styles = theme => ({
    usersList: {
        overflowY: 'auto',
        maxHeight: '600px',
    },
});

class GetSupportCard extends React.Component {
    render() {
        const {playground, user, classes} = this.props;
        
        if (!playground) return "Loading..."

        const inviteButtonHref = "mailto:?subject=Maak%20speeltuin%20rookvrij&body=Ik%20wil%20graag%20speeltuin%20rookvrij%20maken.%0AHelp%20jij%20met%20me%20mee%3F"
        const inviteButtonLabel = "Verstuur een email"
        const targetNrOfVolunteers = 2
        return (
            <WorkspaceCard title={"Mensen verzamelen"}
                done={playground.volunteerCount >= targetNrOfVolunteers}
                image={require("assets/img/backgrounds/team.jpg")}
                customStyle={{ backgroundPositionY: '-70px' }}
                content={"Samen sta je sterk. Nodig anderen uit om mee te doen. Probeer om minimaal " + targetNrOfVolunteers + " mensen te verzamelen."}
                primaryCta={{
                    action: inviteButtonHref,
                    text: inviteButtonLabel
                }}
                expandContent={
                    <GridContainer className={"information-container" + classes.usersList}>
                        <GridItem xs={4} sm={4} md={4}>
                            <Paper elevation={2}>
                                <List>
                                    {playground.volunteers.map(function (volunteer, index) {
                                        const volunteerIsManager = playground.managers.filter(manager => manager.id === volunteer.userId).length > 0
                                        return <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar className={user && volunteer.userId === user.id ? classes.purpleAvatar : classes.avatar }>
                                                    {volunteer.userName.substring(0, volunteer.userName.length > 1 ? 2 : 1)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={volunteer.userName} secondary={volunteerIsManager ? '(Beheerder)' : ''}/>
                                        </ListItem>
                                    })}
                                </List>
                            </Paper>
                        </GridItem>

                        <GridItem xs={8} sm={8} md={8}>
                            <Typography component="p">Stuur je kennissen een mailtje</Typography>
                            <Button disabled={!isUserVolunteerOfPlayground(user, playground)} size="small" color="primary" href={inviteButtonHref}>{inviteButtonLabel}</Button>
                            <br />
                            <br />
                            <Typography component="p">Doe een oproep op social media</Typography>
                            <SocialMedia playground={playground}/>
                        </GridItem>
                    </GridContainer>
                }
            />
        )
    }
}

export default withStyles(styles)(GetSupportCard);


import React from "react";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import SocialMedia from "../forms/SocialMedia";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import GridItem from "../../../components/Grid/GridItem";
import GridContainer from "../../../components/Grid/GridContainer";
import { getHrefToSendMail } from "../../../misc/WorkspaceHelpers";

const styles = theme => ({
    usersList: {
        overflowY: 'auto',
        marginBottom: '20px',
        maxHeight: '600px',
    },
    contentParagraph: {
        marginBottom: '20px',
    }
});

// step: "Team"
class TeamCard extends React.Component {
    render() {
        const {playground, user, classes} = this.props;

        if (!playground) return "Loading...";

        const inviteButtonHref = getHrefToSendMail(playground);
        const inviteButtonLabel = "Deel link via email";
        const targetNrOfVolunteers = 2;

        return (
          <WorkspaceCard
            title={"Team"}
            done={playground.volunteerCount >= targetNrOfVolunteers}
            image={require("assets/img/backgrounds/team-bg.jpg")}
            customStyle={{ backgroundPositionY: '-70px' }}
            content={""}
            primaryCta={{
                action: inviteButtonHref,
                text: inviteButtonLabel
            }}
            expandContent={
                <React.Fragment>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <Paper elevation={2}>
                                <List className={classes.usersList}>
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

                        <GridItem xs={12} sm={12} md={8}>
                            <Button disabled={!isUserVolunteerOfPlayground(user, playground)} size="small" color="primary" target="_blank" href={inviteButtonHref}>{inviteButtonLabel}</Button>
                            <br />
                            <br />
                            <Typography component="p">Deel link door middel van social media</Typography>
                            <SocialMedia playground={playground}/>
                        </GridItem>
                    </GridContainer>
                </React.Fragment>
            }
          />
        )
    }
}

export default withStyles(styles)(TeamCard);


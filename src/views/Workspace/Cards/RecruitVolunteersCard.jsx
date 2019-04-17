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
        marginBottom: '20px',
        maxHeight: '600px',
    },
    contentParagraph: {
        marginBottom: '20px',
    }
});

// step: "Mensen Verzamelen"
class RecruitVolunteersCard extends React.Component {
    componentDidMount() {
        this.setCta();
    }

    componentDidUpdate(prevProps) {
        if (
            (!prevProps.user && this.props.user)
            || (prevProps.playground.volunteers.length !== this.props.playground.volunteers.length)
        ) {
            this.setCta();
        }
    }

    componentWillUnmount() {
        this.props.unsetCta();
    }

    setCta() {
        const { setCta, playground, user } = this.props;
        const inviteButtonHref = "mailto:?subject=Maak%20speeltuin%20rookvrij&body=Ik%20wil%20graag%20speeltuin%20rookvrij%20maken.%0AHelp%20jij%20met%20me%20mee%3F";

        setCta({
            ctaAction: () => { window.open(inviteButtonHref) },
            ctaText: 'Deel via e-mail',
            ctaDisabled: () => !isUserVolunteerOfPlayground(user, playground),
        });
    }

    render() {
        const {playground, user, classes} = this.props;
        
        if (!playground) return "Loading...";

        const targetNrOfVolunteers = 2;

        return (
            <WorkspaceCard
                title={"Mensen verzamelen"}
                done={playground.volunteerCount >= targetNrOfVolunteers}
                image={require("assets/img/backgrounds/team.jpg")}
                customStyle={{ backgroundPositionY: '-70px' }}
                content={"Steun krijgen van (of binnen) het bestuur is een belangrijke eerste stap. De kans om deze steun te krijgen, is groter wanneer je een aantal mensen om je heen verzamelt die de speelplek ook rookvrij willen maken."}
                expandContent={
                    <React.Fragment>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                                <Typography component="p" className={classes.contentParagraph}>Probeer om minimaal {targetNrOfVolunteers} mensen te verzamelen.</Typography>
                                <Typography component="p" className={classes.contentParagraph}>Deel link door middel van social media</Typography>
                                <SocialMedia playground={playground}/>
                            </GridItem>

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
                        </GridContainer>
                    </React.Fragment>
                }
            />
        )
    }
}

export default withStyles(styles)(RecruitVolunteersCard);


import React from "react";
//import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { connect } from 'react-redux'
import { claimManagerRole, GET_PLAYGROUND_DETAILS, ensurePlaygroundDetails } from "../../../components/Playground/PlaygroundActions";
import PlaygroundChatBox from "../../../components/Chatbox/PlaygroundChatBox";

import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "@material-ui/core/Button/Button";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import { getPlaygroundDetails } from "../../../components/Playground/PlaygroundReducer";
import { isLoading, getFetchError } from "../../../api/FetchDetailsReducer";
import { getUser } from "../../../components/UserProfile/UserProfileReducer";
import { history } from "../../../setup";
import { Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

const mapStateToProps = (state, ownProps) => ({
    playground: getPlaygroundDetails(state, ownProps.match.params.initiativeName),

    user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
    claimManagerRole:    (initiativeId) =>     dispatch(claimManagerRole(initiativeId)),
    ensurePlaygroundDetails:    (initiativeId) =>     dispatch(ensurePlaygroundDetails(initiativeId)),
})

const styles = theme => ({
    paper: {
        minHeight: '300px',
        width: '100%',
    },
    avatar: {
        margin: 10
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    teamChatTitleContainer: {
        margin: '70px auto 20px !important',
    },
    chatUsersContainer: {
        paddingRight: 0,
    },
    chatUsers: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: `-1px 1px 5px 0px rgba(0,0,0,0.2)`
    },
    usersList: {
        overflowY: 'auto',
        maxHeight: '600px',
    },
    chatMessages: {
        paddingLeft: 0,
    },
});

class Team extends React.Component {

    onClickClaim () {
        this.props.claimManagerRole(this.props.playground.id)
    }

    componentDidMount() {
        console.log("ensuring playground details of " + this.props.match.params.initiativeName)
        this.props.ensurePlaygroundDetails(initiativeId)
    }

    render() {
        const {playground, user, classes, ...rest} = this.props;

        if (!playground || this.props.playgroundLoading)
            return "loading.."

        return (
            <div className={"workspace-wrapper"}>
                <Header
                    rightLinks={<HeaderLinks/>}
                    playground={playground}
                    fixed
                    textBrand
                    color="white"
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />
                {/*<Parallax className={"phase-container empty"}>*/}
                    {/*<div className={classes.container + " phase-wrapper"}>*/}

                    {/*</div>*/}
                {/*</Parallax>*/}

                <div className={classNames(`${classes.container} ${classes.teamChatTitleContainer} phase-explainer-container`)}>
                    <GridContainer className={"grid-container"}>
                        <GridItem xs={12} sm={12} md={12} className={"workspace-phase-explainer"}>
                            <div className={"title-wrapper"}>
                                <h2>{ "Team "} {playground.name}</h2>
                                {playground &&
                                    <div className={"explainer-actions"}>
                                        <h3>
                                            Bespreek met je teamgenoten hoe je&nbsp;
                                            {playground.name} rookvrij gaat maken.
                                        </h3>
                                        <Button
                                            className={"btn btn-highlight"}
                                            onClick={() => history.goBack()}
                                            style={{textAlign: 'center'}}
                                        >
                                            <span>Terug naar de actiepagina</span>
                                        </Button>
                                    </div>

                                }
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>


                <div className={classes.container + " information-wrapper"}>
                    <GridContainer className={"information-container"}>
                        <GridItem xs={4} sm={4} md={4} className={classNames(classes.chatUsersContainer + " phase-information-container flex-divide")}>

                            <Paper className={classNames(`${classes.paper} ${classes.chatUsers}`)} elevation={2}>
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
                        <GridItem xs={8} sm={8} md={8} className={classNames(`${classes.paper} ${classes.chatMessages}`)}>
                            <PlaygroundChatBox playground={playground}/>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default withStyles(componentsStyle)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Team)))
